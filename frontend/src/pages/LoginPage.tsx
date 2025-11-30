import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import AuthenticationForm from '../components/AuthenticationForm'
import './AuthPage.css'

type ViewType = 'login' | 'register' | 'authentication';

function LoginPage() {
  const [currentView, setCurrentView] = useState<ViewType>('login')

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
          />
        )}
      </div>
    </div>
  )
}

export default LoginPage
