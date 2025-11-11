# Airport Management System

## Cấu trúc dự án

```
airport/
├── backend/          # Node.js + Express API
│   ├── config/       # Database config
│   ├── controllers/  # API controllers
│   └── index.js      # Server entry point
└── frontend/         # React + Vite
    └── src/          # React components
```

## Chạy dự án

### Backend (Node.js)
```bash
cd backend
npm install
npm run dev
```
Server chạy tại: http://localhost:3000

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
App chạy tại: http://localhost:5173

## API Endpoints

- `GET /` - Health check
- `GET /san-bay` - Lấy danh sách sân bay
- `POST /san-bay` - Thêm sân bay mới
