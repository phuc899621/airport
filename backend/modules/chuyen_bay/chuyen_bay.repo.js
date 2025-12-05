

export default class ChuyenBayRepo{
    constructor(db){
        this.db=db;
    }

    async layLichChuyenBay(tx) {
        try {
            const executor = tx || this.db;
            const result = await executor`
                SELECT 
                    cb."MaChuyenBay",
                    sbDi."TenSanBay" AS "TenSanBayDi", 
                    sbDen."TenSanBay" AS "TenSanBayDen",
                    cb."MaMayBay",
                    mb."LoaiMayBay",
                    cb."ThoiGianBay",
                    mb."SLGheHang1",
                    mb."SLGheHang2",
                    cb."NgayGio",
                    cb."MaHienThi",
                    cb."GiaVe",
                    ROUND(cb."GiaVe" * hv1."HeSoGia") AS "GiaVeHang1",
                    ROUND(cb."GiaVe" * hv2."HeSoGia") AS "GiaVeHang2",
                    sbtg."MaSanBay",
                    sbtg."ThuTuDung",
                    sbtg."ThoiGianDung",
                    sbtg."GhiChu",

                    (mb."SLGheHang1" - COALESCE(d1."DatChoConHieuLuc",0)) AS "SLGheHang1ConLai",
                    (mb."SLGheHang2" - COALESCE(d2."DatChoConHieuLuc",0)) AS "SLGheHang2ConLai"
                FROM "CHUYENBAY" cb
                LEFT JOIN "MAYBAY" mb 
                    ON cb."MaMayBay" = mb."MaMayBay"
                LEFT JOIN "SANBAY" AS sbDi
                    ON cb."MaSanBayDi" = sbDi."MaSanBay"
                LEFT JOIN "SANBAY" AS sbDen
                    ON cb."MaSanBayDen" = sbDen."MaSanBay"
                LEFT JOIN "SANBAYTRUNGGIAN" sbtg
                    ON sbtg."MaChuyenBay" = cb."MaChuyenBay"
                LEFT JOIN "HANGVE" hv1
                    ON hv1."MaHangVe" = 1
                LEFT JOIN "HANGVE" hv2
                    ON hv2."MaHangVe" = 2
                LEFT JOIN (
                    SELECT p."MaChuyenBay", COUNT(*) AS "DatChoConHieuLuc"
                    FROM "PHIEUDATCHO" p
                    JOIN "LOAITRANGTHAIPHIEU" t
                        ON p."MaLoaiTrangThaiPhieu" = t."MaLoaiTrangThaiPhieu"
                    WHERE t."TenLoaiTrangThaiPhieu" <> 'da_huy'
                    AND p."MaHangVe" = 1
                    GROUP BY p."MaChuyenBay"
                ) d1 ON d1."MaChuyenBay" = cb."MaChuyenBay"

                LEFT JOIN (
                    SELECT p."MaChuyenBay", COUNT(*) AS "DatChoConHieuLuc"
                    FROM "PHIEUDATCHO" p
                    JOIN "LOAITRANGTHAIPHIEU" t
                        ON p."MaLoaiTrangThaiPhieu" = t."MaLoaiTrangThaiPhieu"
                    WHERE t."TenLoaiTrangThaiPhieu" <> 'da_huy'
                    AND p."MaHangVe" = 2
                    GROUP BY p."MaChuyenBay"
                ) d2 ON d2."MaChuyenBay" = cb."MaChuyenBay"

                ORDER BY cb."NgayGio" ASC, sbtg."ThuTuDung" ASC;
            `;
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}