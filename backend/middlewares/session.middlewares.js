import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {HTTPError} from '../config/errors.js';
import { errorHandler } from '../config/error_handler.js';
export function sessionMiddleware(req, res, next) {
  try{
    if(!req.session.token) {
      throw new HTTPError(401, "Chưa đăng nhập hoặc hết thời hạn đăng nhập");
    }
    const decoded=jwt.verify(req.session.token,process.env.JWT_SECRET_KEY);
    console.log(decoded);
    if(!decoded.MaTaiKhoan) throw new HTTPError(401, "Chưa đăng nhập hoặc hết thời hạn đăng nhập");
    req.maTaiKhoan=decoded.MaTaiKhoan;
    next();
  }catch(err){
    errorHandler(res, err);
  }
}
