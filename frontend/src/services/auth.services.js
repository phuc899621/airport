import API from "./backend_api";

export const authService = {
  dangKy: async (data) => {
    try{
        const res= await API.post("/auth/dang-ky/gui-otp", data);
        console.log(res);
        return res.data;
    } catch(err){
        throw new Error(err.message || "Đăng ký thất bại");
    }
  },

  xacThucTaiKhoan: async (data) => {
    try{
        const res= await API.post("/auth/dang-ky/xac-thuc", data);
        console.log(res);
        return res.data;
    } catch(err){
        throw new Error(err.message || "Xác thực tài khoản thất bại");
    }
  }
};
