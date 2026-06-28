import { Router } from "express";
import { roleAuth } from "@middlewares/role-auth.middleware";
import * as authController from "./auth.controller";

const router = Router();

router.post("/login", authController.login);
router.post("/logout", roleAuth(["ADMIN", "USER"]), authController.logout);

export default router;
