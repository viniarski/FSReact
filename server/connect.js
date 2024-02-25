import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const connect = () => {
  const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  return db;
};
