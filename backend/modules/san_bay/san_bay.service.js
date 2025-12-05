
import SanBayBO from "./san_bay.bo.js";

export default class SanBayService{
    constructor(sanBayRepo){
        this.repo=sanBayRepo
    }
    async taoSanBay({ tenSanBay, quocGia }) {
        const sanBayRaw = await this.repo.taoSanBay({ tenSanBay, quocGia });
        return new SanBayBO(sanBayRaw);
    }
    async laySanBay({ maSanBay,tenSanBay, quocGia }) {
        if(maSanBay) {
            const sanBayRaw=await this.repo.laySanBayTheoMaSanBay(maSanBay);
            return sanBayRaw?new SanBayBO(sanBayRaw):null;
        }
        console.log("tim san bay nhap vap"+maSanBay+","+tenSanBay+","+quocGia);
        if(!tenSanBay && !quocGia) return await this.repo.layTatCaSanBay();
        let dsSanBay = []
        if(tenSanBay){
            dsSanBay=await this.repo.laySanBayTheoTenSanBay(tenSanBay);
        }
        
        if(quocGia) {
            const dsSanBayTheoQuocGia=await this.repo.laySanBayTheoQuocGia(quocGia);
            dsSanBay=dsSanBay.length?dsSanBay.filter(
                s => dsSanBayTheoQuocGia.some(
                    q=>q.maSanBay===s.maSanBay)):dsSanBayTheoQuocGia;
        }
        console.log("Danh sach san bay"+dsSanBay);
        return dsSanBay.filter(s=>s).map(s=>new SanBayBO(s));
    }
    async capNhatSanBay(maSanBay,update={}) {
        const fieldMap={
            tenSanBay:"TenSanBay",
            quocGia:"QuocGia"
        }

        for (const [key,column] of Object.entries(fieldMap)) {
            if (update[key] !== undefined) {
                console.log("capnhat:",key,column,update[key]);
                await this.repo.capNhatSanBay(maSanBay, { field:column, value: update[key] });
            }
        }
        const sanBayRaw= await this.repo.laySanBayTheoMaSanBay(maSanBay);
        return new SanBayBO(sanBayRaw);
    }
    async xoaSanBay(maSanBay) {
        return await this.repo.xoaSanBay(maSanBay);
    }

}