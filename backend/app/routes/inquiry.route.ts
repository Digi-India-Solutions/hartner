import express from "express";
import * as inquiryController from "@controllers/inquiry.controller";
import { roleAuth } from "@middlewares/role-auth.middleware";

const router = express.Router();

// Public route to submit inquiry
router.post("/inquiries", inquiryController.createInquiry);

// Admin-protected routes
router.get("/inquiries", roleAuth(["ADMIN"]), inquiryController.getAllInquiries);
router.delete("/inquiries/:id", roleAuth(["ADMIN"]), inquiryController.deleteInquiry);

export default router;
