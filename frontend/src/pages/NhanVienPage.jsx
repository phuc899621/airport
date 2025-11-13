import { useState } from 'react'
import './NhanVienPage.css'

function NhanVienPage() {
  const [userInfo] = useState({
    name: 'Nhân viên',
    email: 'employee@gmail.com'
  })

  return (
    <div className="nhanvien-container">
      <header className="nhanvien-header">
        <h1>✈️ Quản lý nhân viên</h1>
        <div className="user-info">
          <span>Xin chào, {userInfo.name}</span>
          <button onClick={() => window.location.href = '/login'}>Đăng xuất</button>
        </div>
      </header>
      
      <main className="nhanvien-content">
        <div className="welcome-section">
          <h2>Trang quản lý nhân viên</h2>
          <p>Quản lý thông tin chuyến bay và khách hàng</p>
        </div>
        
        <div className="stats-section">
          <div className="stat-card">
            <h3>Chuyến bay hôm nay</h3>
            <p className="stat-number">12</p>
          </div>
          <div className="stat-card">
            <h3>Vé đã bán</h3>
            <p className="stat-number">245</p>
          </div>
          <div className="stat-card">
            <h3>Khách hàng</h3>
            <p className="stat-number">189</p>
          </div>
        </div>
        
        <div className="actions-section">
          <h3>Thao tác nhanh</h3>
          <button className="action-btn">Quản lý chuyến bay</button>
          <button className="action-btn">Quản lý vé</button>
          <button className="action-btn">Xem báo cáo</button>
        </div>
      </main>
    </div>
  )
}

export default NhanVienPage
