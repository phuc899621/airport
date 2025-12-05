import { DBError } from "../../core/errors/errors.js";

export default class SanBayRepo {
    constructor(db) {
        this.db = db;
    }

    
    async taoSanBay({ tenSanBay, quocGia }, tx) {
        try {
            const executor = tx || this.db;
            const rows = await executor`
                INSERT INTO "SANBAY" ("TenSanBay", "QuocGia")
                VALUES (${tenSanBay}, ${quocGia})
                RETURNING *;
            `;
            console.log("SanBay vua tao",rows)
            return rows[0];
        } catch (err) {
            throw new DBError(err.message);
        }
    }

    
    async laySanBayTheoMaSanBay(maSanBay, tx) {
        try {
            const executor = tx || this.db;
            const rows = await executor`
                SELECT * FROM "SANBAY"
                WHERE "MaSanBay" = ${maSanBay}
                LIMIT 1;
            `;
            return rows[0] || null;
        } catch (err) {
            throw new DBError(err.message);
        }
    }
    async laySanBayTheoTenSanBay(tenSanBay, tx) {
        try{
            const executor = tx || this.db;
            return await executor`
                SELECT * FROM "SANBAY"
                WHERE "TenSanBay" ILIKE '%' || ${tenSanBay} || '%'
                ORDER BY "TenSanBay" ASC;
            `;
        } catch (err) {
            throw new DBError(err.message);
        }
    }

    async laySanBayTheoQuocGia(quocGia, tx) {
        try{
            const executor = tx || this.db;
            return await executor`
                SELECT * FROM "SANBAY"
                WHERE "QuocGia" ILIKE '%' || ${quocGia} || '%'
                ORDER BY "QuocGia" ASC;
            `;
            
        }catch (err) {
            throw new DBError(err.message);
        }
    }

    async layTatCaSanBay(tx) {
        try {
            const executor = tx || this.db;
            return await executor`
                SELECT * FROM "SANBAY"
                ORDER BY "QuocGia" ASC, "MaSanBay" ASC;
            `;
        } catch (err) {
            throw new DBError(err.message);
        }
    }


    async capNhatSanBay(maSanBay, {field, value}, tx) {
        try {
            const executor = tx || this.db;

            const columnName = executor.unsafe(`"${field}"`);

            const rows= await executor`
                UPDATE "SANBAY"
                SET ${columnName} = ${value}
                WHERE "MaSanBay" = ${maSanBay}
                RETURNING *;
            `;

            return rows[0];
        } catch (err) {
            throw new DBError(err.message);
        }
    }

    
    async xoaSanBay(maSanBay, tx) {
        try {
            const executor = tx || this.db;

            await executor`
                DELETE FROM "SANBAY"
                WHERE "MaSanBay" = ${maSanBay};
            `;
            return true;
        } catch (err) {
            throw new DBError(err.message);
        }
    }
}
