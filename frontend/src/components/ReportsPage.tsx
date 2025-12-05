import './PageContent.css'

function ReportsPage() {
  return (
    <div className="page-content">
      <h2 className="page-title">Báo cáo & Thống kê</h2>
      <p className="page-subtitle">Phân tích dữ liệu và báo cáo</p>
       <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green">🎫</div>
          <div className="stat-details">
            <p className="stat-label">Số vé đã bán hôm nay</p>
            <h3 className="stat-value">24</h3>
            <span className="stat-unit">vé</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">🎫</div>
          <div className="stat-details">
            <p className="stat-label">Vé tồn hôm nay</p>
            <h3 className="stat-value">156</h3>
            <span className="stat-unit">vé</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"> 💰 </div>
          <div className="stat-details">
            <p className="stat-label">Tổng thu hôm nay</p>
            <h3 className="stat-value">8</h3>
            <span className="stat-unit">tỷ VND</span>
          </div>
        </div>

      </div>

      <div className="content-placeholder" style={{ height: "450px" }}>
        <p>📊 Nội dung báo cáo và thống kê</p>
      </div>
    </div>
  )
}

export default ReportsPage
