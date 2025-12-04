import { NotFoundError } from "../../core/errors/errors.js";
import ChuyenBayBO from "./chuyen_bay.bo.js";
import LichChuyenBayBO from "./lich_chuyen_bay.bo.js";

export default class ChuyenBayService{
    constructor(chuyenBayRepo, sanBayRepo, mayBayRepo){
        this.repo=chuyenBayRepo;
        this.sanBayRepo=sanBayRepo;
        this.mayBayRepo=mayBayRepo;
    }
    async layLichChuyenBay(filter) {
        const result = await this.repo.layLichChuyenBay(filter);
        const lichChuyenBayMap=new Map();   
        console.log(result);
        for(const cb of result){
            const maChuyenBay=cb.MaChuyenBay;
            if(!lichChuyenBayMap.has(maChuyenBay)){
                lichChuyenBayMap.set(maChuyenBay,
                new LichChuyenBayBO(cb));
            }
            lichChuyenBayMap.get(maChuyenBay).themSanBayTrungGian(maChuyenBay,{
                MaSanBay: cb.MaSanBay,
                ThuTuDung: cb.ThuTuDung,
                ThoiGianDung: cb.ThoiGianDung,
                GhiChu: cb.GhiChu
            });
        }
        console.log(lichChuyenBayMap); 
        return lichChuyenBayMap;
    }
    async taoChuyenBay(data){
        const {maSanBayDi, maSanBayDen, maMayBay}=data;
        const sanBayDiRaw=await this.sanBayRepo.laySanBayTheoMaSanBay(maSanBayDi);
        const sanBayDenRaw=await this.sanBayRepo.laySanBayTheoMaSanBay(maSanBayDen);
        const mayBayRaw=await this.mayBayRepo.layMayBayTheoMaMayBay(maMayBay);
        if(!sanBayDiRaw) throw new NotFoundError("Mã sân bay đi không tồn tại");
        if(!sanBayDenRaw) throw new NotFoundError("Mã sân bay đến không tồn tại");
        if(!mayBayRaw) throw new NotFoundError("Mã máy bay không tồn tại");
        return new ChuyenBayBO(await this.repo.taoChuyenBay(data));
    }
    async layChuyenBay(maChuyenBay,data){
        const {maSanBayDi, maSanBayDen, maMayBay, ngayGio, maHienThi }=data;
        if(maChuyenBay) {
            const chuyenBayRaw=await this.repo.layChuyenBayTheoMaChuyenBay(maChuyenBay);
            return chuyenBayRaw? new ChuyenBayBO(chuyenBayRaw):null;
        }
        const chuyenBayRaws= await this.repo.layChuyenBayTheoFilter({maSanBayDi, maSanBayDen, maMayBay, ngayGio, maHienThi});
        return chuyenBayRaws.map(cb=>new ChuyenBayBO(cb));
    }
    async capNhatChuyenBay(maChuyenBay, update={}){
        const {maSanBayDi, maSanBayDen, maMayBay, ngayGio, maHienThi }=update;
        const fieldMap={
            maSanBayDi:'MaSanBayDi',
            maSanBayDen:'MaSanBayDen',
            maMayBay:'MaMayBay',
            ngayGio:'NgayGio',
            maHienThi:'MaHienThi',
            giaVe:'GiaVe',
            thoiGianBay:'ThoiGianBay'
        }
        const data={};
        if(maSanBayDi&&!(await this.sanBayRepo.laySanBayTheoMaSanBay(maSanBayDi))) {
            throw new NotFoundError("Sân bay đi không tồn tại");
        }
        if(maSanBayDen&&!(await this.sanBayRepo.laySanBayTheoMaSanBay(maSanBayDen))) {
            throw new NotFoundError("Sân bay đến không tồn tại");
        }
        if(maMayBay&&!(await this.mayBayRepo.layMayBayTheoMaMayBay(maMayBay))) {
            throw new NotFoundError("Mã máy bay không tồn tại");
        }
        for (const [key,column] of Object.entries(fieldMap)) {
            if (update[key] !== undefined) {
                console.log("capnhat:",key,column,update[key]);
                data[column]=update[key];
            }
        }
        if(Object.keys(data).length===0) throw new ValidationError("Vui lòng gửi trường để update");
        return new ChuyenBayBO(await this.repo.capNhatChuyenBay(maChuyenBay, data));
    }
    async xoaChuyenBay(maChuyenBay){
        return new ChuyenBayBO(await this.repo.xoaChuyenBay(maChuyenBay));
    }
}