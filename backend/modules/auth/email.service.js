import { sendMail } from "../../core/config/email.js";
import { BaseError, EmailError } from "../../core/errors/errors.js";

export default class EmailService{
    static async guiOtpDangKy(email, otp) {
        return this._send({
            to: email,
            subject: "Mã OTP xác thực đăng ký tài khoản Cloud Airport",
            plain: `Chào bạn,\n\nMã OTP của bạn là: ${otp}\nMã có hiệu lực 30 phút.\n\nCảm ơn!`,
            html: `
                <p>Chào bạn,</p>
                <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
                <p>Mã có hiệu lực trong <b>30 phút</b>.</p>
            `
        });
    } 
    static async guiOtpQuenMatKhau(email, otp) {
        return this._send({
            to: email,
            subject: "Mã OTP khôi phục mật khẩu Cloud Airport",
            plain: `Mã OTP khôi phục của bạn: ${otp}`,
            html: `<p>Mã OTP khôi phục của bạn: <strong>${otp}</strong></p>`
        });
    }

    static async _send(emailObj){
        try{
            return await sendMail(emailObj);
        }catch(err){
            if(err instanceof EmailError) throw err;
            throw new BaseError({detail: "Lỗi hệ thống khi gửi mail"});
        }
    }
}