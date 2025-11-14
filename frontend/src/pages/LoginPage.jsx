import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import AuthenticationForm from '../components/AuthenticationForm'
import './AuthPage.css'

function LoginPage() {
  const [currentView, setCurrentView] = useState('login') // 'login', 'register', 'authentication'

  return (
    <div className="container">
      <div className="form-wrapper">
        {currentView === 'login' && (
          <LoginForm onSwitchToRegister={() => setCurrentView('register')} />
        )}
        {currentView === 'register' && (
          <RegisterForm 
            onSwitchToLogin={() => setCurrentView('login')}
            onSwitchToAuthentication={() => setCurrentView('authentication')}
          />
        )}
        {currentView === 'authentication' && (
          <AuthenticationForm 
            onSwitchToLogin={() => setCurrentView('login')}
            onSwitchToAuthentication={() => setCurrentView('authentication')}
          />
        )}
      </div>
    </div>
  )
}

export default LoginPage
