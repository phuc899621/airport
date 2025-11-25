import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import AuthenticationForm from '../components/AuthenticationForm'
import SendEmailForm from '../components/SendEmailForm'
import AuthenticationPW from '../components/AuthenticationPW'
import NewPasswordForm from '../components/NewPasswordForm'
import './AuthPage.css'

function LoginPage() {
  const [currentView, setCurrentView] = useState('login') // 'login', 'register', 'authentication', 'send-email', 'authentication-pw', 'new-password'

  return (
    <div className="container">
      <div className="form-wrapper">
        {currentView === 'login' && (
          <LoginForm 
            onSwitchToRegister={() => setCurrentView('register')}
            onSwitchToForgotPassword={() => setCurrentView('send-email')}
          />
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
        {currentView === 'send-email' && (
          <SendEmailForm 
            onSwitchToLogin={() => setCurrentView('login')}
            onSwitchToAuthenticationPW={() => setCurrentView('authentication-pw')}
          />
        )}
        {currentView === 'authentication-pw' && (
          <AuthenticationPW 
            onSwitchToLogin={() => setCurrentView('login')}
            onSwitchNewPassword={() => setCurrentView('new-password')}
          />
        )}
        {currentView === 'new-password' && (
          <NewPasswordForm 
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )}
      </div>
    </div>
  )
}

export default LoginPage
