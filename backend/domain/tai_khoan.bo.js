import bcrypt from 'bcrypt';

export default class TaiKhoanBO {
    static TRANG_THAI_CHUA_XAC_THUC='chua_xac_thuc';
    static TRANG_THAI_XAC_THUC='da_xac_thuc';

    constructor({ MaTaiKhoan=null, TenDangNhap=null, Email=null, MatKhau=null, TrangThai=null }={}) {
        this.maTaiKhoan = MaTaiKhoan;
        this.tenDangNhap = TenDangNhap;
        this.email = Email;
        this.matKhau = MatKhau;
        this.trangThai = TrangThai;
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

}
