import express from "express";
import userRoutes from "./user.route";
import propertyRoutes from "./property.route";
import authRoutes from "./auth.route";
import pageRoutes from "./page.route";

// routes
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/pages", pageRoutes);
router.use("/", propertyRoutes);

export default router;