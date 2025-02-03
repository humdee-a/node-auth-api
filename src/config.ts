import { Pool } from 'pg';

import dotenv from "dotenv";

dotenv.config();

export const config = {
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  refreshSecret: process.env.REFRESH_SECRET || "your_refresh_secret",
};

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  ssl: false
});