import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connect } from './connect.js';

dotenv.config();

const app = express();
const db = connect();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.send('Root Route Guestbook');
});

// Get
app.get('/guestbook', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM guestbook');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Post
app.post('/guestbook', async (req, res) => {
  const { username, message, category } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO guestbook (username, message, category) VALUES ($1, $2, $3)',
      [username, message, category]
    );
    console.log('New entry added to guestbook');
    res.json({ message: 'Entry added successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete
app.delete('/guestbook/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('DELETE FROM guestbook WHERE id = $1', [id]);
    console.log('Entry deleted successfully');
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
