/**
 * @swagger
 * /may-bay:
 *   get:
 *     tags:
 *       - MayBay [Admin]
 *     summary: Lấy danh sách may bay
 *     description: Lấy tất cả máy bay, có thể filter theo query params như loại máy bay, mã sân bay.
 *     parameters:
 *       - in: query
 *         name: loaiMayBay
 *         schema:
 *           type: string
 *         description: Lọc máy bay theo loại máy bay
 *         example: Boeing 747
 *       - in: query
 *         name: maSanBay
 *         schema:
 *           type: integer
 *         description: Lọc máy bay theo mã sân bay
 *         example: 1
 *     responses:
 *       200:
 *         description: Lấy danh sách máy bay thành công
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
 *                   example: "Lấy máy bay thành công!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/MayBayObject"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 *
 *   post:
 *     tags:
 *       - MayBay [Admin]
 *     summary: Tạo một máy bay
 *     description: Thêm một máy bay gắn liền với 1 sân bay
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TaoMayBayDto"
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
 *                   $ref: "#/components/schemas/MayBayObject"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 *
 * /may-bay/{maMayBay}:
 *   get:
 *     tags:
 *       - MayBay [Admin]
 *     summary: Lấy thông tin máy bay theo mã máy bay
 *     parameters:
 *       - in: path
 *         name: maMayBay
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã máy bay 
 *         example: 1
 *     responses:
 *       200:
 *         description: Thông tin máy bay
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
 *                   example: "Lấy máy bay thành công!"
 *                 data:
 *                   $ref: "#/components/schemas/MayBayObject"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 *
 *   put:
 *     tags:
 *       - MayBay [Admin]
 *     summary: Cập nhật máy bay
 *     parameters:
 *       - in: path
 *         name: maMayBay
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã máy bay cần cập nhật
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CapNhatMayBayDto"
 *     responses:
 *       200:
 *         description: Cập nhật máy bay thành công
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
 *                   example: "Máy bay được cập nhật thành công"
 *                 data:
 *                   $ref: "#/components/schemas/MayBayObject"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 *
 *   delete:
 *     tags:
 *       - MayBay [Admin]
 *     summary: Xóa máy bay theo mã máy bay
 *     parameters:
 *       - in: path
 *         name: maMayBay
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã máy bay cần xóa
 *         example: 1
 *     responses:
 *       200:
 *         description: Xóa máy bay thành công
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
 *                   example: "Xóa máy bay thành công"
 *                 data:
 *                   type: object
 *                   example: {}
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */
