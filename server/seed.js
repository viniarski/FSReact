import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create a table
db.query(
  `CREATE TABLE IF NOT EXISTS guestbook (
        id SERIAL PRIMARY KEY,
        username VARCHAR(40),
        message VARCHAR(255)
    )`
);

// Insert
db.query(`INSERT INTO gallery (title, url, description) VALUES ($1, $2, $3)`, [
  'John Smith',
  'Test text',
]);
