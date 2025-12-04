import { DBError } from "../../core/errors/errors.js";


export default class ChuyenBayRepo{
    constructor(db){
        this.db=db;
    }

    async layLichChuyenBay(query,tx) {
        try {
            const executor = tx || this.db;
            const { maChuyenBay, tenSanBayDi, tenSanbayDen, ngayGio, maHienThi,
                 maMayBay, loaiMayBay, maSanBayDi, maSanBayDen } = query;
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
                WHERE 1=1 
                ${maChuyenBay?executor`AND cb."MaChuyenBay" = ${maChuyenBay}`:executor``}
                ${tenSanBayDi?executor`AND sbDi."TenSanBay" ILIKE ${'%' + String(tenSanBayDi)+'%'}`:executor``}
                ${tenSanbayDen?executor`AND sbDen."TenSanBay" ILIKE ${'%' + String(tenSanbayDen)+'%'}`:executor``}
                ${loaiMayBay?executor`AND mb."LoaiMayBay" ILIKE ${String(loaiMayBay)}`:executor``}
                ${ngayGio?executor`AND cb."NgayGio" = ${ngayGio}`:executor``}
                ${maHienThi?executor`AND cb."MaHienThi" ILIKE ${String(maHienThi)}`:executor``}
                ${maMayBay?executor`AND cb."MaMayBay" = ${maMayBay}`:executor``}
                ${maSanBayDi?executor`AND sbDi."MaSanBay" = ${maSanBayDi}`:executor``}
                ${maSanBayDen?executor`AND cbDen."MaSanBay" = ${maSanBayDen}`:executor``}
                ORDER BY cb."NgayGio" ASC, sbtg."ThuTuDung" ASC;
            `;
            return result;
        } catch (err) {
            throw new DBError(err.message);
        }
    }
    async taoChuyenBay(data,tx)  {
        try {
            const executor = tx || this.db;
            const { maMayBay, maSanBayDi, maSanBayDen, ngayGio, 
                maHienThi, giaVe, thoiGianBay } = data;
            const rows= await executor`
                INSERT INTO "CHUYENBAY" ("MaMayBay","MaSanBayDi",
                    "MaSanBayDen","NgayGio","MaHienThi","GiaVe","ThoiGianBay")
                VALUES (${maMayBay},${maSanBayDi},${maSanBayDen},${ngayGio},${maHienThi},${giaVe},${thoiGianBay})
                RETURNING *;
            `;
            return rows[0];
        } catch (err) {
            throw new DBError(err.message);
        }
    }
    async layChuyenBayTheoMaChuyenBay(maChuyenBay, tx) {
        try {
            const executor = tx || this.db;
            const result = await executor`
                SELECT * FROM "CHUYENBAY"
                WHERE "MaChuyenBay" = ${maChuyenBay}
                LIMIT 1;
            `;
            return result[0] || null;
        } catch (err) {
            throw new DBError(err.message);
        }
    }
    async layChuyenBayTheoFilter(filter, tx){
        try{
            const executor= tx || this.db;
            const {maSanBayDi, maSanBayDen, maMayBay,ngayGio, maHienThi} = filter;
            const result = await executor`
                SELECT * FROM "CHUYENBAY"
                WHERE 1=1
                ${maSanBayDi?executor`AND "MaSanBayDi" = ${maSanBayDi}`:executor``}
                ${maSanBayDen?executor`AND "MaSanBayDen" = ${maSanBayDen}`:executor``}
                ${maMayBay?executor`AND "MaMayBay" = ${maMayBay}`:executor``}
                ${ngayGio?executor`AND "NgayGio" = ${ngayGio}`:executor``}
                ${maHienThi?executor`AND "MaHienThi" = ${maHienThi}`:executor``}
                ORDER BY "NgayGio" ASC, "MaHienThi" ASC;
            `;
            return result;
        }catch (err) {
            throw new DBError(err.message);
        }
    }
    async capNhatChuyenBay(maChuyenBay, data, tx) {
        try {
            const executor = tx || this.db;
            const columns = Object.keys(data);
            const rows = await executor`
                UPDATE "CHUYENBAY"
                SET ${executor(data, columns)}
                WHERE "MaChuyenBay" = ${maChuyenBay}
                RETURNING *;
            `;
            return rows[0];
        } catch (err) {
            throw new DBError(err.message);
        }
    }
    async xoaChuyenBay(maChuyenBay, tx) {
        try {
            const executor = tx || this.db;
            return await executor`
                DELETE FROM "CHUYENBAY"
                WHERE "MaChuyenBay" = ${maChuyenBay}
                RETURNING *;
            `;
        } catch (err) {
            throw new DBError(err.message);
        }
    }
}