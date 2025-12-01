import { useState, FormEvent, ChangeEvent } from 'react'
import axios from 'axios'

interface SendEmailFormProps {
  onSwitchToLogin: () => void
  onSwitchToAuthenticationPW: () => void
}

interface FormData {
  email: string
}

function SendEmailForm({ onSwitchToLogin, onSwitchToAuthenticationPW }: SendEmailFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
  })
  const [loading, setLoading] = useState(false)
  const API_BASE = 'http://localhost:3000/auth'
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    try {
      // Gọi API đăng ký và gửi OTP
      const res = await axios.post(`${API_BASE}/quen-mat-khau`, {
        email: formData.email,
      })
      console.log('Gửi email thành công', res.data)
      // Lưu email vào localStorage để dùng cho xác thực
      localStorage.setItem('dangKyEmail', formData.email)
      
      alert(res.data.message || 'Mã OTP đã được gửi đến email của bạn!')
      onSwitchToAuthenticationPW()
    } catch (err: any) {
      console.error('Lỗi email:', err)
      alert(err.response?.data?.message || 'Xác nhận thất bại. Vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="icon">✈️</div>
        <h2>Quên mật khẩu</h2>
        <p>Email nhận mã xác nhận quên mật khẩu</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        
        
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Đang gửi email...' : 'Gửi'}
        </button>
      </form>
      
      <div className="form-footer">
        <p>Quay lại ? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Đăng nhập</a></p>
      </div>
    </div>
  )
}

export default SendEmailForm
