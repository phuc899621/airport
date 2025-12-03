import MayBayBO from "./may_bay.bo.js";

export default class MayBayService{
    constructor(mayBayRepo){
        this.repo=mayBayRepo;
    }
    async taoMayBay({ maSanBay, loaiMayBay, slGheHang1, slGheHang2 }) {
        const sanBayRaw = await this.repo.taoSanBay({ maSanBay, loaiMayBay, slGheHang1, slGheHang2 });
        return new MayBayBO(sanBayRaw);
    }
    async layMayBay({ maMayBay, loaiMayBay }) {
        if(maMayBay) {
            const mayBayRaw=await this.repo.layMayBayTheoMaMayBay(maMayBay);
            return mayBayRaw?new MayBayBO(mayBayRaw):null;
        }
        console.log("tim maybay nhap vap"+maMayBay+","+loaiMayBay);
        let mayBayRaw = [];
        if(!loaiMayBay) {
            mayBayRaw = await this.repo.layTatCaMayBay();
        } else {
            mayBayRaw = await this.repo.laySanBayTheoLoaiMayBay(loaiMayBay);
        }
        return mayBayRaw.map(mayBayRaw => new MayBayBO(mayBayRaw));
    }
    async capNhatMayBay(maMayBay,update={}) {
        const fieldMap={
            maMayBay:"TenSanBay",
            loaiMayBay:"LoaiMayBay",
            slGheHang1:"SlGheHang1",
            slGheHang2:"SlGheHang2"
        }

        for (const [key,column] of Object.entries(fieldMap)) {
            if (update[key] !== undefined) {
                console.log("capnhat:",key,column,update[key]);
                await this.repo.capNhatMayBay(maMayBay, { field:column, value: update[key] });
            }
        }
        const mayBayRaw= await this.repo.layMayBayTheoMaMayBay(maMayBay);
        return new MayBayBO(mayBayRaw);
    }
    async xoaMayBay(maMayBay) {
        return await this.repo.xoaMayBay(maMayBay);
    }

}