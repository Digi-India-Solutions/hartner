import express from "express";
import userRoutes from "./user/user.route";
import propertyRoutes from "./property/property.route";
import authRoutes from "./auth/auth.route";
import pageRoutes from "./page/page.route";

// routes
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/pages", pageRoutes);
router.use("/", propertyRoutes);

export default router;