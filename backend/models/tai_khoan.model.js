import db from '../config/db.js';
import DBError from '../config/db_error.js';

export const taoTaiKhoan = async (tx,taiKhoanBO) => {
    try {
        const executor = tx || db;
        const { tenDangNhap, matKhau, email } = taiKhoan;
        const taiKhoan=await executor`INSERT INTO "TAIKHOAN" ("TenDangNhap", "MatKhau","Email") VALUES (${tenDangNhap}, ${matKhau}, ${email}) RETURNING "MaTaiKhoan"`;
        return taiKhoan[0].MaTaiKhoan;
    } catch (err) {
        throw new DBError(err.message);
    }
}
export const layTaiKhoan = async (tx,option) => {
    try {
        const executor = tx || db;
        const { tenDangNhap, email, maTaiKhoan } = option;
        const query=[];
        if(tenDangNhap) query.push(`"TenDangNhap" = '${tenDangNhap}'`);
        if(email) query.push(`"Email" = '${email}'`);
        if(maTaiKhoan) query.push(`"MaTaiKhoan" = '${maTaiKhoan}'`);
        const result=await executor.unsafe(`SELECT * FROM "TAIKHOAN" WHERE ${query.join(' OR ')} LIMIT 1`);
        return result[0];
    
    } catch (err) {
        throw new DBError(err.message);
    }
}
export const capNhatTaiKhoan = async (tx,taiKhoan) => {
    try {
        const executor = tx || db;
        const { maTaiKhoan, field, value,email } = taiKhoan;
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