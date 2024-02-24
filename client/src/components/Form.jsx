import React, { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    username: '',
    message: '',
    category: '1',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Entry added successfully');
        setFormData({ username: '', message: '', category: '1' });
      } else {
        console.error('Failed to add entry:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding entry:', error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="1">Greetings</option>
          <option value="2">Help</option>
          <option value="3">General</option>
        </select>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
