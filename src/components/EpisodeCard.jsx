

import React from 'react';

const EpisodeCard = ({ episode, onClick }) => {
  return (
    <div className="episode-card" onClick={onClick}>
      <h4>{episode.title}</h4>
      <p>{episode.description}</p>
      <p>Episode: {episode.episode}</p>
    </div>
  );
};

export default EpisodeCard;
