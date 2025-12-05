export default class SanBayBO{
    constructor({ MaSanBay=null, TenSanBay=null, QuocGia=null }={}) {
        this.maSanBay = MaSanBay;
        this.tenSanBay = TenSanBay;
        this.quocGia = QuocGia;
    }
}