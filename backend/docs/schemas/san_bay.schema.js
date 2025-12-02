/**
 * @swagger
 * components:
 *   schemas:
 *     SanBayObject:
 *       type: object
 *       properties:
 *         maSanBay:
 *           type: integer
 *           example: 1
 *         tenSanBay:
 *           type: string
 *           example: Sân bay Quốc tế Nội Bài
 *         quocGia:
 *           type: string
 *           example: Việt Nam

 *     TaoSanBayDto:
 *       type: object
 *       required:
 *         - tenSanBay
 *         - quocGia
 *       properties:
 *         tenSanBay:
 *           type: string
 *           example: Sân bay Quốc tế Nội Bài
 *         quocGia:
 *           type: string
 *           example: Việt Nam
 * 
 *     CapNhatSanBayDto:
 *       type: object
 *       properties:
 *         tenSanBay:
 *           type: string
 *           example: Sân bay Quốc tế Nội Bài
 *         quocGia:
 *           type: string
 *           example: Việt Nam

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
