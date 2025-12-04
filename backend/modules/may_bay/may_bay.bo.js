export default class MayBayBO{
    constructor({ MaMayBay=null,MaSanBay=null, LoaiMayBay=null, SLGheHang1=null, SLGheHang2=null }={}) {
        this.maMayBay = MaMayBay;
        this.maSanBay = MaSanBay;
        this.loaiMayBay = LoaiMayBay;
        this.slGheHang1 = SLGheHang1;
        this.slGheHang2 = SLGheHang2;
    }
}