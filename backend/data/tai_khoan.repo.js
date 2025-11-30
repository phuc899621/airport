import { DBError } from "../config/errors.js";

export default class TaiKhoanRepo{
    constructor(db) {
        this.db = db
    }

    async taoTaiKhoan(taiKhoanBO, tx){
        try{
            const executor = tx || this.db;
            const resultRaws=await executor`INSERT INTO "TAIKHOAN" ("TenDangNhap", "MatKhau","Email") VALUES (${taiKhoanBO.tenDangNhap}, ${taiKhoanBO.matKhau}, ${taiKhoanBO.email}) RETURNING "MaTaiKhoan"`;
            return resultRaws[0].MaTaiKhoan;
        }catch(err){
            throw new DBError(err.message);
        }
    }
    async layTaiKhoan(taiKhoanBO, tx){
        try {
            const executor = tx || db;
            console.log(taiKhoanBO);
            const query=[];
            if(taiKhoanBO.tenDangNhap) query.push(`"TenDangNhap" = '${taiKhoanBO.tenDangNhap}'`);
            if(taiKhoanBO.email) query.push(`"Email" = '${taiKhoanBO.email}'`);
            if(taiKhoanBO.maTaiKhoan) query.push(`"MaTaiKhoan" = '${taiKhoanBO.maTaiKhoan}'`);
            
            if(query.length===0) return null;
            const resultRaws=await executor.unsafe(`SELECT * FROM "TAIKHOAN" WHERE ${query.join(' OR ')} LIMIT 1`);
            console.log(resultRaws);
            return resultRaws[0];
        
        } catch (err) {
            throw new DBError(err.message);
        }
    }
    async capNhatTaiKhoan(taiKhoanBO, update, tx) {
        try {
            const executor = tx || db;
            const { maTaiKhoan, email } = taiKhoanBO;
            const { field, value } = update;
            console.log(`Mataikhoan: ${maTaiKhoan}, field: ${field}, value: ${value}, email: ${email}`);
            if(maTaiKhoan){
                await executor.unsafe(`UPDATE "TAIKHOAN" SET "${field}" = '${value}' WHERE "MaTaiKhoan" = '${maTaiKhoan}'`);
                return;
            }
            if(email){
                await executor.unsafe(`UPDATE "TAIKHOAN" SET "${field}" = '${value}' WHERE "Email" = '${email}'`);
                return;
            }
            return;
        } catch (err) {
            throw new DBError(err.message);
        }
    }
}
