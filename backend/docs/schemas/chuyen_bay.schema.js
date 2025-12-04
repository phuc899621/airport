/**
 * @swagger
 * components:
 *   schemas:
 *     SanBayTrungGianLichObject:
 *       type: object
 *       properties:
 *         MaSanBay:
 *           type: string
 *           example: "1"
 *         ThuTuDung:
 *           type: integer
 *           example: 1
 *         ThoiGianDung:
 *           type: string
 *           example: "20"
 *         GhiChu:
 *           type: string
 *           example: ""
 *
 *     LichChuyenBayObject:
 *       type: object
 *       properties:
 *         MaChuyenBay:
 *           type: string
 *           example: "1"
 *         TenSanBayDi:
 *           type: string
 *           example: "Sân bay Quốc tế Nội Bài"
 *         TenSanBayDen:
 *           type: string
 *           example: "Melbourne Airport"
 *         MaMayBay:
 *           type: string
 *           example: "1"
 *         LoaiMayBay:
 *           type: string
 *           example: "Airbus A320"
 *         ThoiGianBay:
 *           type: string
 *           example: "240"
 *         SLGheHang1:
 *           type: integer
 *           example: 14
 *         SLGheHang2:
 *           type: integer
 *           example: 86
 *         SLGheHang1ConLai:
 *           type: string
 *           example: "14"
 *         SLGheHang2ConLai:
 *           type: string
 *           example: "86"
 *         NgayGio:
 *           type: string
 *           format: date-time
 *           example: "2025-12-01T11:40:52.000Z"
 *         MaHienThi:
 *           type: string
 *           example: "VN789"
 *         GiaVe:
 *           type: integer
 *           example: 700000
 *         GiaVeHang1:
 *           type: integer
 *           example: 735000
 *         GiaVeHang2:
 *           type: integer
 *           example: 700000
 *         ThoiGianDi:
 *           type: string
 *           format: date-time
 *           example: "2025-12-01T11:40:52.000Z"
 *         ThoiGianDen:
 *           type: string
 *           format: date-time
 *           example: "2025-12-01T15:40:52.000Z"
 *         SanBayTrungGian:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SanBayTrungGianLichObject'
 * 
 * 
 *     ChuyenBayObject:
 *       type: object
 *       properties:
 *         maChuyenBay:
 *           type: string
 *           example: "10"
 *         maMayBay:
 *           type: string
 *           example: "1"
 *         maSanBayDi:
 *           type: string
 *           example: "1"
 *         maSanBayDen:
 *           type: string
 *           example: "7"
 *         giaVe:
 *           type: integer
 *           example: 1500000
 *         ngayGio:
 *           type: string
 *           format: date-time
 *           description: "Thời gian khỏi hành"
 *           example: "2025-12-02T03:30:00.000Z"
 *         thoiGianBay:
 *           type: string
 *           example: "180"
 *         maHienThi:
 *           type: string
 *           example: "VN123"
 * 
 *     TaoChuyenBayDto:
 *       type: object
 *       required:
 *         - maMayBay
 *         - maSanBayDi
 *         - maSanBayDen
 *         - ngayGio
 *         - giaVe
 *         - thoiGianBay
 *         - maHienThi
 *       properties:
 *         maMayBay:
 *           type: integer
 *           example: 1
 *         maSanBayDi:
 *           type: integer
 *           example: 1
 *         maSanBayDen:
 *           type: integer
 *           example: 7
 *         giaVe:
 *           type: integer
 *           example: 1500000
 *         ngayGio:
 *           type: string
 *           format: date-time
 *           example: "2025-12-02T03:30:00.000Z"
 *         thoiGianBay:
 *           type: string
 *           example: "180"
 *         maHienThi:
 *           type: string
 *           example: "VN123"
 * 
 * 
 *     CapNhatChuyenBayDto:
 *       type: object
 *       properties:
 *         maMayBay:
 *           type: integer
 *           example: 1
 *         maSanBayDi:
 *           type: integer
 *           example: 1
 *         maSanBayDen:
 *           type: integer
 *           example: 7
 *         giaVe:
 *           type: integer
 *           example: 1500000
 *         ngayGio:
 *           type: string
 *           format: date-time
 *           example: "2025-12-02T03:30:00.000Z"
 *         thoiGianBay:
 *           type: string
 *           example: "180"
 *         maHienThi:
 *           type: string
 *           example: "VN123"
 */


