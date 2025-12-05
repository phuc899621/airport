import { ValidationError } from "../../core/errors/errors.js";
import TaiKhoanBO from "./tai_khoan.bo.js";
import EmailService from "./email.service.js";
import jwt from "jsonwebtoken";

export class AuthService {
    constructor(db, taiKhoanService, otpService) {
        this.db = db;
        this.taiKhoanService = taiKhoanService;
        this.otpService= otpService;
    }
    async dangKy(taiKhoanDto) {
        await this.db.begin(async (tx) => {
            const { tenDangNhap, matKhau, email } = taiKhoanDto;

            const taiKhoanBO=new TaiKhoanBO({ TenDangNhap: tenDangNhap, MatKhau: matKhau, Email: email });
            
            const taiKhoanTonTaiChuaXacThuc=await this.taiKhoanService.kiemTraEmailVaTenDangNhap({ email, tenDangNhap },tx);
            await taiKhoanBO.maHoaMatKhau();
            taiKhoanBO.maTaiKhoan=taiKhoanTonTaiChuaXacThuc;
    
            const maTaiKhoan = taiKhoanTonTaiChuaXacThuc
                ? await this.taiKhoanService.capNhatTenDangNhapMatKhau(taiKhoanBO,tx)
                : await this.taiKhoanService.taoTaiKhoan(taiKhoanBO,tx);

            const otp=await this.otpService.taoDangKyOTP(maTaiKhoan,tx);
            await EmailService.guiOtpDangKy(email, otp);
        });
    }

    async xacThucDangKy(dto){
        await this.db.begin(async (tx) => {
            const { email,otp } = dto;
            const taiKhoanBO = await this.taiKhoanService.layTaiKhoanBO({email},tx);
            if (!taiKhoanBO.kiemTraDaXacThuc()) {
                throw new ValidationError(400, 'Email chưa đăng ký!');
            }
            await this.otpService.kiemTraDangKyOTP(taiKhoanBO.maTaiKhoan,otp,tx);
            await this.taiKhoanService.capNhatTaiKhoan(taiKhoanBO.maTaiKhoan,tx);
            await this.otpService.xoaOTPDangKy(taiKhoanBO.maTaiKhoan,tx);
            
        })
    }
    async dangNhap(dto){
        const [maTaiKhoan,vaiTro]=await this.db.begin(async (tx) => {
            const { identifier, matKhau } = dto;
            const taiKhoanBO= this.laEmail(identifier)
                ?await this.taiKhoanService.layTaiKhoanBO({ email: identifier },tx): 
                await this.taiKhoanService.layTaiKhoanBO({ tenDangNhap: identifier },tx);
            console.log(taiKhoanBO);
            if (!taiKhoanBO.kiemTraDaXacThuc()) {
                throw new ValidationError('Tài khoản chưa đăng ký!');
            }
            
            if (!await taiKhoanBO.soSanhMatKhau(matKhau)) {
                throw new ValidationError('Mật khẩu không đúng!');
            }
            console.log(taiKhoanBO.soSanhMatKhau);
            return [taiKhoanBO.maTaiKhoan,taiKhoanBO.vaiTro];
        })
        return this.taoSession(maTaiKhoan,vaiTro);
    }

    async quenMatKhau(dto){
        await this.db.begin(async (tx) => {
            const { email } = dto;
            const taiKhoanBO = await this.taiKhoanService.kiemTraTaiKhoan({ email },tx);
            const otp = await this.otpService.taoQuenMatKhauOTP(taiKhoanBO.maTaiKhoan,tx); 
            await EmailService.guiOtpQuenMatKhau(email, otp);
        })
    }

    async xacThucQuenMatKhau(dto){
        return await this.db.begin(async (tx) => {
            const { email, otp} = dto;
            const taiKhoanBO = await this.taiKhoanService.kiemTraTaiKhoan({ email },tx);
            await this.otpService.kiemTraQuenMatKhauOTP(taiKhoanBO.maTaiKhoan,otp,tx);
            console.log(taiKhoanBO);
            const token = this.taoToken(taiKhoanBO.maTaiKhoan);
            await this.otpService.xoaOTPQuenMatKhau(taiKhoanBO.maTaiKhoan,tx);
            return token;
        })
    }
    async taoMoiMatKhau(dto){
        await this.db.begin(async (tx) => {
            const { matKhau, token } = dto;
            const tokenDecode = this.giaiMaToken(token);
            const maTaiKhoan = tokenDecode.MaTaiKhoan;
            const taiKhoanBo = await this.taiKhoanService.layTaiKhoanBO({ maTaiKhoan },tx);
            if (!taiKhoanBo.kiemTraDaXacThuc()) {
                throw new ValidationError('Mã tạo mặt khẩu mới sai hoặc hết hạn!');
            }
            taiKhoanBo.matKhau = matKhau;
            console.log("tai khoan"+taiKhoanBo);
            await taiKhoanBo.maHoaMatKhau();
            await this.taiKhoanService.capNhatMatKhau(taiKhoanBo.maTaiKhoan,taiKhoanBo.matKhau,tx);

        })
    }
    laEmail(str){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(str);
    }
    taoSession(maTaiKhoan,vaiTro){
        const token= jwt.sign({ MaTaiKhoan: maTaiKhoan, VaiTro: vaiTro }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN ||'1h' });
        return token;
    }
    taoToken(maTaiKhoan){
        return jwt.sign({ MaTaiKhoan: maTaiKhoan }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN ||'1h' });
    }
    giaiMaToken(token){
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    }
    giaiMaSession(token){
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    }

}