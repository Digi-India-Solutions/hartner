import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import InquirySchema from "@models/inquiry.model";
import createHttpError from "http-errors";

// POST /api/inquiries
export const createInquiry = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, subject, message, propertyId } = req.body;

  if (!name || !email || !phone || !subject) {
    throw createHttpError(400, "Bitte füllen Sie alle Pflichtfelder aus (Name, E-Mail, Telefonnummer, Betreff).");
  }

  const inquiryData: any = {
    name,
    email,
    phone,
    subject,
    message: message || "",
  };

  if (propertyId) {
    inquiryData.property = propertyId;
  }

  const inquiry = await InquirySchema.create(inquiryData);

  res.status(201).json({
    success: true,
    data: inquiry,
  });
});

// GET /api/inquiries
export const getAllInquiries = asyncHandler(async (req: Request, res: Response) => {
  const inquiries = await InquirySchema.find()
    .populate("property", "title address kaufpreis slug")
    .sort({ created_at: -1 });

  res.status(200).json({
    success: true,
    data: inquiries,
  });
});

// DELETE /api/inquiries/:id
export const deleteInquiry = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const inquiry = await InquirySchema.findByIdAndDelete(id);

  if (!inquiry) {
    throw createHttpError(404, "Anfrage nicht gefunden");
  }

  res.status(200).json({
    success: true,
    message: "Anfrage erfolgreich gelöscht",
  });
});
