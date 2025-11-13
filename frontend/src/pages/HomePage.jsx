import { useState } from 'react'
import './HomePage.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'
import FlightsPage from '../components/FlightsPage'
import AirportsPage from '../components/AirportsPage'
import TicketsPage from '../components/TicketsPage'
import PassengersPage from '../components/PassengersPage'
import EmployeesPage from '../components/EmployeesPage'
import ReportsPage from '../components/ReportsPage'
import SettingsPage from '../components/SettingsPage'

function HomePage() {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />
      case 'flights':
        return <FlightsPage />
      case 'airports':
        return <AirportsPage />
      case 'tickets':
        return <TicketsPage />
      case 'passengers':
        return <PassengersPage />
      case 'employees':
        return <EmployeesPage />
      case 'reports':
        return <ReportsPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="home-container">
      <Header />
      <div className="main-layout">
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  )
}

export default HomePage
