
import * as TaiKhoanModel from "../models/tai_khoan.model.js";
import * as OtpModel from "../models/otp.model.js";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import {sendMail} from "../config/email.js";
import jwt from "jsonwebtoken";
import {HTTPError, DBError} from "../config/errors.js";
import 'dotenv/config';
import OtpService from "../services/otp.service.js";
import TaiKhoanRepo from "../data/tai_khoan.repo.js";
import TaiKhoanService from "../services/tai_khoan.service.js";
import OtpRepo from "../data/otp.repo.js";
import { AuthService } from "../services/auth.service.js";
import { errorHandler } from "../config/error_handler.js";

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
