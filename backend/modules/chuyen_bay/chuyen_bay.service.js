import LichChuyenBayBO from "./lich_chuyen_bay.bo.js";

export default class ChuyenBayService{
    constructor(chuyenBayRepo){
        this.repo=chuyenBayRepo;
    }
    async layLichChuyenBay() {
        const result = await this.repo.layLichChuyenBay();
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
}