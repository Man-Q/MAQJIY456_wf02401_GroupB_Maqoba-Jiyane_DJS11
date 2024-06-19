

// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img className="logo" src={'/android-chrome-512x512.png'} alt="MyLogo" />
        </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
    </header>
  );
}

export default Header;
