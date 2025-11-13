import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import KhachHangPage from './pages/KhachHangPage'
import NhanVienPage from './pages/NhanVienPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
         <Route path="/khachhang" element={<KhachHangPage />} />
          <Route path="/nhanvien" element={<NhanVienPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
