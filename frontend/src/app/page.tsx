import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          ✈️ Hệ thống sân bay
        </h1>
        <div className="space-y-4">
          <Link 
            href="/nhanvien"
            className="block w-full bg-gradient-to-r from-employee-start to-employee-end text-white py-3 px-6 rounded-lg text-center font-semibold hover:opacity-90 transition"
          >
            Trang nhân viên
          </Link>
          <Link 
            href="/khachhang"
            className="block w-full bg-gradient-to-r from-customer-start to-customer-end text-white py-3 px-6 rounded-lg text-center font-semibold hover:opacity-90 transition"
          >
            Trang khách hàng
          </Link>
        </div>
      </div>
    </div>
  )
}
