// src/components/PodcastItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { genres } from './genres';
import './PodcastItem.css';

const PodcastItem = ({ podcast }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/id/${podcast.id}`);
  };

  return (
    <div className="podcast-item" onClick={handleItemClick}>
      <img src={podcast.image} alt={podcast.name} className="podcast-image" />
      <h3 className="podcast-title">{podcast.title}</h3>
      <p className="podcast-genre">Seasons: {podcast.seasons}</p>
      <p className="podcast-genre">Genre: {genres[podcast.genres[0]]}</p>
      <p className="podcast-genre">Last Update: {podcast.updated}</p>
    </div>
  );
};

export default PodcastItem;
