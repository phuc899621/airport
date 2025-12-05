import { ValidationError } from "../../core/errors/errors.js";
import OtpBO from "./otp.bo.js";

export default class OtpService{
    constructor(otpRepo){
        this.repo=otpRepo;
    }
    async taoDangKyOTP(maTaiKhoan,tx){
        const otpBO=new OtpBO({ MaTaiKhoan: maTaiKhoan});
        otpBO.taoMaOTPVaLuu();
        otpBO.setLoaiOTPToDangKy();
        await this.repo.taoHoacThayTheOTP(otpBO,tx);
        return otpBO.otp;
    }
    async taoQuenMatKhauOTP(maTaiKhoan,tx){
        const otpBO=new OtpBO({ MaTaiKhoan: maTaiKhoan});
        otpBO.taoMaOTPVaLuu();
        otpBO.setLoaiOTPToQuenMatKhau();
        await this.repo.taoHoacThayTheOTP(otpBO,tx);
        return otpBO.otp;
    }
    async kiemTraDangKyOTP(maTaiKhoan,otp,tx){
        const otpTuDB=await this.repo.layOTP(maTaiKhoan,OtpBO.LOAI_OTP_DANG_KY,tx);
        if(!otpTuDB) throw new ValidationError('Mã hết hạn');
        if(otpTuDB!=otp) throw new ValidationError('Mã sai');
        return otpTuDB;
    }
    async kiemTraQuenMatKhauOTP(maTaiKhoan,otp,tx){
        const otpTuDB=await this.repo.layOTP(maTaiKhoan,OtpBO.LOAI_OTP_QUEN_MAT_KHAU,tx);
        if(!otpTuDB) throw new ValidationError('Mã hết hạn');
        if(otpTuDB!=otp) throw new ValidationError('Mã sai');
        return otpTuDB;
    }
    async xoaOTPDangKy(maTaiKhoan,tx){
        await this.repo.xoaOTP(maTaiKhoan,OtpBO.LOAI_OTP_DANG_KY,tx);
    }
    async xoaOTPQuenMatKhau(maTaiKhoan,tx){
        await this.repo.xoaOTP(maTaiKhoan,OtpBO.LOAI_OTP_QUEN_MAT_KHAU,tx);
    }
}