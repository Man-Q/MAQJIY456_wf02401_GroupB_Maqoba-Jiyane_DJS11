import React, { useState } from 'react';
import './FavoritesModal.css'; // Import your modal CSS here

const FavoritesModal = ({ isOpen, onClose, favorites, removeFavorite, clearFavorites }) => {
  const [sortType, setSortType] = useState('titleAtoZ'); // Default sort type
  if (!isOpen) return null;

  const groupedFavorites = favorites.reduce((acc, episode) => {
    const { showTitle, seasonNumber } = episode;
    if (!acc[showTitle]) acc[showTitle] = {};
    if (!acc[showTitle][seasonNumber]) acc[showTitle][seasonNumber] = [];
    acc[showTitle][seasonNumber].push(episode);
    return acc;
  }, {});

  // Sorting functions
  const sortFavorites = (type) => {
    switch (type) {
      case 'titleAtoZ':
        return favorites.slice().sort((a, b) => a.title.localeCompare(b.title));
      case 'titleZtoA':
        return favorites.slice().sort((a, b) => b.title.localeCompare(a.title));
      case 'recentFirst':
        return favorites.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      case 'oldestFirst':
        return favorites.slice().sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
      default:
        return favorites;
    }
  };

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  // Get sorted favorites based on current sort type
  const sortedFavorites = sortFavorites(sortType);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>Close</button>
        <h2>Favorite Episodes</h2>
        <div className="sort-options">
          <label>Sort by: </label>
          <select value={sortType} onChange={handleSortChange}>
            <option value="titleAtoZ">Title A-Z</option>
            <option value="titleZtoA">Title Z-A</option>
            <option value="recentFirst">Most Recently Updated</option>
            <option value="oldestFirst">Least Recently Updated</option>
          </select>
        </div>
        <ul className="favorites-list">
          {sortedFavorites.map(episode => (
            <li key={episode.id} className="favorite-item">
              <div>
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>
              </div>
              <button onClick={() => removeFavorite(episode.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={clearFavorites}>Clear All</button>
      </div>
    </div>
  );
};

export default FavoritesModal;
