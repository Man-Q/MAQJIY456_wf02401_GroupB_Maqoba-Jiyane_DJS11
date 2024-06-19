import React, { useEffect, useState } from 'react';
import PodcastItem from './PodcastItem';
import './PodcastList.css';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        return response.json();
      })
      .then(data => {
        // Default sort by name A-Z on app start
        const sortedPodcasts = sortPodcasts(data, sortField, sortDirection);
        setPodcasts(sortedPodcasts);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching podcasts:', error);
        setError('Error fetching podcasts');
        setIsLoading(false);
      });
  }, []);

  const sortPodcasts = (podcastsToSort, field, direction) => {
    return [...podcastsToSort].sort((a, b) => {
      let comparison = 0;
      if (field === 'name') {
        comparison = a.title.localeCompare(b.title);
      } else if (field === 'name-desc') {
        comparison = b.title.localeCompare(a.title);
      } else if (field === 'updated') {
        comparison = Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
      } else if (field === 'updated-desc') {
        comparison = Date.parse(a.updatedAt) - Date.parse(b.updatedAt);
      }
      return direction === 'asc' ? comparison : -comparison;
    });
  };

  const handleSortChange = (e) => {
    const selectedField = e.target.value;
    const direction = selectedField === sortField ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortField(selectedField);
    setSortDirection(direction);
    const sortedPodcasts = sortPodcasts(podcasts, selectedField, direction);
    setPodcasts(sortedPodcasts);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="podcast-list">
      <div className="sort-options">
        <label>Sort by: </label>
        <select value={sortField} onChange={handleSortChange}>
          <option value="name">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="updated">Most Recently Updated</option>
          <option value="updated-desc">Least Recently Updated</option>
        </select>
      </div>
      <div className="podcast-grid">
        {podcasts.map(podcast => (
          <PodcastItem key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
};

export default PodcastList;
