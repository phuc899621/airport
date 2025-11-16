
import * as TaiKhoanModel from "../models/tai_khoan.model.js";
import * as OtpModel from "../models/otp.model.js";
import bcrypt from "bcrypt";
import pool from "../config/db.js";
import {sendMail} from "../config/email.js";

export const dangKyTaiKhoan = async(req,res)=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { tenDangNhap, matKhau, email } = req.body;

        const checkEmail = await TaiKhoanModel.getTaiKhoan(client,{ email });
        const checkTenDangNhap = await TaiKhoanModel.getTaiKhoan(client,{ tenDangNhap });
        console.log(checkEmail);
        if (checkEmail) {
            if(checkEmail.TrangThai === 'da_xac_thuc'){
                await client.query('ROLLBACK');
                return res.status(400).json({
                    message: 'Email đã tồn tại!',
                    data: {}
                });
            }
            if (checkTenDangNhap) {
                await client.query('ROLLBACK');
                return res.status(400).json({
                    message: 'Tên đăng nhập đã tồn tại!',
                    data: {}
                });
            }
            const salt = await bcrypt.genSalt(10);
            const matKhauHash = await bcrypt.hash(matKhau, salt);
            const updateMatKhauObj={
                maTaiKhoan: checkEmail.MaTaiKhoan,
                field:"MatKhau",
                value: matKhauHash,
            }
            const updateTenDangNhapObj={
                maTaiKhoan: checkEmail.MaTaiKhoan,
                field:"TenDangNhap",
                value: tenDangNhap,
            }
            await TaiKhoanModel.updateTaiKhoan(client,updateMatKhauObj);
            await TaiKhoanModel.updateTaiKhoan(client,updateTenDangNhapObj);
            const otp = Math.floor(Math.random() * 9000) + 1000;
            await OtpModel.createOrReplaceOTP(client,{ maTaiKhoan: checkEmail.MaTaiKhoan, otp });
            await sendMail({
                to: email,
                subject: "Mã OTP xác thực đăng ký tài khoản Airport1",
                plain: `Chào bạn,\n\nMã OTP của bạn là: ${otp}\nMã có hiệu lực 30 phút.\n\nCảm ơn!`,
                html: `<p>Chào bạn,</p>
                        <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
                        <p>Mã có hiệu lực trong 30 phút.</p>`
            });
            
        }else{
            if (checkTenDangNhap) {
                await client.query('ROLLBACK');
                return res.status(400).json({
                    message: 'Tên đăng nhập đã tồn tại!',
                    data: {}
                });
            }
            const salt = await bcrypt.genSalt(10);
            const matKhauHash = await bcrypt.hash(matKhau, salt);
            const createTKObj={
                tenDangNhap,
                matKhau: matKhauHash,    
                email
            } 
            const result = await TaiKhoanModel.createTaiKhoan(client,createTKObj);
            console.log(result);
            const otp = Math.floor(Math.random() * 9000) + 1000;
            const maOTP=await OtpModel.createOrReplaceOTP(client,{ maTaiKhoan: result, otp });
            await sendMail({
                to: email,
                subject: "Mã OTP xác thực đăng ký tài khoản Airport1",
                plain: `Chào bạn,\n\nMã OTP của bạn là: ${otp}\nMã có hiệu lực 30 phút.\n\nCảm ơn!`,
                html: `<p>Chào bạn,</p>
                        <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
                        <p>Mã có hiệu lực trong 30 phút.</p>`
            });
        }
        
        
        await client.query('COMMIT');
        res.status(201).json({
            message: 'Đăng kí thành công! Vui lòng xác thực tài khoản qua email',
            data: {}
        });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}

export const xacThucTaiKhoan=async(req,res)=>{
    const client = await pool.connect();
    try {
        const { email,otp } = req.body;
        const checkEmail = await TaiKhoanModel.getTaiKhoan(client,{ email });
        if (!checkEmail) {
            return res.status(400).json({
                message: 'Email chưa đăng ký!',
                data: {}
            });
        }
        const checkOTP = await OtpModel.getOTP(client,{ maTaiKhoan: checkEmail.MaTaiKhoan, otp });
        if (!checkOTP) {
            return res.status(400).json({
                message: 'Mã hết hạn!',
                data: {}
            });
        }
        console.log(checkOTP);
        console.log(otp);
        if(checkOTP!=otp){
            return res.status(400).json({
                message: 'Mã sai!',
                data: {}
            });
        }
        const updateObj={
            maTaiKhoan: checkEmail.MaTaiKhoan,
            field:"TrangThai",
            value:"da_xac_thuc"
        }
        await TaiKhoanModel.updateTaiKhoan(client,updateObj);
        await OtpModel.deleteOTP(client,{ maTaiKhoan: checkEmail.MaTaiKhoan });
        res.status(201).json({
            message: 'Xác thực tài khoản thành công',
            data: {}
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}

function isEmail(str){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
}

export const dangNhap = async (req, res) => {
    const client = await pool.connect();
    try {
        const { identifier, matKhau } = req.body;
        let maTaiKhoan;
        if(isEmail(identifier)){
            const checkEmail = await TaiKhoanModel.getTaiKhoan(client,{ email: identifier });
            if (!checkEmail) {
                return res.status(404).json({
                    message: 'Email không tồn tại!',
                    data: {}
                });
            }
            maTaiKhoan = checkEmail.MaTaiKhoan;
        }else{
            const checkTenDangNhap = await TaiKhoanModel.getTaiKhoan(client,{ tenDangNhap: identifier });
            if (!checkTenDangNhap) {
                return res.status(400).json({
                    message: 'Tên đăng nhập không tồn tại!',
                    data: {}
                });
            }
            maTaiKhoan = checkTenDangNhap.MaTaiKhoan;
        }

        
        const taiKhoan = await TaiKhoanModel.getTaiKhoan(client,{ maTaiKhoan });
        const checkMatKhau = await bcrypt.compare(matKhau, taiKhoan.MatKhau);
        if (!checkMatKhau) {
            return res.status(400).json({
                message: 'Mật khẩu không đúng',
                data: {}
            });
        }
        req.session.maTaiKhoan = maTaiKhoan;
        res.status(200).json({
            message: 'Đăng nhập thành công',
            data: {}
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}