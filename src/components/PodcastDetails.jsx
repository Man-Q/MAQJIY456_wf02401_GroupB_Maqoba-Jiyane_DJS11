import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PodcastDetails = () => {
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{podcastDetails.title}</h2>
      <p>{podcastDetails.description}</p>
      <div>
        {podcastDetails.seasons.map(season => (
          <div key={season.id}>
            <img src={season.image} alt={`Season ${season.number}`} />
            <p>Season {season.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastDetails;
