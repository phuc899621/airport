
export function sessionMiddleware(req, res, next) {
  if(!req.session.maTaiKhoan) {
    return res.status(401).json({
      message:"Chưa đăng nhập hoặc hết thời hạn đăng nhập", 
      data: {}
    });
  }
  next();
}
