import { roleAuth } from "@middlewares/role-auth.middleware";
import { Router } from "express";
import * as propertyController from "./property.controller";
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists in root
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/i;
    const ext = allowedTypes.test(path.extname(file.originalname));
    const mime = allowedTypes.test(file.mimetype);
    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, png, webp) are allowed"));
    }
  },
});

const router = Router();

// Public / Admin Optional Auth endpoints
router.get("/properties", propertyController.getAllProperties);
router.get("/properties/:id", propertyController.getPropertyById);

// Admin-only endpoints
router.post("/properties", roleAuth(["ADMIN"]), propertyController.createProperty);
router.put("/properties/:id", roleAuth(["ADMIN"]), propertyController.updateProperty);
router.delete("/properties/:id", roleAuth(["ADMIN"]), propertyController.deleteProperty);
router.patch("/properties/:id/status", roleAuth(["ADMIN"]), propertyController.updatePropertyStatus);
router.patch("/properties/reorder", roleAuth(["ADMIN"]), propertyController.updatePropertiesOrder);

// Property Images Admin-only endpoints
router.post(
  "/properties/:id/images",
  roleAuth(["ADMIN"]),
  upload.array("images"),
  propertyController.uploadPropertyImages
);
router.delete(
  "/properties/:id/images/:imageId",
  roleAuth(["ADMIN"]),
  propertyController.deletePropertyImage
);
router.post(
  "/properties/:id/images/delete-bulk",
  roleAuth(["ADMIN"]),
  propertyController.deletePropertyImagesBulk
);
router.patch(
  "/properties/:id/images/reorder",
  roleAuth(["ADMIN"]),
  propertyController.updatePropertyImagesOrder
);

export default router;
