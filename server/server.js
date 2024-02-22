import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Set up root route
app.get('/', (req, res) => {
  res.send('Root route');
});

// Get
app.get('/guestbook', async (req, res) => {
  const result = await db.query(`
  CREATE TABLE IF NOT EXISTS guestbook (
    id SERIAL PRIMARY KEY,
    username VARCHAR(16),
    message VARCHAR(160)
  );`);
  res.json(res);
});

// Post
app.post('/guestbook', async (req, res) => {
  const { username, message } = req.body;
  const result = await db.query(
    `
    INSERT INTO guestbook (username, message)
    VALUES ($1, $2);
    `,
    [username, message]
  );
  res.json({ message: 'posted', res });
});

// Update
app.put('/guestbook', async (req, res) => {
  const { id, username, message } = req.body;
  const result = await db.query(
    `
    UPDATE guestbook
    SET username = $1, message = $2
    WHERE id = $3;
    `,
    [username, message, id]
  );
  res.json({ message: 'updated', res });
});

// Delete
app.delete('/guestbook', async (req, res) => {
  const { id } = req.body;
  const result = await db.query(
    `
    DELETE FROM guestbook
    WHERE id = $1;
    `,
    [id]
  );
  res.json({ message: 'deleted', res });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
