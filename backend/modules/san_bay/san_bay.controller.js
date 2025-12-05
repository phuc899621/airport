import SanBayRepo from "./san_bay.repo.js";
import db from "../../core/config/db.js";
import SanBayService from "./san_bay.service.js";
import { errorHandler } from "../../core/errors/error_handler.js";

const sanBayRepo = new SanBayRepo(db)
const sanBayService=new SanBayService(sanBayRepo);

export const taoSanBay = async (req, res, next) => {
    try {
        const sanBay = await sanBayService.taoSanBay(req.body); 
        res.status(201).json({
            success: true,
            message: "Tạo sân bay thành công!",
            data: sanBay
        }); 
    } catch (err) {
        errorHandler(res, err);
    }
};

export const laySanBay=async(req,res,next)=>{
    try {
        const {maSanBay}=req.params;
        const {tenSanBay,quocGia}=req.query;
        const sanBay=await sanBayService.laySanBay({maSanBay,tenSanBay, quocGia});
        if(!sanBay) {
            res.status(200).json({
                success: true,
                message: `Không tìm thấy sân bay có mã ${maSanBay}!`,
                data: sanBay
            }); 
            return;
        }
        res.status(200).json({
            success: true,
            message: "Lấy sân bay thành công!",
            data: sanBay
        }); 
    } catch (err) {
        errorHandler(res, err);
    }
}
export const capNhatSanBay=async(req,res,next)=>{
    try {
        const {maSanBay}=req.params;
        const sanBay=await sanBayService.capNhatSanBay(maSanBay,req.body);
        res.status(200).json({
            success: true,
            message: "Cập nhật sân bay thành công!",
            data: sanBay
        }); 
    } catch (err) {
        errorHandler(res, err);
    }
}
export const xoaSanBay=async(req,res,next)=>{
    try {
        const {maSanBay}=req.params;
        const sanBay=await sanBayService.xoaSanBay(maSanBay);
        res.status(200).json({
            success: true,
            message: "Xóa sân bay thành công!",
            data: {}
        }); 
    } catch (err) {
        errorHandler(res, err);
    }
}