import React from 'react';
import '../css/Header.css';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="header-div">
      <img src={logo} alt="logo" />
      <h1 className="header">GUESTBOOK</h1>
    </header>
  );
}
