
import db from "../../core/config/db.js";
import 'dotenv/config';
import OtpService from "./otp.service.js";
import TaiKhoanRepo from "./tai_khoan.repo.js";
import TaiKhoanService from "./tai_khoan.service.js";
import OtpRepo from "./otp.repo.js";
import { AuthService } from "./auth.service.js";
import { errorHandler } from "../../core/errors/error_handler.js";

const taiKhoanRepo=new TaiKhoanRepo(db);
const otpRepo=new OtpRepo(db);
const taiKhoanService=new TaiKhoanService(taiKhoanRepo);
const otpService=new OtpService(otpRepo);
const authService = new AuthService(db, taiKhoanService, otpService);

export const dangKyTaiKhoan = async(req,res)=>{
    try {
        await authService.dangKy(req.body);
        res.status(201).json({ 
            success: true,
            message: 'Đăng ký tài khoản thành công, vui lòng xác thực qua email!', 
            data: {} 
        });
    } catch (err) {
        errorHandler(res, err);
    }
}

export const xacThucTaiKhoan=async(req,res)=>{
    try {
        await authService.xacThucDangKy(req.body);
        res.status(201).json({
            success: true,
            message: 'Xác thực tài khoản thành công',
            data: {}
        });
    } catch (err) {
        errorHandler(res, err);
    } 
}


export const dangNhap = async (req, res) => {
    try {
        const token =await authService.dangNhap(req.body);
        req.session.token = token;
        res.status(201).json({
            success: true,
            message: 'Đăng nhập thành công',
            data: {}
        });
    } catch (err) {
        console.log(err);
        errorHandler(res, err);
    } 
}

export const quenMatKhau = async (req, res) => {
    try {
        await authService.quenMatKhau(req.body);
        res.status(201).json({
            success: true,
            message: 'Mã OTP được gửi đến email để tạo lại mật khẩu!',
            data: {}
        });
    } catch (err) {
        errorHandler(res, err);
    } 
}

export const xacThucQuenMatKhau = async (req, res) => {

    try {
        const token=await authService.xacThucQuenMatKhau(req.body);
        res.status(201).json({
            success: true,
            message: 'Xác thực thành công, vui lòng gửi mật khẩu mới!',
            data: {
                token
            }
        });
    } catch (err) {
        errorHandler(res, err);
    } 
}

export const taoMoiMatKhau = async (req, res) => {
    try {
        await authService.taoMoiMatKhau(req.body);
       
        res.status(201).json({
            success: true,
            message: 'Đổi mật khẩu thành công!',
            data: {}
        });
    } catch (err) {
        errorHandler(res, err);
    } 
    
}
