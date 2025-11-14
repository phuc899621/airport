import { useState, useEffect } from 'react';

function AuthenticationForm({ onSwitchToLogin, onSwitchToAuthentication }) {
    const [formData, setFormData] = useState({
        maXacThuc: '',
    });

    const [seconds, setSeconds] = useState(60);

    // Đếm ngược 60s
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

        if (formData.maXacThuc === '') {
            alert('Mã xác thực không khớp!');
            return;

        }

        console.log('Xác thực:', { maXacThuc: formData.maXacThuc });
        alert('Xác thực thành công! (Demo)');
        onSwitchToLogin();
    };

    const handleResend = (e) => {
        e.preventDefault();
        onSwitchToAuthentication(); // gọi lại gửi OTP
        setSeconds(60); // reset đếm ngược
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

export default AuthenticationForm;
