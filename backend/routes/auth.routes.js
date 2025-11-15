import express from "express";
import * as AuthController from "../controllers/auth.controller.js";
import * as AuthMiddleware from "../middlewares/auth.middlewares.js";
import { validate } from "../middlewares/validator.js";
const router = express.Router();

router.post("/dang-ky/gui-otp", validate(AuthMiddleware.dangKySchema)  ,AuthController.dangKyTaiKhoan); 
router.post("/dang-ky/xac-thuc", validate(AuthMiddleware.xacThucTaiKhoanSchema) ,AuthController.xacThucTaiKhoan);
export default router;