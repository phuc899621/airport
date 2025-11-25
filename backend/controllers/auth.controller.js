
import * as TaiKhoanModel from "../models/tai_khoan.model.js";
import * as OtpModel from "../models/otp.model.js";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import {sendMail} from "../config/email.js";
import jwt from "jsonwebtoken";
import HTTPError from "../config/http_error.js";
import DBError from "../config/db_error.js";
import 'dotenv/config';

export const dangKyTaiKhoan = async(req,res)=>{
    try {
        await db.begin(async (tx) => {
            const { tenDangNhap, matKhau, email } = req.body;

            const checkEmail = await TaiKhoanModel.getTaiKhoan(tx, { email });
            const checkTenDangNhap = await TaiKhoanModel.getTaiKhoan(tx, { tenDangNhap });

            if (checkEmail?.TrangThai === 'da_xac_thuc') {
                throw new HTTPError(400, 'Email đã tồn tại!');
            }
            if (checkTenDangNhap) {
                if(!checkEmail||checkTenDangNhap.MaTaiKhoan!==checkEmail.MaTaiKhoan){
                    throw new HTTPError(400, 'Tên đăng nhập đã tồn tại!');
                }
            }

            const salt = await bcrypt.genSalt(10);
            const matKhauHash = await bcrypt.hash(matKhau, salt);

        
            const maTaiKhoan = checkEmail
                ? await Promise.all([
                    TaiKhoanModel.updateTaiKhoan(tx, { maTaiKhoan: checkEmail.MaTaiKhoan, field: 'MatKhau', value: matKhauHash }),
                    TaiKhoanModel.updateTaiKhoan(tx, { maTaiKhoan: checkEmail.MaTaiKhoan, field: 'TenDangNhap', value: tenDangNhap })
                ]).then(() => checkEmail.MaTaiKhoan)
                : await TaiKhoanModel.createTaiKhoan(tx, { tenDangNhap, matKhau: matKhauHash,email });

            const otp = Math.floor(Math.random() * 9000) + 1000;
            await OtpModel.createOrReplaceOTP(tx, { maTaiKhoan, otp, tenLoaiOTP: 'dang_ky' });
            await sendMail({
                to: email,
                subject: 'Mã OTP xác thực đăng ký tài khoản Airport1',
                plain: `Chào bạn,\n\nMã OTP của bạn là: ${otp}\nMã có hiệu lực 30 phút.\n\nCảm ơn!`,
                html: `<p>Chào bạn,</p><p>Mã OTP của bạn là: <strong>${otp}</strong></p><p>Mã có hiệu lực trong 30 phút.</p>`
            });
            });
            res.status(201).json({ 
                message: 'Đăng ký tài khoản thành công, vui lòng xác thực qua email!', 
                data: {} 
            });

    } catch (err) {
        errorHandler(err, res);
    }
}

export const xacThucTaiKhoan=async(req,res)=>{
    try {
        await db.begin(async (tx) => {
            const { email,otp } = req.body;
            const checkEmail = await TaiKhoanModel.getTaiKhoan(tx,{ email });
            if (!checkEmail) {
                throw new HTTPError(400, 'Email chưa đăng ký!');
            }
            const checkOTP = await OtpModel.getOTP(tx,{ maTaiKhoan: checkEmail.MaTaiKhoan, otp, tenLoaiOTP:"dang_ky" });
            console.log(checkOTP);
            if (!checkOTP) {
                throw new HTTPError(400, 'Mã hết hạn!');
            }
            if(checkOTP!=otp){
                throw new HTTPError(400, 'Mã sai!');
            }
            const updateObj={
                maTaiKhoan: checkEmail.MaTaiKhoan,
                field:"TrangThai",
                value:"da_xac_thuc"
            }
            await TaiKhoanModel.updateTaiKhoan(tx,updateObj);
            await OtpModel.deleteOTP(tx,{ maTaiKhoan: checkEmail.MaTaiKhoan, tenLoaiOTP:"dang_ky" });
        })
        res.status(201).json({
            message: 'Xác thực tài khoản thành công',
            data: {}
        });
    } catch (err) {
        errorHandler(res, err);
    } 
}


