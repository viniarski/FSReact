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

// Get
app.get('/guestbook', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM guestbook');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Post
app.post('/guestbook', async (req, res) => {
  const { username, message } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO guestbook (username, message) VALUES ($1, $2)',
      [username, message]
    );
    res.json({ message: 'Entry added successfully' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update
app.put('/guestbook/:id', async (req, res) => {
  const id = req.params.id;
  const { username, message } = req.body;
  try {
    const result = await db.query(
      'UPDATE guestbook SET username = $1, message = $2 WHERE id = $3',
      [username, message, id]
    );
    res.json({ message: 'Entry updated successfully' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete
app.delete('/guestbook/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('DELETE FROM guestbook WHERE id = $1', [id]);
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
