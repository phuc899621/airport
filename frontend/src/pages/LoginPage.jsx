import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import './AuthPage.css'

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="container">
      <div className="form-wrapper">
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  )
}

export default LoginPage