export const dangNhap = async (req, res) => {
    try {
        const maTaiKhoan=await db.begin(async (tx) => {
            const { identifier, matKhau } = req.body;
            let maTaiKhoan;
            if(isEmail(identifier)){
                const checkEmail = await TaiKhoanModel.getTaiKhoan(tx,{ email: identifier });
                if (!checkEmail) {
                    throw new HTTPError(400, 'Email chưa đăng ký!');
                }
                maTaiKhoan = checkEmail.MaTaiKhoan;
            }else{
                const checkTenDangNhap = await TaiKhoanModel.getTaiKhoan(tx,{ tenDangNhap: identifier });
                if (!checkTenDangNhap) {
                    throw new HTTPError(400, 'Tên đăng nhập không tồn tại!');
                }
                maTaiKhoan = checkTenDangNhap.MaTaiKhoan;
            }

            const taiKhoan = await TaiKhoanModel.getTaiKhoan(tx,{ maTaiKhoan });
            const checkMatKhau = await bcrypt.compare(matKhau, taiKhoan.MatKhau);
            if (!checkMatKhau) {
                throw new HTTPError(400, 'Mật khẩu không đúng!');
            }
            return maTaiKhoan;
        })
        const token = jwt.sign({ MaTaiKhoan: maTaiKhoan }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN ||'1h' });
        req.session.token = token;
        res.status(200).json({
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
        await db.begin(async (tx) => {
            const { email } = req.body;
            const checkEmail = await TaiKhoanModel.getTaiKhoan(tx,{ email });
            if (!checkEmail) {
                throw new HTTPError(400, 'Email chưa đăng ký!');
            }
            const otp = OtpModel.generateOTP();
            await OtpModel.createOrReplaceOTP(tx,{ maTaiKhoan: checkEmail.MaTaiKhoan, otp, tenLoaiOTP:"quen_mat_khau" });
            await sendMail({
                to: email,
                subject: "Mã OTP khôi phục mật khẩu CloudAirport",
                plain: `Chào bạn,\n\nMã OTP của bạn là: ${otp}\nMã có hiệu lực 30 phút.\n\nCảm ơn!`,
            });
        })
        
        res.status(201).json({
            message: 'Mã OTP được gửi đến email để tạo lại mật khẩu!',
            data: {}
        });
    } catch (err) {
        errorHandler(res, err);
    } 
}

export const xacThucQuenMatKhau = async (req, res) => {

    try {
        const token = await db.begin(async (tx) => {
            const { email, otp} = req.body;
            const checkEmail = await TaiKhoanModel.getTaiKhoan(tx,{ email });
            if (!checkEmail) {
                throw new HTTPError(400, 'Email chưa đăng ký!');
            }
            const checkOTP = await OtpModel.getOTP(tx,{ maTaiKhoan: checkEmail.MaTaiKhoan, otp, tenLoaiOTP:"quen_mat_khau" });
            if(checkOTP!=otp){
                throw new HTTPError(400, 'Mã sai!');
            }
            
            const token = jwt.sign({maTaiKhoan: checkEmail.MaTaiKhoan},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES_IN ||'1h'});
            await OtpModel.deleteOTP(tx,{ maTaiKhoan: checkEmail.MaTaiKhoan, tenLoaiOTP:"quen_mat_khau" });
            return token;
        })
        res.status(201).json({
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
        await db.begin(async (tx) => {
            const { matKhau, token } = req.body;
            const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const maTaiKhoan = tokenDecode.maTaiKhoan;
            const checkTaiKhoan = await TaiKhoanModel.getTaiKhoan(tx,{ maTaiKhoan });
            if (!checkTaiKhoan) {
                throw new HTTPError(400, 'Mã tạo mặt khẩu mới sai hoặc hết hạn!');
            }
            const salt = await bcrypt.genSalt(10);
            const matKhauHash = await bcrypt.hash(matKhau, salt);
            const updateMatKhauObj={maTaiKhoan,field:"MatKhau",value: matKhauHash};
            await TaiKhoanModel.updateTaiKhoan(tx,updateMatKhauObj);

        })
       
        res.status(201).json({
            message: 'Đổi mật khẩu thành công!',
            data: {}
        });
    } catch (err) {
        errorHandler(res, err);
    } 
}

function errorHandler(res,err){
    if (err instanceof HTTPError) {
        return res.status(err.status).json({ message: err.message, data: err.data });
    }
    if(err instanceof DBError){
        return res.status(err.status).json({ message: err.message, data: err.data, error: err.error });
    }
    return res.status(500).json({ message: "Server error",error: err.message, data: {} });
}
function isEmail(str){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
}