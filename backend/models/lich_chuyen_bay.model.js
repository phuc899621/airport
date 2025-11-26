import db from "../config/db.js";

export const getLichChuyenBay = async (tx) => {
    try {
        const executor = tx || db;
        const result = await executor`
            SELECT 
                cb."MaChuyenBay",
                sbDi."TenSanBay" as "TenSanBayDi", 
                sbDen."TenSanBay" as "TenSanBayDen",
                cb."MaMayBay",
                mb."LoaiMayBay",
                cb."ThoiGianBay",
                mb."SLGheHang1",
                mb."SLGheHang2",
                cb."NgayGio",
                cb."MaHienThi",
                cb."GiaVe",
                sbtg."MaSanBay",
                sbtg."ThuTuDung",
                sbtg."ThoiGianDung",
                sbtg."GhiChu"
            FROM "CHUYENBAY" cb
            LEFT JOIN "MAYBAY" mb 
            ON cb."MaMayBay" = mb."MaMayBay"
            LEFT JOIN "SANBAY" as sbDi
            ON cb."MaSanBayDi" = sbDi."MaSanBay"
            LEFT JOIN "SANBAY" as sbDen
            ON cb."MaSanBayDen" = sbDen."MaSanBay"
            LEFT JOIN "SANBAYTRUNGGIAN" sbtg
            ON sbtg."MaChuyenBay" = cb."MaChuyenBay" 
            ORDER BY cb."NgayGio" ASC, sbtg."ThuTuDung" ASC
        `;
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}