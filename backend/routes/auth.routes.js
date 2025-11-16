import express from "express";
import * as AuthController from "../controllers/auth.controller.js";
import * as AuthMiddleware from "../middlewares/auth.input.middlewares.js";
import { validate } from "../middlewares/input.validator.js";
import { sessionMiddleware } from "../middlewares/session.middlewares.js";
const router = express.Router();

router.post("/dang-ky/gui-otp", validate(AuthMiddleware.dangKySchema),AuthController.dangKyTaiKhoan); 
router.post("/dang-ky/xac-thuc", validate(AuthMiddleware.xacThucTaiKhoanSchema),AuthController.xacThucTaiKhoan);
router.post("/dang-nhap", validate(AuthMiddleware.dangNhapSchema),AuthController.dangNhap);
export default router;