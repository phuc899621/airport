import './Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard-content">
      <h2 className="page-title">Tổng quan</h2>
      <p className="page-subtitle">Theo dõi hoạt động và thống kê hệ thống</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">✈️</div>
          <div className="stat-details">
            <p className="stat-label">Tổng chuyến bay</p>
            <h3 className="stat-value">156</h3>
            <span className="stat-unit">chuyến</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">🏢</div>
          <div className="stat-details">
            <p className="stat-label">Tổng sân bay</p>
            <h3 className="stat-value">24</h3>
            <span className="stat-unit">sân bay</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">👥</div>
          <div className="stat-details">
            <p className="stat-label">Hành khách</p>
            <h3 className="stat-value">8,542</h3>
            <span className="stat-unit">người</span>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3 className="section-heading">Biểu đồ hoạt động</h3>
        <div className="chart-placeholder">
          <p>📊 Biểu đồ sẽ được hiển thị ở đây</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
