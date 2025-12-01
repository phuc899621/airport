import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

interface FormData {
  email: string;
  password: string;
}

function LoginForm({ onSwitchToRegister, onSwitchToForgotPassword }: LoginFormProps) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Đăng nhập:', formData)
    alert('Đăng nhập thành công!')
    
    const email = formData.email.trim()
    const password = formData.password

    if (email === "admin@gmail.com" && password === "123") {
      navigate('/home')
    } else if (email === "employee@gmail.com" && password === "123") {
      navigate('/nhanvien')
    } else {
      navigate('/khachhang')
    }
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="icon">✈️</div>
        <h2>Đăng nhập</h2>
        <p>Chào mừng trở lại!</p>
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
        
        <div className="form-options">
          <label className="checkbox">
            <input type="checkbox" />
            <span>Ghi nhớ đăng nhập</span>
          </label>
          <a href="#" className="forgot-password" onClick={(e) => { e.preventDefault(); onSwitchToForgotPassword(); }}>Quên mật khẩu?</a>
        </div>
        
        <button type="submit" className="btn btn-primary">Đăng nhập</button>
      </form>
      
      <div className="form-footer">
        <p>Chưa có tài khoản? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>Đăng ký ngay</a></p>
      </div>
    </div>
  )
}

export default LoginForm
