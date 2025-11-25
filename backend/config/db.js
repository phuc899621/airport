import postgres from 'postgres'
const connectionString = process.env.DB_URL
const db = postgres(connectionString)
export default db