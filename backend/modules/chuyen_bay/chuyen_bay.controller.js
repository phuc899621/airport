import { errorHandler } from '../../core/errors/error_handler.js';

import ChuyenBayRepo from './chuyen_bay.repo.js';
import ChuyenBayService from './chuyen_bay.service.js';
import db from '../../core/config/db.js';

const chuyenBayRepo=new ChuyenBayRepo(db);
const chuyenBayService=new ChuyenBayService(chuyenBayRepo);

export const layLichChuyenBay = async (req, res) => {
    try{
        const lichChuyenBayMap=await chuyenBayService.layLichChuyenBay();
        res.status(200).json({
            success: true,
            message: "Lấy lịch chuyến bay thành công!",
            data: Array.from(lichChuyenBayMap.values())
        });
    } catch (err) {
        errorHandler(res, err);
    }
};