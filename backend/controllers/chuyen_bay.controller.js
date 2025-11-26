import { errorHandler } from '../config/error_handler.js';
import * as LichChuyenBayModel from '../models/lich_chuyen_bay.model.js';

export const getLichChuyenBay = async (req, res) => {
    try{
        const result = await LichChuyenBayModel.getLichChuyenBay();
        const lichChuyenBayMap=new Map();   
        console.log(result);
        for(const cb of result){
            const maChuyenBay=cb.MaChuyenBay;
            if(!lichChuyenBayMap.has(maChuyenBay)){
                lichChuyenBayMap.set(maChuyenBay,{
                    MaChuyenBay: cb.MaChuyenBay,
                    TenSanBayDi: cb.TenSanBayDi,
                    TenSanBayDen: cb.TenSanBayDen,
                    MaMayBay: cb.MaMayBay,
                    LoaiMayBay: cb.LoaiMayBay,
                    NgayGio: cb.NgayGio,
                    ThoiGianBay: cb.ThoiGianBay,
                    GiaVe: cb.GiaVe,
                    MaHienThi: cb.MaHienThi,
                    SLGheHang1: cb.SLGheHang1,
                    SLGheHang2: cb.SLGheHang2,
                    SanBayTrungGian: []
                });
            }
            lichChuyenBayMap.get(maChuyenBay).SanBayTrungGian.push({
                MaSanBay: cb.MaSanBay,
                ThuTuDung: cb.ThuTuDung,
                ThoiGianDung: cb.ThoiGianDung,
                GhiChu: cb.GhiChu
            });
        }
        console.log(lichChuyenBayMap); 


        res.status(200).json({
            message: "Lấy lịch chuyến bay thành công!",
            data: Array.from(lichChuyenBayMap.values())
        });
    } catch (err) {
        errorHandler(res, err);
    }
};