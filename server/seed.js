import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create tables
const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS postCategories (
    id SERIAL PRIMARY KEY,
    postCategory VARCHAR(255)
  );

  CREATE TABLE IF NOT EXISTS guestbook (
    id SERIAL PRIMARY KEY,
    username VARCHAR(16),
    message VARCHAR(255),
    category INT references postCategories (id) ON DELETE CASCADE
  );

  -- Create foreign key constraint
  ALTER TABLE guestbook
  ADD CONSTRAINT fk_category
  FOREIGN KEY (category)
  REFERENCES postCategories(id);
`;

// Seed
db.query(createTablesQuery)
  .then(() => {
    const insertCategoriesQuery = `
      INSERT INTO postCategories (postCategory) VALUES 
      ('Greetings'),
      ('Help'),
      ('General')
    `;

    return db.query(insertCategoriesQuery);
  })
  .then(() => {
    const insertDataQuery = `
      INSERT INTO guestbook (username, message, category) VALUES ($1, $2, $3)
    `;
    const values = ['John', 'Hello world!', 1];

    return db.query(insertDataQuery, values);
  });
