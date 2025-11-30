import { useNavigate } from 'react-router-dom'
import './Sidebar.css'

type MenuType = 'dashboard' | 'flights' | 'airports' | 'tickets' | 'passengers' | 'employees' | 'reports' | 'settings';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: MenuType) => void;
}

function Sidebar({ activeMenu, setActiveMenu }: SidebarProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveMenu('dashboard' as MenuType)}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Tổng quan</span>
        </button>
        <button
          className={`nav-item ${activeMenu === 'flights' ? 'active' : ''}`}
          onClick={() => setActiveMenu('flights' as MenuType)}
        >
          <span className="nav-icon">✈️</span>
          <span className="nav-text">Chuyến bay</span>
        </button>
        <button
          className={`nav-item ${activeMenu === 'airports' ? 'active' : ''}`}
          onClick={() => setActiveMenu('airports' as MenuType)}
        >
          <span className="nav-icon">🏢</span>
          <span className="nav-text">Sân bay</span>
        </button>
        <button
          className={`nav-item ${activeMenu === 'tickets' ? 'active' : ''}`}
          onClick={() => setActiveMenu('tickets' as MenuType)}
        >
          <span className="nav-icon">🎫</span>
          <span className="nav-text">Vé máy bay</span>
        </button>
        <button
          className={`nav-item ${activeMenu === 'passengers' ? 'active' : ''}`}
          onClick={() => setActiveMenu('passengers' as MenuType)}
        >
          <span className="nav-icon">👥</span>
          <span className="nav-text">Hành khách</span>
        </button>
        
       <button
          className={`nav-item ${activeMenu === 'employees' ? 'active' : ''}`}
          onClick={() => setActiveMenu('employees' as MenuType)}
        >
          <span className="nav-icon">👤</span>
          <span className="nav-text">Nhân viên</span>
        </button>

        <button
          className={`nav-item ${activeMenu === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveMenu('reports' as MenuType)}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-text">Báo cáo</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <button
          className={`nav-item ${activeMenu === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveMenu('settings' as MenuType)}
        >
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Cài đặt</span>
        </button>
        <button className="nav-item logout" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          <span className="nav-text">Đăng xuất</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
