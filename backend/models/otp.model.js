
export const createOrReplaceOTP = async (client,otpObj) => {
    try {
        const { maTaiKhoan, otp } = otpObj;
        const query = `
            INSERT INTO "OTPCODE" ("MaTaiKhoan", "OTP")
            VALUES ($1, $2)
            ON CONFLICT ("MaTaiKhoan")
            DO UPDATE SET 
                "OTP" = EXCLUDED."OTP",
                "NgayTao" = NOW()
            RETURNING "MaOTP"`;
        const result = await client.query(query, [maTaiKhoan, otp]);
        console.log(result.rows[0]?.MaOTP);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}
export const deleteOTP = async (client,otpObj) => {
    try {
        const { maOTP, maTaiKhoan } = otpObj;
        if(maTaiKhoan){
            await client.query(`DELETE FROM "OTPCODE" WHERE "MaTaiKhoan" = $1`, [maTaiKhoan]); 
            return;
        }
        if(maOTP){
            await client.query(`DELETE FROM "OTPCODE" WHERE "MaOTP" = $1`, [maOTP]); 
            return;
        }
    } catch (err) {
        throw new Error(err.message);
    }
}
export const getOTP = async (client,otpObj) => {
    try {
        const { maTaiKhoan, otp } = otpObj;
        const result = await client.query(`SELECT * FROM "OTPCODE" WHERE "MaTaiKhoan" = $1 AND "OTP" = $2`, [maTaiKhoan, otp]);
        console.log(result.rows[0]?.OTP);
        return result.rows[0]?.OTP;
    } catch (err) {
        throw new Error(err.message);
    }
}