import {Pool} from 'pg';

const pool = new Pool({
  user: 'postgres.rlvirvgyrigpudkspxrp',
  password: '899621',
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
})

export default pool