import { useState, useEffect } from 'react';
import axios from "axios"

function AuthenticationPW({ onSwitchToLogin , onSwitchNewPassword}) {
    const [formData, setFormData] = useState({
        maXacThuc: '',
    });

    const [seconds, setSeconds] = useState(3600);

    const API_BASE = "http://localhost:3000/auth";
    // Đếm ngược 3600 s
    useEffect(() => {
        if (seconds <= 0) return; // dừng khi hết thời gian
        const timer = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer); // cleanup khi component unmount
    }, [seconds]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem("dangKyEmail");
        try {
            const res = await axios.post(`${API_BASE}/quen-mat-khau/xac-thuc`, {
                email,
                otp: formData.maXacThuc
            });
            // Lưu token để dùng cho tạo mật khẩu mới
            localStorage.setItem("resetPasswordToken", res.data.data.token);
            alert(res.data.message);
            onSwitchNewPassword(); // xác thực xong → chuyển sang tạo mật khẩu mới
        } catch (err) {
            alert(err.response?.data?.message || "Xác thực thất bại");
        }
    };


    const handleResend = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem("dangKyEmail");
        try {
            const res = await axios.post(`${API_BASE}/quen-mat-khau/gui-otp`, { email });
            alert("OTP mới đã gửi về email!");
            setSeconds(3600); // reset lại thời gian
        } catch (err) {
            alert(err.response?.data?.message || "Gửi lại OTP thất bại");
        }
    };


    return (
        <div className="form-container">
            <div className="form-header">
                <div className="icon">✈️</div>
                <h2>Xác thực</h2>
                <p>
                    {seconds > 0
                        ? `Còn ${seconds}s để xác thực`
                        : 'Bạn có thể gửi lại mã OTP'}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="maXacThuc">Mã xác thực</label>
                    <input
                        type="text"
                        name="maXacThuc"
                        value={formData.maXacThuc}
                        onChange={handleChange}
                        placeholder="1234"
                        style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Xác nhận
                </button>
            </form>

            <div className="form-footer">
                <p>
                    Chưa nhận được{' '}
                    <a
                        href="#"
                        onClick={seconds === 0 ? handleResend : (e) => e.preventDefault()}
                        style={{ color: seconds === 0 ? 'blue' : 'gray', cursor: seconds === 0 ? 'pointer' : 'not-allowed' }}
                    >
                        Gửi lại
                    </a>
                </p>
            </div>
        </div>
    );
}
export default AuthenticationPW;
