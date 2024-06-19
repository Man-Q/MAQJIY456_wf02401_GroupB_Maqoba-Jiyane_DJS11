// PodcastDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PodcastDetailsPage.css'; // Import your CSS file

const PodcastDetailsPage = () => {
  const { id } = useParams();
  const [podcastDetails, setPodcastDetails] = useState(null);
  const [error, setError] = useState(null);

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
          <div key={season.id} className="season-card">
            <img src={season.image} alt={`Season ${season.number}`} />
            <p className="season-number">Season {season.season}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastDetailsPage;
