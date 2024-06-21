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
  const [isEpisodePlaying, setIsEpisodePlaying] = useState(false); // Track if an episode is playing
  const audioRef = useRef(null);

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
    setSelectedEpisode(null);
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    setAudioSrc(episode.file);
    setIsPlaying(true);
    setIsEpisodePlaying(true); // Mark episode as playing
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
    setIsEpisodePlaying(false); // Mark episode as not playing when audio ends
  };

  // Prevent closing the page while an episode is playing
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isEpisodePlaying) {
        event.preventDefault();
        event.returnValue = ''; // Standard for most browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEpisodePlaying]);

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
      <h2>{podcastDetails.title}</h2>
      {isPlaying && (
        <div className="player-container">
          <h3>Now Playing: {selectedEpisode?.title}</h3>
          <audio controls ref={audioRef} onEnded={handleAudioEnd}>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
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
    </div>
  );
};

export default PodcastDetailsPage;
