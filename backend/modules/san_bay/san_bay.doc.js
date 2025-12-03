/**
 * @swagger
 * /san-bay:
 *   get:
 *     tags:
 *       - SanBay [Admin]
 *     summary: Lấy danh sách sân bay
 *     description: Lấy tất cả sân bay, có thể filter theo query params như quocGia.
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
 *         example: Sân bay Nội Bài
 *     responses:
 *       200:
 *         description: Lấy danh sách sân bay thành công
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
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 *
 *   post:
 *     tags:
 *       - SanBay [Admin]
 *     summary: Tạo sân bay mới
 *     description: Thêm một sân bay mới vào hệ thống
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
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 *
 * /san-bay/{maSanBay}:
 *   get:
 *     tags:
 *       - SanBay [Admin]
 *     summary: Lấy thông tin sân bay theo maSanBay
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
 *         description: Thông tin sân bay
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
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 *
 *   put:
 *     tags:
 *       - SanBay [Admin]
 *     summary: Cập nhật sân bay
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
 *         description: Cập nhật sân bay thành công
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
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 *
 *   delete:
 *     tags:
 *       - SanBay [Admin]
 *     summary: Xóa sân bay
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
 *         description: Xóa sân bay thành công
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
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */
