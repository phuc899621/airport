import { useState, FormEvent, ChangeEvent } from 'react'
import axios from 'axios'

interface NewPasswordFormProps {
  onSwitchToLogin: () => void
}

interface FormData {
  password: string
  confirm: string
}

function NewPasswordForm({ onSwitchToLogin }: NewPasswordFormProps) {
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirm: ''
  })
  const [loading, setLoading] = useState(false)

  const API_BASE = 'http://localhost:3000/auth'

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirm) {
      alert('Mật khẩu xác nhận không khớp!')
      return
    }

    setLoading(true)
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('resetPasswordToken')
      if (!token) {
        alert('Phiên làm việc hết hạn. Vui lòng thử lại!')
        onSwitchToLogin()
        return
      }

      // Gọi API tạo mật khẩu mới
      const res = await axios.post(`${API_BASE}/quen-mat-khau/tao-moi`, {
        matKhau: formData.password,
        token: token
      })
      console.log('Tạo mật khẩu mới thành công:', res.data)
      
      // Xóa token và email sau khi thành công
      localStorage.removeItem('resetPasswordToken')
      localStorage.removeItem('dangKyEmail')
      
      alert(res.data.message || 'Tạo mật khẩu mới thành công!')
      onSwitchToLogin()
    } catch (err: any) {
      console.error('Lỗi tạo mật khẩu:', err)
      alert(err.response?.data?.message || 'Tạo mật khẩu mới thất bại. Vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="icon">✈️</div>
        <h2>Mật khẩu mới</h2>
        <p>Tạo mật khẩu mới</p>
      </div>
      
      <form onSubmit={handleSubmit}>

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
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Đang xác nhận...' : 'Xác nhận'}
        </button>
      </form>
      
      <div className="form-footer">
        <p>Quay lại <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Đăng nhập</a></p>
      </div>
    </div>
  )
}

export default NewPasswordForm
