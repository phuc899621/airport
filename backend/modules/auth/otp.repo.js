import { DBError } from "../../core/errors/errors.js";

export default class OtpRepo{
    constructor(db){
        this.db=db;
    }

    async taoHoacThayTheOTP(otpBO, tx){
        try {
            const executor = tx || db;
            const { maTaiKhoan, otp, loaiOTP } = otpBO;
            const maLoaiOTP=await executor`SELECT "MaLoaiOTP" FROM "LOAIOTP" WHERE "TenLoaiOTP" = ${loaiOTP}`;
            const result = await executor`
                INSERT INTO "OTP" ("MaTaiKhoan", "OTP","MaLoaiOTP")
                VALUES (${maTaiKhoan}, ${otp}, ${maLoaiOTP[0].MaLoaiOTP})
                ON CONFLICT ("MaTaiKhoan","MaLoaiOTP")
                DO UPDATE SET 
                    "OTP" = EXCLUDED."OTP",
                    "NgayTao" = NOW()
                RETURNING "MaTaiKhoan"`;
            console.log(`Ma tai khoan create/replace otp: ${result[0].MaTaiKhoan}`);
        } catch (err) {
            throw new DBError(err.message);
        }
    }
    async xoaOTP(maTaiKhoan,loaiOTP,tx){
        try {
            const executor = tx || db;
            const loaiOTPRaws=await executor`SELECT * FROM "LOAIOTP" WHERE "TenLoaiOTP" = ${loaiOTP}`;
            console.log(loaiOTP);
            const maLoaiOTP=loaiOTPRaws[0]?.MaLoaiOTP;
            await executor`DELETE FROM "OTP" WHERE "MaTaiKhoan" = ${maTaiKhoan} AND "MaLoaiOTP" = ${maLoaiOTP}`; 
            return;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async layOTP(maTaiKhoan,loaiOTP,tx){
        try {
            const executor = tx||db;
            const loaiOTPRaws=await executor`SELECT * FROM "LOAIOTP" WHERE "TenLoaiOTP" = ${loaiOTP}`;
            const maLoaiOTP=loaiOTPRaws[0]?.MaLoaiOTP;
            const result = await executor`SELECT * FROM "OTP" WHERE "MaTaiKhoan" = ${maTaiKhoan} AND "MaLoaiOTP" = ${maLoaiOTP}`;
            return result[0]?.OTP;
        } catch (err) {
            throw new Error(err.message);
        }
    }

}
