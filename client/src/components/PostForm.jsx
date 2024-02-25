import React, { useState } from 'react';
import '../css/PostForm.css';

export default function PostForm() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, message, category }),
      });
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className="input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="1">Greetings</option>
          <option value="2">Help</option>
          <option value="3">General</option>
        </select>
        <button className="submit" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
