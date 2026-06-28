import { roleAuth } from "@middlewares/role-auth.middleware";
import { Router } from "express";
import * as pageController from "./page.controller";

const router = Router();

router.get("/:slug", pageController.getPageBySlug);
router.put("/:slug", roleAuth(["ADMIN"]), pageController.updatePageBySlug);

export default router;
