import { Request, Response, NextFunction } from "express";
import passport from "passport";
import asyncHandler from "express-async-handler";
import { createUserTokens } from "@services/passport-jwt.service";
import * as userService from "@services/user.service";

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("login", { session: false }, async (err: any, user: any, info: any) => {
    if (err || !user) {
      return res.status(401).json({
        success: false,
        message: err?.message || info?.message || "Invalid email or password"
      });
    }

    const tokens = createUserTokens(user);
    await userService.editUser(user._id, {
      refreshToken: tokens.refreshToken,
    });

    return res.status(200).json({
      success: true,
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  })(req, res, next);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    await userService.editUser(user._id, { refreshToken: "" });
  }
  res.status(200).json({
    success: true,
    message: "Logged out"
  });
});
