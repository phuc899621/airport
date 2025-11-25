import db from '../config/db.js';
import DBError from '../config/db_error.js';

export const createTaiKhoan = async (tx,taiKhoan) => {
    try {
        const executor = tx || db;
        const { tenDangNhap, matKhau, email } = taiKhoan;
        const [{MaTaiKhoan}]=await executor`INSERT INTO "TAIKHOAN" ("TenDangNhap", "MatKhau","Email") VALUES (${tenDangNhap}, ${matKhau}, ${email}) RETURNING "MaTaiKhoan"`;
        return MaTaiKhoan;
    } catch (err) {
        throw new Error(err.message);
    }
}
export const getTaiKhoan = async (tx,taiKhoan) => {
    try {
        const executor = tx || db;
        const { tenDangNhap, email, maTaiKhoan } = taiKhoan;
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
export const updateTaiKhoan = async (tx,taiKhoan) => {
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
        throw new Error(err.message);
    }
}