import postgres from 'postgres'
import 'dotenv/config'
const connectionString = process.env.DB_URL
const db = postgres(connectionString)
export default db