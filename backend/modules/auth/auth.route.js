import express from "express";
import * as AuthController from "./auth.controller.js";
import * as AuthValidator from "./auth.validator.js";
import { validate } from "../../middlewares/base.validator.js";
import { sessionMiddleware } from "../../middlewares/session.middlewares.js";
const router = express.Router();

/**
 * @swagger
 * /auth/dang-ky/gui-otp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Đăng ký tài khoản và nhận otp xác thực
 *     description: Gửi mã OTP đến email người dùng để xác thực khi đăng ký tài khoản mới.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DangKyGuiOtpDto'
 *     responses:
 *       201:
 *         description: OTP được gửi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Đăng ký tài khoản thành công, vui lòng xác thực qua email!"
 *                 data:
 *                   type: object
 *                   example: {}
 *       500:
 *         description: Cấu trúc lỗi trả về
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseError'
 */
router.post("/dang-ky/gui-otp", validate(AuthValidator.dangKySchema),AuthController.dangKyTaiKhoan); 

/**
 * @swagger
 * /auth/dang-ky/xac-thuc:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Xác thực OTP khi đăng ký tài khoản
 *     description: Người dùng nhập mã OTP nhận được qua email để xác thực tài khoản.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DangKyXacThucDto'
 *     responses:
 *       201:
 *         description: Xác thực thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Xác thực thành công, tài khoản đã được kích hoạt"
 *                 data:
 *                   type: object
 *                   example: {}
 *       500:
 *         description: Cấu trúc lỗi trả về
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseError'
 */
router.post("/dang-ky/xac-thuc", validate(AuthValidator.xacThucTaiKhoanSchema),AuthController.xacThucTaiKhoan);

/**
 * @swagger
 * /auth/dang-nhap:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Đăng nhập tài khoản
 *     description: Người dùng đăng nhập bằng email/tenDangNhap và mật khẩu.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DangNhapDto'
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Đăng nhập thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *       500:
 *         description: Cấu trúc lỗi trả về
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseError'
 */
router.post("/dang-nhap", validate(AuthValidator.dangNhapSchema),AuthController.dangNhap);

/**
 * @swagger
 * /auth/quen-mat-khau:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Yêu cầu gửi OTP để khôi phục mật khẩu
 *     description: Gửi mã OTP đến email để xác thực trước khi tạo mật khẩu mới.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuenMatKhauDto'
 *     responses:
 *       201:
 *         description: OTP được gửi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Mã OTP được gửi đến email để tạo lại mật khẩu!"
 *                 data:
 *                   type: object
 *                   example: {}
 *       500:
 *         description: Cấu trúc lỗi trả về
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseError'
 */
router.post("/quen-mat-khau", validate(AuthValidator.quenMatKhauSchema),AuthController.quenMatKhau);



/**
 * @swagger
 * /auth/quen-mat-khau/xac-thuc:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Xác thực OTP khôi phục mật khẩu
 *     description: Người dùng nhập mã OTP nhận được để xác thực trước khi đổi mật khẩu.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/XacThucQuenMatKhauDto'
 *     responses:
 *       201:
 *         description: Xác thực OTP thành công, trả về token để tạo mật khẩu mới
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Xác thực thành công, vui lòng gửi mật khẩu mới!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "jwt-token..."
 *       500:
 *         description: Cấu trúc lỗi trả về
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseError'
 */
router.post("/quen-mat-khau/xac-thuc", validate(AuthValidator.xacThucQuenMatKhauSchema),AuthController.xacThucQuenMatKhau);

/**
 * @swagger
 * /auth/quen-mat-khau/tao-moi:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Tạo mật khẩu mới sau khi xác thực OTP
 *     description: Người dùng gửi mật khẩu mới cùng token xác thực OTP để cập nhật mật khẩu.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaoMatKhauMoiDto'
 *     responses:
 *       201:
 *         description: Đổi mật khẩu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Đổi mật khẩu thành công!"
 *                 data:
 *                   type: object
 *                   example: {}
 *       500:
 *         description: Cấu trúc lỗi trả về
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseError'
 */
router.post("/quen-mat-khau/tao-moi", validate(AuthValidator.taoMoiMatKhauSchema),AuthController.taoMoiMatKhau);
export default router;