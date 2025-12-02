import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export default class LichChuyenBayBO{
    constructor({
        MaChuyenBay=null,
        TenSanBayDi=null,
        TenSanBayDen=null,
        MaMayBay=null,
        LoaiMayBay=null,
        ThoiGianBay=null,
        SLGheHang1=null,
        SLGheHang2=null,
        SLGheHang1ConLai=null,
        SLGheHang2ConLai=null,
        NgayGio=null,
        MaHienThi=null,
        GiaVe=null,
        GiaVeHang1=null,
        GiaVeHang2=null,
        SanBayTrungGian=[]
    }){
        const thoiGianDi=dayjs(NgayGio);
        const thoiGianDen=thoiGianDi.add(ThoiGianBay,'m');
        this.MaChuyenBay=MaChuyenBay;
        this.TenSanBayDi=TenSanBayDi;
        this.TenSanBayDen=TenSanBayDen;
        this.MaMayBay=MaMayBay;
        this.LoaiMayBay=LoaiMayBay;
        this.ThoiGianBay=ThoiGianBay;
        this.SLGheHang1=SLGheHang1;
        this.SLGheHang2=SLGheHang2;
        this.SLGheHang1ConLai=SLGheHang1ConLai;
        this.SLGheHang2ConLai=SLGheHang2ConLai;
        this.NgayGio=NgayGio;
        this.MaHienThi=MaHienThi;
        this.GiaVe=GiaVe;
        this.GiaVeHang1=GiaVeHang1;
        this.GiaVeHang2=GiaVeHang2;
        this.ThoiGianDi=thoiGianDi;
        this.ThoiGianDen=thoiGianDen;
        this.SanBayTrungGian=SanBayTrungGian;
    }
    themSanBayTrungGian(maChuyenBay,sanBayTrungGian){
        if(!maChuyenBay||maChuyenBay!==this.MaChuyenBay) return;
        this.SanBayTrungGian.push(sanBayTrungGian);
    }
}