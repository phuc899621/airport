'use client'

import { useState } from 'react'

interface UserInfo {
  name: string
  email: string
}

export default function KhachHangPage() {
  const [userInfo] = useState<UserInfo>({
    name: 'Khách hàng',
    email: 'customer@gmail.com'
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-customer-start to-customer-end text-white px-10 py-5 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">✈️ Hệ thống đặt vé máy bay</h1>
        <div className="flex items-center gap-4">
          <span>Xin chào, {userInfo.name}</span>
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-white text-customer-start px-5 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Đăng xuất
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-5 py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Chào mừng đến với trang khách hàng</h2>
          <p className="text-gray-600">Tìm kiếm và đặt vé máy bay của bạn</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
          <h3 className="text-xl font-bold mb-5">Tìm chuyến bay</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Điểm đi" 
              className="px-4 py-3 border-2 border-gray-300 rounded-md text-sm focus:outline-none focus:border-customer-start"
            />
            <input 
              type="text" 
              placeholder="Điểm đến" 
              className="px-4 py-3 border-2 border-gray-300 rounded-md text-sm focus:outline-none focus:border-customer-start"
            />
            <input 
              type="date" 
              className="px-4 py-3 border-2 border-gray-300 rounded-md text-sm focus:outline-none focus:border-customer-start"
            />
            <button className="bg-gradient-to-r from-customer-start to-customer-end text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition">
              Tìm kiếm
            </button>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-5">Vé của tôi</h3>
          <p className="text-gray-600">Chưa có vé nào</p>
        </div>
      </main>
    </div>
  )
}
