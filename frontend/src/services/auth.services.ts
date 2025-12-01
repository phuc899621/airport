import API from "./backend_api";

interface DangKyData {
  tenDangNhap: string;
  email: string;
  matKhau: string;
}

interface XacThucData {
  email: string;
  otp: string;
}

export const authService = {
  dangKy: async (data: DangKyData) => {
    try {
      const res = await API.post("/auth/dang-ky/gui-otp", data);
      console.log(res);
      return res.data;
    } catch (err: any) {
      throw new Error(err.message || "Đăng ký thất bại");
    }
  },

  xacThucTaiKhoan: async (data: XacThucData) => {
    try {
      const res = await API.post("/auth/dang-ky/xac-thuc", data);
      console.log(res);
      return res.data;
    } catch (err: any) {
      throw new Error(err.message || "Xác thực tài khoản thất bại");
    }
  }
};
