import { ConflictError, NotFoundError, ValidationError } from '../../core/errors/errors.js';
import TaiKhoanBO from './tai_khoan.bo.js';
export default class TaiKhoanService {
    constructor(taiKhoanRepo){
        this.repo = taiKhoanRepo;
    }
    
    async kiemTraEmailVaTenDangNhap(option,tx) {
        const { email, tenDangNhap } = option;
        const taiKhoanRawByEmail = await this.repo.layTaiKhoan({email},tx);
        const taiKhoanRawByTenDangNhap = await this.repo.layTaiKhoan({ tenDangNhap },tx);
        const taiKhoanBOByEmail = new TaiKhoanBO(taiKhoanRawByEmail);
        const taiKhoanBOByTenDangNhap = new TaiKhoanBO(taiKhoanRawByTenDangNhap);

        if (taiKhoanBOByEmail.kiemTraTonTai() && taiKhoanBOByEmail.kiemTraDaXacThuc()) {
            throw new ConflictError( 'Email đã tồn tại!');
        }
        if (taiKhoanBOByTenDangNhap.kiemTraTonTai()) {
            if(!taiKhoanBOByEmail.kiemTraTonTai()||taiKhoanBOByTenDangNhap.maTaiKhoan!==taiKhoanBOByEmail.maTaiKhoan){
                throw new ConflictError( 'Tên đăng nhập đã tồn tại!');
            }
        }
        return taiKhoanBOByEmail.maTaiKhoan;
    }
    async capNhatTenDangNhapMatKhau(taiKhoanBO,tx) {
        const { maTaiKhoan, tenDangNhap, matKhau} = taiKhoanBO;
        console.log(maTaiKhoan+'dasd',tenDangNhap,matKhau);
        await Promise.all([
            this.repo.capNhatTaiKhoan({maTaiKhoan},{ field: 'MatKhau', value: matKhau },tx), 
            this.repo.capNhatTaiKhoan({maTaiKhoan},{field: 'TenDangNhap', value: tenDangNhap },tx)
        ]);
        return maTaiKhoan;
    }
    async taoTaiKhoan(taiKhoanBO, tx){
        const maTaiKhoan = await this.repo.taoTaiKhoan(taiKhoanBO,tx);
        return maTaiKhoan;
    }
    async layTaiKhoanBO(option,tx) {
        const taiKhoanRaw = await this.repo.layTaiKhoan(option,tx);
        return new TaiKhoanBO(taiKhoanRaw);
        
    }
    async kiemTraTaiKhoan(option,tx) {
        const taiKhoanRaw = await this.repo.layTaiKhoan(option,tx);
        const taiKhoanBo=new TaiKhoanBO(taiKhoanRaw);
        if (!taiKhoanBo.kiemTraDaXacThuc()) {
            throw new ValidationError('Tài khoản không tồn tại hoặc chưa xác thực');
        }
        return taiKhoanBo;
    }

    async kichHoatTaiKhoan(maTaiKhoan,tx){
        await this.repo.capNhatTaiKhoan({maTaiKhoan},{field:"TrangThai",value:TaiKhoanBO.TRANG_THAI_XAC_THUC},tx);
    }
    async capNhatMatKhau(maTaiKhoan,matKhau,tx){
        await this.repo.capNhatTaiKhoan({maTaiKhoan},{field:"MatKhau",value:matKhau},tx);
    }

    
    
}