import { useState } from 'react'

function RegisterForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirm) {
      alert('Mật khẩu xác nhận không khớp!')
      return
    }
    
    console.log('Đăng ký:', { name: formData.name, email: formData.email, password: formData.password })
    alert('Đăng ký thành công! (Demo)')
    onSwitchToLogin()
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
          <label htmlFor="name">Họ và tên</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nguyễn Văn A" 
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
        
        <button type="submit" className="btn btn-primary">Đăng ký</button>
      </form>
      
      <div className="form-footer">
        <p>Đã có tài khoản? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Đăng nhập</a></p>
      </div>
    </div>
  )
}

export default RegisterForm
