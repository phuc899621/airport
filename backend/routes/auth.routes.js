import express from "express";
import * as AuthController from "../controllers/auth.controller.js";
import * as AuthMiddleware from "../middlewares/auth.input.middlewares.js";
import { validate } from "../middlewares/input.validator.js";
import { sessionMiddleware } from "../middlewares/session.middlewares.js";
const router = express.Router();

router.post("/dang-ky/gui-otp", validate(AuthMiddleware.dangKySchema),AuthController.dangKyTaiKhoan); 
router.post("/dang-ky/xac-thuc", validate(AuthMiddleware.xacThucTaiKhoanSchema),AuthController.xacThucTaiKhoan);
router.post("/dang-nhap", validate(AuthMiddleware.dangNhapSchema),AuthController.dangNhap);

router.post("/quen-mat-khau", validate(AuthMiddleware.quenMatKhauSchema),AuthController.quenMatKhau);
router.post("/quen-mat-khau/xac-thuc", validate(AuthMiddleware.xacThucQuenMatKhauSchema),AuthController.xacThucQuenMatKhau);
router.post("/quen-mat-khau/tao-moi", validate(AuthMiddleware.taoMoiMatKhauSchema),AuthController.taoMoiMatKhau);
export default router;