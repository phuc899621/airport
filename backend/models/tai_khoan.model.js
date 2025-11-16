
export const createTaiKhoan = async (client,taiKhoan) => {
    try {
        const { tenDangNhap, matKhau, email } = taiKhoan;
        const result=await client.query(`INSERT INTO "TAIKHOAN" ("TenDangNhap", "MatKhau","Email") VALUES ($1, $2, $3) RETURNING "MaTaiKhoan"`, [tenDangNhap, matKhau, email]);
        return result.rows[0]?.MaTaiKhoan;
    } catch (err) {
        throw new Error(err.message);
    }
}
export const getTaiKhoan = async (client,taiKhoan) => {
    try {
        const { tenDangNhap, email, maTaiKhoan } = taiKhoan;
        const result = await client.query(`SELECT * FROM "TAIKHOAN" WHERE "TenDangNhap" = $1 OR "Email" = $2 OR "MaTaiKhoan" = $3`, [tenDangNhap, email,maTaiKhoan]);
        console.log(result.rows[0]);
        return result.rows[0];
    
    } catch (err) {
        throw new Error(err.message);
    }
}
export const updateTaiKhoan = async (client,taiKhoan) => {
    try {
        const { maTaiKhoan, field, value,email } = taiKhoan;
        if(maTaiKhoan){
            await client.query(`UPDATE "TAIKHOAN" SET "${field}" = $1 WHERE "MaTaiKhoan" = $2`,[value,maTaiKhoan]);
            return;
        }
        if(email){
            await client.query(`UPDATE "TAIKHOAN" SET "${field}" = $1 WHERE "Email" = $2`,[value,email]);
            return;
        }
        return;
    } catch (err) {
        throw new Error(err.message);
    }
}