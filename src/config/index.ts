import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  bycript_sold_round: process.env.BCRYPT_SALT_ROUND,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH: process.env.JWT_REFRESH,
  JWT_SECRET_EXPIRE: process.env.JWT_SECRET_EXPIRE,
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE,
}
