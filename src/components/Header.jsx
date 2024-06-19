import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onFavoritesClick }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>
        <img className="logo" src={'/android-chrome-512x512.png'} alt="MyLogo" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <button className="favorites-button" onClick={onFavoritesClick}>Favorites</button>
    </header>
  );
};

export default Header;
