
import db from "../../core/config/db.js";
import MayBayRepo from "./may_bay.repo.js";
import MayBayService from "./may_bay.service.js";
import {errorHandler} from "../../core/errors/error_handler.js";
const mayBayService = new MayBayService(new MayBayRepo(db));

export const taoMayBay = async (req, res, next) => {
    try{
        const mayBay = await mayBayService.taoMayBay(req.body); 
        res.status(201).json({
            success: true,
            message: "Tạo máy bay thành công!",
            data: mayBay
        }); 
    }catch(err){
        errorHandler(res, err);
    }
}

export const layMayBay = async (req, res, next) => {
    try{
        const {maMayBay} = req.params;
        const {loaiMayBay} = req.query;
        const mayBayList = await mayBayService.layMayBay({maMayBay,loaiMayBay});
        res.status(200).json({
            success: true,
            message: "Lấy máy bay thành công!",
            data: mayBayList
        }); 
    }catch(err){
        errorHandler(res, err);
    }
}

export const capNhatMayBay = async (req, res, next) => {
    try{
        const {maMayBay} = req.params;
        const mayBay = await mayBayService.capNhatMayBay(maMayBay,req.body);
        res.status(200).json({
            success: true,
            message: "Cập nhật máy bay thành công!",
            data: mayBay
        }); 
    }catch(err){
        errorHandler(res, err);
    }
}


export const xoaMayBay = async (req, res, next) => {
    try{
        const {maMayBay} = req.params;
        const mayBay = await mayBayService.xoaMayBay(maMayBay);
        res.status(200).json({
            success: true,
            message: "Xóa mây bay thành công!",
            data: {}
        }); 
    }catch(err){
        errorHandler(res, err);
    }
}