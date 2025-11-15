import { useState } from 'react'
import axios from 'axios'

function RegisterForm({ onSwitchToAuthentication, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm: ''
  })
  const [loading, setLoading] = useState(false)

  const API_BASE = 'http://localhost:3000/auth'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirm) {
      alert('Mật khẩu xác nhận không khớp!')
      return
    }

    setLoading(true)
    try {
      // Gọi API đăng ký và gửi OTP
      const res = await axios.post(`${API_BASE}/dang-ky/gui-otp`, {
        tenDangNhap: formData.username,
        email: formData.email,
        matKhau: formData.password
      })
      
      // Lưu email vào localStorage để dùng cho xác thực
      localStorage.setItem('dangKyEmail', formData.email)
      
      alert(res.data.message || 'Mã OTP đã được gửi đến email của bạn!')
      onSwitchToAuthentication()
    } catch (err) {
      console.error('Lỗi đăng ký:', err)
      alert(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="icon">✈️</div>
        <h2>Đăng ký</h2>
        <p>Tạo tài khoản mới</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Tên đăng nhập</label>
          <input 
            type="text" 
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username123" 
            required 
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com" 
            required 
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Mật khẩu</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••" 
            required 
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="confirm">Xác nhận mật khẩu</label>
          <input 
            type="password" 
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            placeholder="••••••••" 
            required 
          />
        </div>
        
        <div className="form-options">
          <label className="checkbox">
            <input type="checkbox" required />
            <span>Tôi đồng ý với <a href="#">điều khoản dịch vụ</a></span>
          </label>
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
      </form>
      
      <div className="form-footer">
        <p>Đã có tài khoản? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Đăng nhập</a></p>
      </div>
    </div>
  )
}

export default RegisterForm
