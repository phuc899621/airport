import db from "../config/db.js";
export const createOrReplaceOTP = async (tx,otpObj) => {
    try {
        const executor = tx || db;
        const { maTaiKhoan, otp, tenLoaiOTP } = otpObj;
        const maLoaiOTP=await executor`SELECT "MaLoaiOTP" FROM "LOAIOTP" WHERE "TenLoaiOTP" = ${tenLoaiOTP}`;
        const result = await executor`
            INSERT INTO "OTP" ("MaTaiKhoan", "OTP","MaLoaiOTP")
            VALUES (${maTaiKhoan}, ${otp}, ${maLoaiOTP[0].MaLoaiOTP})
            ON CONFLICT ("MaTaiKhoan","MaLoaiOTP")
            DO UPDATE SET 
                "OTP" = EXCLUDED."OTP",
                "NgayTao" = NOW()
            RETURNING "MaTaiKhoan"`;
        console.log(`Ma tai khoan create/replace otp: ${result[0].MaTaiKhoan}`);
        return result[0].MaTaiKhoan;
    } catch (err) {
        throw new Error(err.message);
    }
}
export const deleteOTP = async (tx,otpObj) => {
    try {
        const executor = tx || db;
        const { maTaiKhoan,tenLoaiOTP } = otpObj;
        const loaiOTP=await executor`SELECT * FROM "LOAIOTP" WHERE "TenLoaiOTP" = ${tenLoaiOTP}`;
        console.log(loaiOTP);
        const maLoaiOTP=loaiOTP[0]?.MaLoaiOTP;
        await executor`DELETE FROM "OTP" WHERE "MaTaiKhoan" = ${maTaiKhoan} AND "MaLoaiOTP" = ${maLoaiOTP}`; 
        return;
    } catch (err) {
        throw new Error(err.message);
    }
}
export const getOTP = async (tx,otpObj) => {

    try {
        const executor = tx || db;
        const { maTaiKhoan, tenLoaiOTP } = otpObj;
        const loaiOTP=await executor`SELECT "MaLoaiOTP" FROM "LOAIOTP" WHERE "TenLoaiOTP" = ${tenLoaiOTP}`;
        const maLoaiOTP=loaiOTP[0].MaLoaiOTP;
        const result = await executor`SELECT * FROM "OTP" WHERE "MaTaiKhoan" = ${maTaiKhoan} AND "MaLoaiOTP" = ${maLoaiOTP}`;
        return result[0]?.OTP;
    } catch (err) {
        throw new Error(err.message);
    }
}

export const generateOTP = () => Math.floor(1000 + Math.random() * 9000);