// src/components/PodcastList.js
import React, { useEffect, useState } from 'react';
import PodcastItem from './PodcastItem';
import './PodcastList.css';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
      .then(response => response.json())
      .then(data => {
        setPodcasts(data);
        setIsLoading(false); // Data fetched, set loading to false
      })
      .catch(error => {
        console.error('Error fetching podcasts:', error);
        setError('Error fetching podcasts');
        setIsLoading(false); // Error occurred, set loading to false
      });
  }, []);

  const sortPodcasts = (field) => {
    const sortedPodcasts = [...podcasts].sort((a, b) => {
      if (field === 'name') {
        return a.title.localeCompare(b.title); // Sort by title (name)
      }
      if (field === 'id') {
        return a.id - b.id; // Sort by ID (assuming IDs are numeric)
      }
      return 0;
    });
    setPodcasts(sortedPodcasts);
    setSortField(field);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <div className="podcast-list">
      <div className="sort-options">
        <button onClick={() => sortPodcasts('name')} className={sortField === 'name' ? 'active' : ''}>
          Sort by Name
        </button>
        <button onClick={() => sortPodcasts('id')} className={sortField === 'id' ? 'active' : ''}>
          Sort by ID
        </button>
      </div>
      <div className="podcast-grid">
        {podcasts.map(podcast => (
          <PodcastItem key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}

export default PodcastList;
