
/**
 * @swagger
 * /chuyen-bay/lich:
 *   get:
 *     tags:
 *       - Chuyến bay
 *     summary: Lấy lịch các chuyến bay
 *     description: | 
 *         Trả về danh sách lịch chuyến bay theo sân bay đi, sân bay đến và ngày.
 *         Có thể lọc theo mã sân bay đi và đến, mã máy bay, ngày giờ bay, 
 *         tên sân bay đi và đến, loại máy bay, mã chuyến bay hiển thị
 *     parameters:
 *       - in: query
 *         name: maSanBayDi
 *         schema:
 *           type: integer
 *         description: Lọc theo mã sân bay đi
 *         example: 1
 *       - in: query
 *         name: maSanBayDen
 *         schema:
 *           type: integer
 *         description: Lọc theo mã sân bay đến
 *         example: 7
 *       - in: query
 *         name: maMayBay
 *         schema:
 *           type: integer
 *         description: Lọc theo máy bay
 *         example: 1
 *       - in: query
 *         name: loaiMayBay
 *         schema:
 *           type: string
 *         description: Lọc theo loại máy bay
 *         example: Boeing 747
 *       - in: query
 *         name: tenSanBayDi
 *         schema:
 *           type: string
 *         description: Lọc theo tên sân bay đi
 *         example: Sân bay Nội Bài
 *       - in: query
 *         name: tenSanBayDen
 *         schema:
 *           type: string
 *         description: Lọc theo tên sân bay đến
 *         example: Sân bay Hà Nội
 *       - in: query
 *         name: maHienThi
 *         schema:
 *           type: string
 *         description: Lọc theo mã chuyến bay hiển thị
 *         example: VN123
 *       - in: query
 *         name: ngayGio
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Lọc theo thời gian khởi hành
 *         example: "2025-12-01T11:40:52.000Z"
 *
 *     responses:
 *       200:
 *         description: Lấy lịch chuyến bay thành công
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
 *                   example: Lấy lịch chuyến bay thành công!
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/LichChuyenBayObject"
 *
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */

/**
 * @swagger
 * /chuyen-bay:
 *   get:
 *     tags:
 *       - ChuyenBay [Admin]
 *     summary: Lấy danh sách chuyến bay
 *     description: Lấy tất cả chuyến bay, có thể filter theo query params.
 *     parameters:
 *       - in: query
 *         name: maSanBayDi
 *         schema:
 *           type: integer
 *         description: Mã sân bay đi
 *         example: 1
 *       - in: query
 *         name: maSanBayDen
 *         schema:
 *           type: integer
 *         description: Mã sân bay đến
 *         example: 7
 *       - in: query
 *         name: maMayBay
 *         schema:
 *           type: integer
 *         description: Mã máy bay
 *         example: 1
 *       - in: query
 *         name: maHienThi
 *         schema:
 *           type: string
 *         description: Mã chuyến bay hiển thị
 *         example: VN123
 *       - in: query
 *         name: ngayGio
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Thời gian khởi hành
 *         example: "2025-12-01T11:40:52.000Z"
 *     responses:
 *       200:
 *         description: Lấy chuyến bay thành công
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
 *                   example: "Lấy chuyến bay thành công!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/ChuyenBayObject"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */

/**
 * @swagger
 * /chuyen-bay/{maChuyenBay}:
 *   get:
 *     tags:
 *       - ChuyenBay [Admin]
 *     summary: Lấy thông tin một chuyến bay
 *     description: Lấy chi tiết thông tin một chuyến bay theo mã chuyến bay.
 *     parameters:
 *       - in: path
 *         name: maChuyenBay
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã chuyến bay
 *         example: 10
 *     responses:
 *       200:
 *         description: Lấy chuyến bay thành công
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
 *                   example: "Lấy chuyến bay thành công!"
 *                 data:
 *                   $ref: "#/components/schemas/ChuyenBayObject"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */

/**
 * @swagger
 * /chuyen-bay:
 *   post:
 *     tags:
 *       - ChuyenBay [Admin]
 *     summary: Tạo chuyến bay mới
 *     description: API dùng để tạo một chuyến bay mới.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TaoChuyenBayDto"
 *     responses:
 *       201:
 *         description: Tạo chuyến bay thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Tạo chuyến bay thành công!"
 *                 data:
 *                   $ref: "#/components/schemas/ChuyenBayObject"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */


/**
 * @swagger
 * /chuyen-bay/{maChuyenBay}:
 *   put:
 *     tags:
 *       - ChuyenBay [Admin]
 *     summary: Cập nhật thông tin chuyến bay
 *     description: API cập nhật thông tin chi tiết của một chuyến bay.
 *     parameters:
 *       - in: path
 *         name: maChuyenBay
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã chuyến bay cần cập nhật
 *         example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CapNhatChuyenBayDto"
 *     responses:
 *       200:
 *         description: Cập nhật chuyến bay thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Cập nhật chuyến bay thành công!"
 *                 data:
 *                   $ref: "#/components/schemas/ChuyenBayObject"

 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */

/**
 * @swagger
 * /chuyen-bay/{maChuyenBay}:
 *   delete:
 *     tags:
 *       - ChuyenBay [Admin]
 *     summary: Xóa chuyến bay
 *     description: API xóa một chuyến bay theo mã chuyến bay.
 *     parameters:
 *       - in: path
 *         name: maChuyenBay
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mã chuyến bay 
 *         example: 10
 *     responses:
 *       200:
 *         description: Xóa chuyến bay thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Xóa chuyến bay thành công!"
 *       404:
 *         description: Không tìm thấy chuyến bay
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BaseError"
 */
