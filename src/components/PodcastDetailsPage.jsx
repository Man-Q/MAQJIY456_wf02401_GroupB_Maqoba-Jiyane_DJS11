import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EpisodeCard from './EpisodeCard'; // Assuming you have an EpisodeCard component
import './PodcastDetailsPage.css'; // Import your CSS file

const PodcastDetailsPage = () => {
  const { id } = useParams();
  const [podcastDetails, setPodcastDetails] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

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
      <h2 className="podcast-title">{podcastDetails.title}</h2>
      <p className="podcast-description">{podcastDetails.description}</p>
      <div className="seasons-container">
        {podcastDetails.seasons.map(season => (
          <div key={season.id} className="season-card" onClick={() => handleSeasonClick(season)}>
            <img src={season.image} alt={`Season ${season.season}`} />
            <p className="season-number">Season {season.season}</p>
          </div>
        ))}
      </div>
      {selectedSeason && (
        <div className="episodes-container">
          <h3>Episodes of Season {selectedSeason.season}</h3>
          {selectedSeason.episodes.map(episode => (
            <EpisodeCard key={episode.id} episode={episode} onClick={() => handleEpisodeClick(episode)} />
          ))}
        </div>
      )}
      {selectedEpisode && (
        <div className="player-container">
          <h3>Now Playing: {selectedEpisode.title}</h3>
          <audio controls>
            <source src="https://podcast-api.netlify.app/placeholder-audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default PodcastDetailsPage;
