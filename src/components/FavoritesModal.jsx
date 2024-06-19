import React from 'react';
import './FavoritesModal.css';

const FavoritesModal = ({ isOpen, onClose, favorites, removeFavorite, clearFavorites }) => {
  if (!isOpen) return null;

  const groupedFavorites = favorites.reduce((acc, episode) => {
    const { showTitle, seasonNumber } = episode;
    if (!acc[showTitle]) acc[showTitle] = {};
    if (!acc[showTitle][seasonNumber]) acc[showTitle][seasonNumber] = [];
    acc[showTitle][seasonNumber].push(episode);
    return acc;
  }, {});

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>Close</button>
        <button className="clear-button" onClick={clearFavorites}>Clear All</button>
        <h2>Favorites</h2>
        {Object.keys(groupedFavorites).map(showTitle => (
          <div key={showTitle} className="show-group">
            <h3>{showTitle}</h3>
            {Object.keys(groupedFavorites[showTitle]).map(seasonNumber => (
              <div key={seasonNumber} className="season-group">
                <h4>Season {seasonNumber}</h4>
                {groupedFavorites[showTitle][seasonNumber].map(episode => (
                  <div key={episode.id} className="episode-item">
                    <p>{episode.title}</p>
                    <audio controls src={episode.file}></audio>
                    <button className="remove-button" onClick={() => removeFavorite(episode.id)}>Remove</button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesModal;
