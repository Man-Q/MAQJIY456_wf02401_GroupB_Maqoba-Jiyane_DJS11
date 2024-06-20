// src/components/PodcastList.js
import React, { useEffect, useState } from 'react';
import PodcastItem from './PodcastItem';
import { genres } from './genres'; // Import genres
import './PodcastList.css';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
      .then(response => response.json())
      .then(data => {
        const sortedPodcasts = sortPodcasts(data, sortField, sortDirection);
        setPodcasts(sortedPodcasts);
        setFilteredPodcasts(sortedPodcasts);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching podcasts:', error);
        setError('Error fetching podcasts');
        setIsLoading(false);
      });
  }, []);

  const handleGenreChange = (e) => {
    const selected = e.target.value;
    setSelectedGenre(selected);
    if (selected) {
    console.log(selected)
      setFilteredPodcasts(podcasts.filter(podcast => podcast.genres[0] === parseInt(selected)));
    } else {
      setFilteredPodcasts(podcasts);
    }
  };

  const sortPodcasts = (podcastsToSort, field, direction) => {
    return [...podcastsToSort].sort((a, b) => {
      let comparison = 0;
      if (field === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (field === 'title_desc') {
        comparison = b.title.localeCompare(a.title);
      } else if (field === 'updated') {
        comparison = Date.parse(b.updated) - Date.parse(a.updated);
      } else if (field === 'updated_desc') {
        comparison = Date.parse(a.updated) - Date.parse(b.updated);
      }
      return direction === 'asc' ? comparison : -comparison;
    });
  };

  const handleSortChange = (e) => {
    const selectedField = e.target.value;
    const direction = selectedField === sortField ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortField(selectedField);
    setSortDirection(direction);
    const sortedPodcasts = sortPodcasts(filteredPodcasts, selectedField, direction);
    setFilteredPodcasts(sortedPodcasts);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="podcast-list">
      <div className="filters">
        <select onChange={handleSortChange} value={sortField}>
          <option value="title">Sort by Name (A-Z)</option>
          <option value="title_desc">Sort by Name (Z-A)</option>
          <option value="updated">Sort by Recently Updated</option>
          <option value="updated_desc">Sort by Least Recently Updated</option>
        </select>
        <select onChange={handleGenreChange} value={selectedGenre}>
          <option value="">All Genres</option>
          {Object.entries(genres).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
      </div>
      <div className="podcast-grid">
        {filteredPodcasts.map(podcast => (
          <PodcastItem key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
};

export default PodcastList;
