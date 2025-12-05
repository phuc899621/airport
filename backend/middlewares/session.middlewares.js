import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { errorHandler } from '../core/errors/error_handler.js';
import { AuthenticationError, ForbiddenError, ValidationError } from '../core/errors/errors.js';
export function sessionMiddleware(req, res, next) {
  try{
    console.log(req.session.token);
    if(!req.session.token) {
      throw new AuthenticationError( "Chưa đăng nhập hoặc hết thời hạn đăng nhập");
    }
    
    const decoded=jwt.verify(req.session.token,process.env.JWT_SECRET_KEY);
    console.log("decode"+decoded.MaTaiKhoan);
    if(!decoded.MaTaiKhoan) throw new AuthenticationError("Chưa đăng nhập hoặc hết thời hạn đăng nhập");
    req.maTaiKhoan=decoded.MaTaiKhoan;
    next();
  }catch(err){
    errorHandler(res, err);
  }
}
export function adminMiddleware(req, res, next) {
  try{
    console.log(req.session.token);
    if(!req.session.token) {
      throw new AuthenticationError( "Chưa đăng nhập hoặc hết thời hạn đăng nhập");
    }
    
    const decoded=jwt.verify(req.session.token,process.env.JWT_SECRET_KEY);
    console.log("decode"+decoded.MaTaiKhoan);
    if(!decoded.MaTaiKhoan) throw new AuthenticationError("Chưa đăng nhập hoặc hết thời hạn đăng nhập");
    if(!decoded.VaiTro || decoded.VaiTro !== "admin") throw new ForbiddenError("Bạn không có quyền truy cập");
    req.maTaiKhoan=decoded.MaTaiKhoan;
    next();
  }catch(err){
    errorHandler(res, err);
  }
}
