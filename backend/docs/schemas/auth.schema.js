/**
 * @swagger
 * components:
 *   schemas:
 *     DangKyGuiOtpDto:
 *       type: object
 *       required:
 *         - email
 *         - tenDangNhap
 *         - matKhau
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: email người dùng
 *           example: user@example.com
 *         tenDangNhap:
 *           type: string
 *           description: tài khoản người dùng
 *           example: user
 *         matKhau:
 *           type: string
 *           example: user123

 *     DangKyXacThucDto:
 *       type: object
 *       required:
 *         - email
 *         - otp
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         otp:
 *           type: string
 *           example: "1234"

 *     DangNhapDto:
 *       type: object
 *       required:
 *         - identifier
 *         - matKhau
 *       properties:
 *         identifier:
 *           type: string
 *           description: email hoac tài khoản người dùng
 *           example: user@example.com
 *         matKhau:
 *           type: string
 *           example: user123

 *     QuenMatKhauDto:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: email người dùng
 *           example: user@example.com

 *     XacThucQuenMatKhauDto:
 *       type: object
 *       required:
 *         - email
 *         - otp
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: email người dùng
 *           example: user@example.com
 *         otp:
 *           type: string
 *           example: "1234"

 *     TaoMatKhauMoiDto:
 *       type: object
 *       required:
 *         - matKhau
 *         - token
 *       properties:
 *         matKhau:
 *           type: string
 *           description: mật khẩu mới của người dùng
 *           example: "newPassword123"
 *         token:
 *           type: string
 *           description: token cấp quyền
 *           example: "jwt-token..."
 */
