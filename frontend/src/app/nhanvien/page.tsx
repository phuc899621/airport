'use client'

import { useState } from 'react'

interface UserInfo {
  name: string
  email: string
}

export default function NhanVienPage() {
  const [userInfo] = useState<UserInfo>({
    name: 'Nhân viên',
    email: 'employee@gmail.com'
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-employee-start to-employee-end text-white px-10 py-5 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">✈️ Quản lý nhân viên</h1>
        <div className="flex items-center gap-4">
          <span>Xin chào, {userInfo.name}</span>
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-white text-employee-start px-5 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Đăng xuất
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-5 py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Trang quản lý nhân viên</h2>
          <p className="text-gray-600">Quản lý thông tin chuyến bay và khách hàng</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="text-gray-600 text-base mb-2">Chuyến bay hôm nay</h3>
            <p className="text-5xl font-bold text-employee-start">12</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="text-gray-600 text-base mb-2">Vé đã bán</h3>
            <p className="text-5xl font-bold text-employee-start">245</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="text-gray-600 text-base mb-2">Khách hàng</h3>
            <p className="text-5xl font-bold text-employee-start">189</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-5">Thao tác nhanh</h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-gradient-to-r from-employee-start to-employee-end text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition">
              Quản lý chuyến bay
            </button>
            <button className="bg-gradient-to-r from-employee-start to-employee-end text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition">
              Quản lý vé
            </button>
            <button className="bg-gradient-to-r from-employee-start to-employee-end text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition">
              Xem báo cáo
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
