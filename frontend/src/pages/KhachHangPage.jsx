import { useState } from 'react'
import './KhachHangPage.css'

function KhachHangPage() {
  const [userInfo] = useState({
    name: 'Khách hàng',
    email: 'customer@gmail.com'
  })

  return (
    <div className="khachhang-container">
      <header className="khachhang-header">
        <h1>✈️ Hệ thống đặt vé máy bay</h1>
        <div className="user-info">
          <span>Xin chào, {userInfo.name}</span>
          <button onClick={() => window.location.href = '/login'}>Đăng xuất</button>
        </div>
      </header>
      
      <main className="khachhang-content">
        <div className="welcome-section">
          <h2>Chào mừng đến với trang khách hàng</h2>
          <p>Tìm kiếm và đặt vé máy bay của bạn</p>
        </div>
        
        <div className="search-section">
          <h3>Tìm chuyến bay</h3>
          <div className="search-form">
            <input type="text" placeholder="Điểm đi" />
            <input type="text" placeholder="Điểm đến" />
            <input type="date" />
            <button className="btn-search">Tìm kiếm</button>
          </div>
        </div>
        
        <div className="my-tickets">
          <h3>Vé của tôi</h3>
          <p>Chưa có vé nào</p>
        </div>
      </main>
    </div>
  )
}

export default KhachHangPage
