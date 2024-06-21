import React, { useState } from 'react';
import './FavoritesModal.css';

const FavoritesModal = ({ isOpen, onClose, favorites, removeFavorite, clearFavorites }) => {
  const [sortType, setSortType] = useState('titleAtoZ');

  if (!isOpen) return null;
  // Group episodes by show and season
  const groupedFavorites = favorites.reduce((acc, episode) => {
    const { showTitle, seasonNumber } = episode;
    if (!acc[showTitle]) acc[showTitle] = {};
    if (!acc[showTitle][seasonNumber]) acc[showTitle][seasonNumber] = [];
    acc[showTitle][seasonNumber].push(episode);
    return acc;
  }, {});

  // Sorting functions
  const sortEpisodes = (episodes, type) => {
    switch (type) {
      case 'titleAtoZ':
        return episodes.sort((a, b) => a.title.localeCompare(b.title));
      case 'titleZtoA':
        return episodes.sort((a, b) => b.title.localeCompare(a.title));
      case 'recentFirst':
        return episodes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      case 'oldestFirst':
        return episodes.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
      default:
        return episodes;
    }
  };

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  // Get current date and time
  const currentDateTime = new Date();
  const formattedDateTime = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;

  // Render grouped and sorted episodes
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
        <div className="favorites-list-container">
          {Object.entries(groupedFavorites).map(([showTitle, seasons]) => (
            <div key={showTitle} className="show-group">
              <h3>{showTitle}</h3>
              {Object.entries(seasons).map(([seasonNumber, episodes]) => (
                <div key={seasonNumber} className="season-group">
                  <h4>Season {seasonNumber}</h4>
                  <ul className="favorites-list">
                    {sortEpisodes(episodes, sortType).map(episode => (
                      <li key={episode.id} className="favorite-item">
                        <div>
                          <h5>{episode.title}</h5>
                          <p>{formattedDateTime}</p>
                        </div>
                        <button onClick={() => removeFavorite(episode.episode) }>Remove</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className = "clear-all" onClick={clearFavorites}>Clear All</button>
      </div>
    </div>
  );
};

export default FavoritesModal;