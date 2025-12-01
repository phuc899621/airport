export default class OtpBO{
    static LOAI_OTP_DANG_KY='dang_ky'
    static LOAI_OTP_QUEN_MAT_KHAU='quen_mat_khau'
    constructor({ OTP=null, MaTaiKhoan=null, LoaiOTP=null, }={}) {
        this.maTaiKhoan = MaTaiKhoan;
        this.loaiOTP = LoaiOTP;
        this.otp = OTP;
    }
    taoMaOTPVaLuu(){
        this.otp = Math.floor(1000 + Math.random() * 9000);
    }
    setLoaiOTPToDangKy(){
        this.loaiOTP = 'dang_ky';
    }
    setLoaiOTPToQuenMatKhau(){
        this.loaiOTP = 'quen_mat_khau';
    }
    soSanhOTP(otp){
        return this.otp === otp;
    }
}