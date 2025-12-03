import { DBError } from "../../core/errors/errors.js";

export default class MayBayRepo {
    constructor(db) {
        this.db = db;
    }

    
    async taoMayBay(data, tx) {
        try {
            const { maSanBay, slGheHang1, slGheHang2, loaiMayBay } = data;
            const executor = tx || this.db;
            const rows = await executor`
                INSERT INTO "MAYBAY" ("MaSanBay", "LoaiMayBay", "SLGheHang1", "SLGheHang2")
                VALUES (${maSanBay}, ${loaiMayBay}, ${slGheHang1}, ${slGheHang2})
                RETURNING *;
            `;
            console.log("May Bay vua tao",rows)
            return rows[0];
        } catch (err) {
            throw new DBError(err.message);
        }
    }

    
    async layMayBayTheoMaMayBay(maMayBay, tx) {
        try {
            const executor = tx || this.db;
            const rows = await executor`
                SELECT * FROM "MAYBAY"
                WHERE "MaMayBay" = ${maMayBay}
                LIMIT 1;
            `;
            return rows[0] || null;
        } catch (err) {
            throw new DBError(err.message);
        }
    }
    async laySanBayTheoLoaiMayBay(loaiMayBay, tx) {
        try{
            const executor = tx || this.db;
            return await executor`
                SELECT * FROM "MayBay"
                WHERE "LoaiMayBay" ILIKE '%' || ${loaiMayBay} || '%'
            `;
        } catch (err) {
            throw new DBError(err.message);
        }
    }


    async layTatCaMayBay(tx) {
        try {
            const executor = tx || this.db;
            return await executor`
                SELECT * FROM "MAYBAY"
            `;
        } catch (err) {
            throw new DBError(err.message);
        }
    }


    async capNhatMayBay(maMayBay, {field, value}, tx) {
        try {
            const executor = tx || this.db;

            const columnName = executor.unsafe(`"${field}"`);

            const rows= await executor`
                UPDATE "MayBay"
                SET ${columnName} = ${value}
                WHERE "MaSanBay" = ${maMayBay}
                RETURNING *;
            `;

            return rows[0];
        } catch (err) {
            throw new DBError(err.message);
        }
    }

    
    async xoaMayBay(maMayBay, tx) {
        try {
            const executor = tx || this.db;

            await executor`
                DELETE FROM "MAYBAY"
                WHERE "MaMayBay" = ${maMayBay};
            `;
            return true;
        } catch (err) {
            throw new DBError(err.message);
        }
    }
}
