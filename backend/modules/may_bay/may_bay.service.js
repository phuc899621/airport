import { NotFoundError, ValidationError } from "../../core/errors/errors.js";
import MayBayBO from "./may_bay.bo.js";

export default class MayBayService{
    constructor(mayBayRepo, sanBayRepo) {
        this.repo=mayBayRepo;
        this.sanBayRepo=sanBayRepo
    }
    async taoMayBay({ maSanBay, loaiMayBay, slGheHang1, slGheHang2 }) {
        const sanBayRaw = await this.sanBayRepo.laySanBayTheoMaSanBay(maSanBay);
        if(!sanBayRaw) throw new NotFoundError("Mã sân bay không tồn tại");
        const mayBayRaw = await this.repo.taoMayBay({ maSanBay, loaiMayBay, slGheHang1, slGheHang2 });
        return new MayBayBO(mayBayRaw);
    }
    async layMayBay({ maMayBay, loaiMayBay, maSanBay }) {
        if(maMayBay) {
            const mayBayRaw=await this.repo.layMayBayTheoMaMayBay(maMayBay);
            return mayBayRaw?new MayBayBO(mayBayRaw):null;
        }
        console.log("tim maybay nhap vap"+maSanBay+","+loaiMayBay);
        const mayBayRaw=await this.repo.layMayBayTheoFilter({maSanBay,loaiMayBay});
        return mayBayRaw.map(mayBayRaw => new MayBayBO(mayBayRaw));
    }
    async capNhatMayBay(maMayBay,update={}) {
        const fieldMap={
            maSanBay:"MaSanBay",
            loaiMayBay:"LoaiMayBay",
            slGheHang1:"SLGheHang1",
            slGheHang2:"SLGheHang2"
        }
        const data={};
        if(update.maSanBay&&!(await this.sanBayRepo.laySanBayTheoMaSanBay(update.maSanBay))) {
            throw new NotFoundError("Mã sân bay không tồn tại");
        }
        for (const [key,column] of Object.entries(fieldMap)) {
            if (update[key] !== undefined) {
                console.log("capnhat:",key,column,update[key]);
                data[column]=update[key];
            }
        }
        if(Object.keys(data).length===0) throw new ValidationError("Vui lòng gửi trường để update");
        const mayBayRaw= await this.repo.capNhatMayBay(maMayBay,data);
        return new MayBayBO(mayBayRaw);
    }
    async xoaMayBay(maMayBay) {
        return await this.repo.xoaMayBay(maMayBay);
    }

}