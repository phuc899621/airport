import bcrypt from 'bcrypt';

export default class TaiKhoanBO {
    static TRANG_THAI_CHUA_XAC_THUC='chua_xac_thuc';
    static TRANG_THAI_XAC_THUC='da_xac_thuc';
    static VAI_TRO_ADMIN='admin';
    

    constructor({ MaTaiKhoan=null, TenDangNhap=null, Email=null, MatKhau=null, TrangThai=null,VaiTro=null }={}) {
        this.maTaiKhoan = MaTaiKhoan;
        this.tenDangNhap = TenDangNhap;
        this.email = Email;
        this.matKhau = MatKhau;
        this.trangThai = TrangThai;
        this.vaiTro=VaiTro;
    }

    async maHoaMatKhau() {
        const salt = await bcrypt.genSalt(10);
        this.matKhau = await bcrypt.hash(this.matKhau, salt);
    }

    kiemTraDaXacThuc() {
        return this.trangThai === TaiKhoanBO.TRANG_THAI_XAC_THUC && this.maTaiKhoan !== null;
    }

    async soSanhMatKhau(matKhauNhap) {
        return await bcrypt.compare(matKhauNhap, this.matKhau);
    }
    kiemTraTonTai(){
        return this.maTaiKhoan!==null;
    }
    laAdmin(){
        return this.vaiTro===TaiKhoanBO.VAI_TRO_ADMIN;
    }

}
