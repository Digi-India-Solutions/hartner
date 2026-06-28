import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import PropertySchema from "./property.schema";
import { type IProperty, type IPropertyImage } from "./property.dto";
import jwt from "jsonwebtoken";
import process from "process";
import fs from "fs";
import path from "path";
import createHttpError from "http-errors";

// Helper: Check if requester is Admin
const checkIsAdmin = (req: Request): boolean => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      return decoded && decoded.role === "ADMIN";
    } catch (err) {
      return false;
    }
  }
  return false;
};

// GET /api/properties
export const getAllProperties = asyncHandler(async (req: Request, res: Response) => {
  const isAdmin = checkIsAdmin(req);
  const { status, search } = req.query;

  const query: any = {};

  // If not admin, restrict only to published properties
  if (!isAdmin) {
    query.status = "published";
  } else if (status && status !== "All") {
    query.status = (status as string).toLowerCase();
  }

  if (search) {
    query.title = { $regex: search as string, $options: "i" };
  }

  const properties = await PropertySchema.find(query).sort({ sort_order: 1 });

  res.status(200).json({
    success: true,
    data: properties,
  });
});

// GET /api/properties/:id
export const getPropertyById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const isAdmin = checkIsAdmin(req);

  // Search by either slug or MongoDB ObjectID
  const query = id.match(/^[0-9a-fA-D]{24}$/i) ? { _id: id } : { slug: id };
  const property = await PropertySchema.findOne(query);

  if (!property) {
    throw createHttpError(404, "Property not found");
  }

  if (!isAdmin && property.status !== "published") {
    throw createHttpError(401, "Unauthorized access to offline property");
  }

  res.status(200).json({
    success: true,
    data: property,
  });
});

// POST /api/properties
export const createProperty = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as Partial<IProperty>;

  // Get max display order to append at the end
  const maxOrderProp = await PropertySchema.findOne().sort({ sort_order: -1 });
  const sort_order = maxOrderProp ? maxOrderProp.sort_order + 1 : 1;

  const newProperty = new PropertySchema({
    ...body,
    sort_order,
  });

  const saved = await newProperty.save();

  res.status(201).json({
    success: true,
    data: saved,
  });
});

// PUT /api/properties/:id
export const updateProperty = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body as Partial<IProperty>;

  const property = await PropertySchema.findById(id);
  if (!property) {
    throw createHttpError(404, "Property not found");
  }

  // Update fields
  if (body.title !== undefined) property.title = body.title;
  if (body.category !== undefined) property.category = body.category;
  if (body.address !== undefined) property.address = body.address;
  if (body.status !== undefined) property.status = body.status;
  if (body.description !== undefined) property.description = body.description;
  if (body.details !== undefined) property.details = body.details;
  if (body.card_fields !== undefined) property.card_fields = body.card_fields;

  const saved = await property.save();

  res.status(200).json({
    success: true,
    data: saved,
  });
});

// DELETE /api/properties/:id
export const deleteProperty = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const property = await PropertySchema.findById(id);

  if (!property) {
    throw createHttpError(404, "Property not found");
  }

  // Delete all associated files from disk
  for (const img of property.images) {
    if (img.filename) {
      const filePath = path.join(process.cwd(), "uploads", img.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }

  await PropertySchema.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Property deleted",
  });
});

// PATCH /api/properties/:id/status
export const updatePropertyStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["published", "offline", "draft"].includes(status)) {
    throw createHttpError(422, "Invalid status value");
  }

  const property = await PropertySchema.findById(id);
  if (!property) {
    throw createHttpError(404, "Property not found");
  }

  property.status = status;
  const saved = await property.save();

  res.status(200).json({
    success: true,
    data: saved,
  });
});

// PATCH /api/properties/reorder
export const updatePropertiesOrder = asyncHandler(async (req: Request, res: Response) => {
  const { order } = req.body; // Array of IDs in display order

  if (!Array.isArray(order)) {
    throw createHttpError(400, "Invalid order format. Expected array of IDs.");
  }

  // Bulk update display order
  for (let i = 0; i < order.length; i++) {
    const id = order[i];
    await PropertySchema.findByIdAndUpdate(id, { sort_order: i + 1 });
  }

  res.status(200).json({
    success: true,
    message: "Order saved",
  });
});

// POST /api/properties/:id/images
export const uploadPropertyImages = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    throw createHttpError(400, "No files uploaded");
  }

  const property = await PropertySchema.findById(id);
  if (!property) {
    throw createHttpError(404, "Property not found");
  }

  // Append new images
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const newImages: IPropertyImage[] = [];

  let nextSortOrder = property.images.length > 0 
    ? Math.max(...property.images.map(img => img.sort_order || 0)) + 1 
    : 1;

  for (const file of files) {
    const imgId = new mongoose.Types.ObjectId().toString();
    const relativeUrl = `/uploads/${file.filename}`;
    const fullUrl = `${baseUrl}${relativeUrl}`;

    const newImg: IPropertyImage = {
      id: imgId,
      url: fullUrl,
      filename: file.filename,
      sort_order: nextSortOrder++,
    };

    property.images.push(newImg);
    newImages.push(newImg);
  }

  await property.save();

  res.status(201).json({
    success: true,
    data: newImages,
  });
});

// DELETE /api/properties/:id/images/:imageId
export const deletePropertyImage = asyncHandler(async (req: Request, res: Response) => {
  const { id, imageId } = req.params;

  const property = await PropertySchema.findById(id);
  if (!property) {
    throw createHttpError(404, "Property not found");
  }

  const imgIndex = property.images.findIndex((img) => img.id === imageId);
  if (imgIndex === -1) {
    throw createHttpError(404, "Image not found on property");
  }

  const [removedImg] = property.images.splice(imgIndex, 1);

  // Delete file from disk
  if (removedImg.filename) {
    const filePath = path.join(process.cwd(), "uploads", removedImg.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  await property.save();

  res.status(200).json({
    success: true,
    message: "Image deleted",
  });
});

// POST /api/properties/:id/images/delete-bulk
export const deletePropertyImagesBulk = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { image_ids } = req.body; // Array of image IDs to delete

  if (!Array.isArray(image_ids)) {
    throw createHttpError(400, "Invalid payload. Expected array of image_ids");
  }

  const property = await PropertySchema.findById(id);
  if (!property) {
    throw createHttpError(404, "Property not found");
  }

  let deletedCount = 0;
  for (const imageId of image_ids) {
    const imgIndex = property.images.findIndex((img) => img.id === imageId);
    if (imgIndex !== -1) {
      const [removedImg] = property.images.splice(imgIndex, 1);
      if (removedImg.filename) {
        const filePath = path.join(process.cwd(), "uploads", removedImg.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      deletedCount++;
    }
  }

  await property.save();

  res.status(200).json({
    success: true,
    message: `${deletedCount} images deleted`,
  });
});

// PATCH /api/properties/:id/images/reorder
export const updatePropertyImagesOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { order } = req.body; // Array of image IDs in display order

  if (!Array.isArray(order)) {
    throw createHttpError(400, "Invalid payload. Expected array of image IDs");
  }

  const property = await PropertySchema.findById(id);
  if (!property) {
    throw createHttpError(404, "Property not found");
  }

  // Map sort orders according to index in order array
  property.images.forEach((img) => {
    const idx = order.indexOf(img.id);
    if (idx !== -1) {
      img.sort_order = idx + 1;
    }
  });

  // Sort local array by sort_order
  property.images.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  await property.save();

  res.status(200).json({
    success: true,
    message: "Image order saved",
  });
});
