
export const createOrReplaceOTP = async (client,otpObj) => {
    try {
        const { maTaiKhoan, otp, loaiOTP } = otpObj;
        const query = `
            INSERT INTO "OTPCODE" ("MaTaiKhoan", "OTP","LoaiOTP")
            VALUES ($1, $2, $3)
            ON CONFLICT ("MaTaiKhoan","LoaiOTP")
            DO UPDATE SET 
                "OTP" = EXCLUDED."OTP",
                "NgayTao" = NOW()
            RETURNING "MaOTP"`;
        const result = await client.query(query, [maTaiKhoan, otp, loaiOTP]);
        console.log(result.rows[0]?.MaOTP);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}
export const deleteOTP = async (client,otpObj) => {
    try {
        const { maOTP, maTaiKhoan,loaiOTP } = otpObj;
        if(maTaiKhoan){
            await client.query(`DELETE FROM "OTPCODE" WHERE "MaTaiKhoan" = $1 AND "LoaiOTP" = $2`, [maTaiKhoan,loaiOTP]); 
            return;
        }
        if(maOTP){
            await client.query(`DELETE FROM "OTPCODE" WHERE "MaOTP" = $1 AND "LoaiOTP" = $2`, [maOTP,loaiOTP]); 
            return;
        }
    } catch (err) {
        throw new Error(err.message);
    }
}
export const getOTP = async (client,otpObj) => {
    try {
        const { maTaiKhoan, otp, loaiOTP } = otpObj;
        const result = await client.query(`SELECT * FROM "OTPCODE" WHERE "MaTaiKhoan" = $1 AND "OTP" = $2 AND "LoaiOTP" = $3`, [maTaiKhoan, otp,loaiOTP]);
        console.log(result.rows[0]?.OTP);
        return result.rows[0]?.OTP;
    } catch (err) {
        throw new Error(err.message);
    }
}

export const generateOTP = () => Math.floor(1000 + Math.random() * 9000);