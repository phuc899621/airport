import sql from 'mssql'

const sqlConfig = {
  user: 'admin',
  password: '899621',
  database: "QuanLyVeMayBay",
  server: 'localhost',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}

export async function connectDB() {
  try {
    sql.connect(sqlConfig)
    console.log('Connected to SQL Server')
  } catch (err) {
    console.error('Database connection failed:', err)
  }
}

export default sql
