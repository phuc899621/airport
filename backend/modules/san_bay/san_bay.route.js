import express from "express";
import { validate } from "../../middlewares/base.validator.js";
import * as SanBayController from "./san_bay.controller.js";
import { capNhatSanBayBodySchema, capNhatSanBayParamsSchema, laySanBayParamsSchema, laySanBayQuerySchema, taoSanBayBodySchema } from "./san_bay.validate.js";
import { adminMiddleware } from "../../middlewares/session.middlewares.js";
import ValidateOption from "../../middlewares/base.validator.option.js";

const router = express.Router();

/**
 * @swagger
 * /san-bay:
 *   get:
 *     tags:
 *       - SanBay [Admin]
 *     summary: Lấy danh sách sân bay
 *     description: | 
 *       Lấy tất cả sân bay, có thể filter theo query params như quocGia,
 *       vd query: http://localhost:3000/san-bay?quocGia=Việt Nam&tenSanBay=Sân bay Quốc tế Nội Bài
 *     parameters:
 *       - in: query
 *         name: quocGia
 *         schema:
 *           type: string
 *         description: Lọc sân bay theo quốc gia
 *         example: Việt Nam
 *       - in: query
 *         name: tenSanBay
 *         schema:
 *           type: string
 *         description: Lọc sân bay theo tên sân bay
 *         example: Sân bay Quốc tế Nội Bài
 *     responses:
 *       200:
 *         description: Lấy danh sách sân bay thành công!
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
 *                   example: "Lấy sân bay thành công!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/SanBayObject"
 * 
 *       500:
 *         description: Cấu trúc lỗi trả về
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */
router.get("/", adminMiddleware,validate(laySanBayParamsSchema),validate(laySanBayQuerySchema,ValidateOption.QUERY),SanBayController.laySanBay); 

/**
 * @swagger
 * /san-bay/{maSanBay}:
 *   get:
 *     tags:
 *       - SanBay [Admin]
 *     summary: Lấy thông tin sân bay theo maSanBay
 *     description: |
 *          Lấy thông tin chi tiết của sân bay dựa trên maSanBay.
 *          VD: http://localhost:3000/san-bay/1
 *     parameters:
 *       - in: path
 *         name: maSanBay
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã sân bay
 *         example: 1
 *     responses:
 *       200:
 *         description: Thông tin sân bay có tồn tại và lấy dc
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
 *                   example: "Lấy sân bay thành công!"
 *                 data:
 *                   $ref: "#/components/schemas/SanBayObject"
 * 
 *       500:
 *         description: Cấu trúc lỗi trả về
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */
router.get("/:maSanBay", adminMiddleware,validate(laySanBayParamsSchema,ValidateOption.PARAMS),SanBayController.laySanBay);

/**
 * @swagger
 * /san-bay:
 *   post:
 *     tags:
 *       - SanBay [Admin]
 *     summary: Tạo sân bay mới
 *     description: Thêm một sân bay mới vào hệ thống.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TaoSanBayDto"
 *     responses:
 *       201:
 *         description: Sân bay được tạo thành công
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
 *                   example: "Sân bay được tạo thành công"
 *                 data:
 *                   $ref: "#/components/schemas/SanBayObject"
 *       500:
 *         description: Cấu trúc lỗi trả về
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */
router.post("/", adminMiddleware,validate(taoSanBayBodySchema),SanBayController.taoSanBay); 

/**
 * @swagger
 * /san-bay/{maSanBay}:
 *   put:
 *     tags:
 *       - SanBay [Admin]
 *     summary: Cập nhật sân bay
 *     description: Cập nhật thông tin sân bay dựa trên maSanBay.
 *     parameters:
 *       - in: path
 *         name: maSanBay
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã sân bay cần cập nhật
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CapNhatSanBayDto"
 *     responses:
 *       200:
 *         description: Sân bay được cập nhật thành công
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
 *                   example: "Sân bay được cập nhật thành công"
 *                 data:
 *                   $ref: "#/components/schemas/SanBayObject"
 *       500:
 *         description: Cấu trúc lỗi trả về
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */
router.put("/:maSanBay", adminMiddleware,
    validate(capNhatSanBayParamsSchema,ValidateOption.PARAMS),
    validate(capNhatSanBayBodySchema),SanBayController.capNhatSanBay); 

/**
 * @swagger
 * /san-bay/{maSanBay}:
 *   delete:
 *     tags:
 *       - SanBay [Admin]
 *     summary: Xóa sân bay
 *     description: Xóa sân bay dựa trên maSanBay.
 *     parameters:
 *       - in: path
 *         name: maSanBay
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã sân bay cần xóa
 *         example: 1
 *     responses:
 *       200:
 *         description: Xóa thành công,
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
 *                   example: "Xóa sân bay thành công"
 *                 data:
 *                   type: object
 *                   example: {}
 *       500:
 *         description: Cấu trúc lỗi trả về
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */
router.delete("/:maSanBay", adminMiddleware,
    validate(capNhatSanBayParamsSchema,ValidateOption.PARAMS),SanBayController.xoaSanBay);

export default router;