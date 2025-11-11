import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">✈️</span>
          <span className="logo-text">FlightManager</span>
        </div>
        <div className="search-box">
          <span className="search-icon">✈️</span>
          <input type="text" placeholder="Tìm kiếm..." />
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">💬</button>
        <div className="user-menu">
          <span className="user-avatar">👤</span>
          <span className="user-name">Admin</span>
        </div>
      </div>
    </header>
  )
}

export default Header
