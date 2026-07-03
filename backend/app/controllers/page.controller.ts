import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import PageSchema from "@models/page.model";
import createHttpError from "http-errors";

// GET /api/pages/:slug
export const getPageBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;

  if (!["impressum", "datenschutz"].includes(slug)) {
    throw createHttpError(400, "Invalid page slug. Must be impressum or datenschutz");
  }

  let page = await PageSchema.findOne({ slug });

  // If page doesn't exist yet, seed a default template
  if (!page) {
    const defaultTitle = slug.charAt(0).toUpperCase() + slug.slice(1);
    page = await PageSchema.create({
      slug,
      content: `<h1>${defaultTitle}</h1><p>Hier steht der Inhalt für ${defaultTitle} von Haertner Immobilien GmbH.</p>`,
    });
  }

  res.status(200).json({
    success: true,
    data: page,
  });
});

// PUT /api/pages/:slug
export const updatePageBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { content } = req.body;

  if (!["impressum", "datenschutz"].includes(slug)) {
    throw createHttpError(400, "Invalid page slug. Must be impressum or datenschutz");
  }

  if (content === undefined) {
    throw createHttpError(400, "Content field is required");
  }

  const page = await PageSchema.findOneAndUpdate(
    { slug },
    { content },
    { new: true, upsert: true }
  );

  res.status(200).json({
    success: true,
    message: "Page saved",
    data: page,
  });
});
