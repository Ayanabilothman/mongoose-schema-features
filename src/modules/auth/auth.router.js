import { Router } from "express";
import * as authController from "./auth.controller.js";
import * as authValidators from "./auth.validation.js";
import validation from "./../../middleware/validation.middleware.js";
const router = Router();

router.post(
  "/register",
  validation(authValidators.register),
  authController.register
);
router.get("/accountActivation/:token", authController.accountActivation);
router.post("/login", validation(authValidators.login), authController.login);

export default router;
