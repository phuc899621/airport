# Hướng dẫn sử dụng Airport Page

## Tính năng đã thêm

### 1. Backend
- Thêm route công khai `/san-bay/public` để lấy danh sách sân bay mà không cần authentication
- Controller `laySanBayPublic` trong `backend/modules/san_bay/san_bay.controller.js`

### 2. Frontend
- **AirportPage** mới tại `/airports`
- **AirportList Component** với UI đẹp hiển thị:
  - STT (số thứ tự)
  - Mã Sân Bay
  - Tên Sân Bay
  - Quốc Gia

### 3. UI Features
- Gradient background đẹp mắt (tím - xanh)
- Table responsive với hover effects
- Loading spinner khi đang tải dữ liệu
- Error handling với thông báo lỗi
- Animation fade-in khi hiển thị
- Badge đẹp cho mã sân bay và quốc gia
- Hiển thị tổng số sân bay

## Cách sử dụng

### Truy cập trang
Mở trình duyệt và truy cập: `http://localhost:5173/airports`

### API Endpoint
- **Public**: `GET http://localhost:3000/san-bay/public`
- **Admin**: `GET http://localhost:3000/san-bay` (cần authentication)

## Cấu trúc file

```
frontend/
├── src/
│   ├── pages/
│   │   └── AirportPage.tsx          # Page chính
│   ├── components/
│   │   ├── AirportList/
│   │   │   ├── AirportList.tsx      # Component hiển thị danh sách
│   │   │   └── AirportList.module.css  # Styling
│   │   └── AirportsPage.tsx         # Component cũ (đã cập nhật)
│   └── App.tsx                      # Thêm route /airports

backend/
└── modules/
    └── san_bay/
        ├── san_bay.controller.js    # Thêm laySanBayPublic
        └── san_bay.route.js         # Thêm route /public
```

## Responsive Design
- Desktop: Hiển thị đầy đủ với table rộng
- Mobile: Tự động điều chỉnh kích thước font và padding

## Màu sắc
- Primary gradient: #667eea → #764ba2
- Background: White
- Hover: Light gray gradient
- Accent: Yellow (#fbbf24)
