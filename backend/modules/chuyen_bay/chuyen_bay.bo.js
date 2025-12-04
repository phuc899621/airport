export default class ChuyenBayBO {
    constructor({ MaChuyenBay=null, MaMayBay=null, 
        MaSanBayDi=null, MaSanBayDen=null, NgayGio=null, 
        ThoiGianBay=null, GiaVe=null, MaHienThi=null  }={}) {
        this.maChuyenBay = MaChuyenBay;
        this.maMayBay = MaMayBay;
        this.maSanBayDi = MaSanBayDi;
        this.maSanBayDen = MaSanBayDen;
        this.giaVe = GiaVe;
        this.ngayGio = NgayGio;
        this.thoiGianBay = ThoiGianBay;
        this.maHienThi = MaHienThi;
    }
}