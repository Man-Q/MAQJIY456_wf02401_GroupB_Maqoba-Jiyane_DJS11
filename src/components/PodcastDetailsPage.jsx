import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './PodcastDetailsPage.css';

const PodcastDetailsPage = ({ addToFavorites }) => {
  const { id } = useParams();
  const [podcastDetails, setPodcastDetails] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [audioSrc, setAudioSrc] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Ref for the audio element

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch podcast details');
        }
        const data = await response.json();
        setPodcastDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (id) {
      fetchPodcastDetails();
    }
  }, [id]);

  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
    setSelectedEpisode(null); // Reset selected episode when a new season is clicked
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    setAudioSrc('https://podcast-api.netlify.app/placeholder-audio.mp3');
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [audioSrc]);

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  if (!id) {
    return <div>No podcast selected</div>;
  }

  if (error) {
    return <div>Error fetching podcast details: {error}</div>;
  }

  if (!podcastDetails) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="podcast-details">
      <h2 className="">{podcastDetails.title}</h2>
      <p className="podcast-description">{podcastDetails.description}</p>
      <div className="seasons-container">
        {podcastDetails.seasons.map(season => (
          <div key={season.id} className="season-card" onClick={() => handleSeasonClick(season)}>
            <img src={season.image} alt={`Season ${season.season}`} />
            <p className="season-number">Season {season.season}</p>
            <p className="season-number">Episodes {season.episodes.length}</p>
          </div>
        ))}
      </div>
      {selectedSeason && (
        <div className="episodes-container">
          <h3>Episodes of Season {selectedSeason.season}</h3>
          {selectedSeason.episodes.map(episode => (
            <div key={episode.id} className="episode-card">
              <p onClick={() => handleEpisodeClick(episode)}>{episode.title}</p>
              <button onClick={() => addToFavorites(episode, podcastDetails.title, selectedSeason.season)}>Add to Favorites</button>
            </div>
          ))}
        </div>
      )}
      {isPlaying && (
        <div className="player-container">
          <h3>Now Playing: {selectedEpisode?.title}</h3>
          <audio controls ref={audioRef} onEnded={handleAudioEnd}>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default PodcastDetailsPage;
