
import * as TaiKhoanModel from "../models/tai_khoan.model.js";
import * as OtpModel from "../models/otp.model.js";
import bcrypt from "bcrypt";
import pool from "../config/db.js";
import {sendMail} from "../config/email.js";
import jwt from "jsonwebtoken";

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
            await OtpModel.createOrReplaceOTP(client,{ maTaiKhoan: checkEmail.MaTaiKhoan, otp, loaiOTP:"dang_ky" });
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
            const maOTP=await OtpModel.createOrReplaceOTP(client,{ maTaiKhoan: result, otp, loaiOTP:"dang_ky" });
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
        await client.query('BEGIN');
        const { email,otp } = req.body;
        const checkEmail = await TaiKhoanModel.getTaiKhoan(client,{ email });
        if (!checkEmail) {
            await client.query('ROLLBACK');
            return res.status(400).json({
                message: 'Email chưa đăng ký!',
                data: {}
            });
        }
        const checkOTP = await OtpModel.getOTP(client,{ maTaiKhoan: checkEmail.MaTaiKhoan, otp, loaiOTP:"dang_ky" });
        if (!checkOTP) {
            await client.query('ROLLBACK');
            return res.status(400).json({
                message: 'Mã hết hạn!',
                data: {}
            });
        }
        console.log(checkOTP);
        console.log(otp);
        if(checkOTP!=otp){
            await client.query('ROLLBACK');
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
        await OtpModel.deleteOTP(client,{ maTaiKhoan: checkEmail.MaTaiKhoan, loaiOTP:"dang_ky" });
        await client.query('COMMIT');
        res.status(201).json({
            message: 'Xác thực tài khoản thành công',
            data: {}
        });
    } catch (err) {
        await client.query('ROLLBACK');
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
        await client.query('BEGIN');
        const { identifier, matKhau } = req.body;
        let maTaiKhoan;
        if(isEmail(identifier)){
            const checkEmail = await TaiKhoanModel.getTaiKhoan(client,{ email: identifier });
            if (!checkEmail) {
                await client.query('ROLLBACK');
                return res.status(404).json({
                    message: 'Email không tồn tại!',
                    data: {}
                });
            }
            maTaiKhoan = checkEmail.MaTaiKhoan;
        }else{
            const checkTenDangNhap = await TaiKhoanModel.getTaiKhoan(client,{ tenDangNhap: identifier });
            if (!checkTenDangNhap) {
                await client.query('ROLLBACK');
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
            await client.query('ROLLBACK');
            return res.status(400).json({
                message: 'Mật khẩu không đúng',
                data: {}
            });
        }
        req.session.maTaiKhoan = maTaiKhoan;
        await client.query('COMMIT');
        res.status(200).json({
            message: 'Đăng nhập thành công',
            data: {}
        });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}

export const quenMatKhau = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { email } = req.body;
        const checkEmail = await TaiKhoanModel.getTaiKhoan(client,{ email });
        if (!checkEmail) {
            await client.query('ROLLBACK');
            return res.status(400).json({
                message: 'Email chưa đăng ký!',
                data: {}
            });
        }
        const otp = OtpModel.generateOTP();
        await OtpModel.createOrReplaceOTP(client,{ maTaiKhoan: checkEmail.MaTaiKhoan, otp, loaiOTP:"quen_mat_khau" });
        await sendMail({
            to: email,
            subject: "Mã OTP xác thực đăng ký tài khoản CloudAirport",
            plain: `Chào bạn,\n\nMã OTP của bạn là: ${otp}\nMã có hiệu lực 30 phút.\n\nCảm ơn!`,
        });
        await client.query('COMMIT');
        res.status(201).json({
            message: 'Mã OTP được gửi đến email để tạo lại mật khẩu!',
            data: {}
        });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}

export const xacThucQuenMatKhau = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { email, otp} = req.body;
        const checkEmail = await TaiKhoanModel.getTaiKhoan(client,{ email });
        if (!checkEmail) {
            await client.query('ROLLBACK');
            return res.status(400).json({
                message: 'Email chưa đăng ký!',
                data: {}
            });
        }
        const checkOTP = await OtpModel.getOTP(client,{ maTaiKhoan: checkEmail.MaTaiKhoan, otp, loaiOTP:"quen_mat_khau" });
        if(checkOTP!=otp){
            await client.query('ROLLBACK');
            return res.status(400).json({
                message: 'Mã sai!',
                data: {}
            });
        }
        
        const jwtToken = jwt.sign({maTaiKhoan: checkEmail.MaTaiKhoan},"899621",{expiresIn:'1h'});
        await OtpModel.deleteOTP(client,{ maTaiKhoan: checkEmail.MaTaiKhoan, loaiOTP:"quen_mat_khau" });
        await client.query('COMMIT');
        res.status(201).json({
            message: 'Xác thực thành công, vui lòng gửi mật khẩu mới!',
            data: {
                token: jwtToken
            }
        });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}

export const taoMoiMatKhau = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { matKhau, token } = req.body;
        const tokenDecode = jwt.verify(token,"899621");

        const maTaiKhoan = tokenDecode.maTaiKhoan;
        const checkTaiKhoan = await TaiKhoanModel.getTaiKhoan(client,{ maTaiKhoan });
        if (!checkTaiKhoan) {
            await client.query('ROLLBACK');
            return res.status(400).json({
                message: 'Token tạo mới mật khẩu sai hoặc hết hạn!',
                data: {}
            });
        }

        const salt = await bcrypt.genSalt(10);
        const matKhauHash = await bcrypt.hash(matKhau, salt);
        const updateMatKhauObj={maTaiKhoan,field:"MatKhau",value: matKhauHash};
        await TaiKhoanModel.updateTaiKhoan(client,updateMatKhauObj);

        await client.query('COMMIT');
        res.status(201).json({
            message: 'Tạo mới mật khẩu thành công!',
            data: {}
        });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}