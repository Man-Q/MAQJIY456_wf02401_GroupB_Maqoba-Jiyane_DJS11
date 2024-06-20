import React, { useEffect, useState } from 'react';
import PodcastItem from './PodcastItem';
import './PodcastList.css';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
      .then(response => response.json())
      .then(data => {
        setPodcasts(data);
        setFilteredPodcasts(data);
        setIsLoading(false);
        // Extract genres from the podcasts data
        const extractedGenres = [...new Set(data.map(podcast => podcast.genres[0]))];
        setGenres(extractedGenres);
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
      setFilteredPodcasts(podcasts.filter(podcast => podcast.genres[0] === Number(selected)));
    } else {
      setFilteredPodcasts(podcasts);
    }
  };



  const sortPodcasts = (podcastsToSort, field, direction) => {
    return [...podcastsToSort].sort((a, b) => {
      let comparison = 0;
      if (field === 'name') {
        comparison = a.title.localeCompare(b.title);
      } else if (field === 'name-desc') {
        comparison = b.title.localeCompare(a.title);
      } else if (field === 'updated') {
        comparison = Date.parse(b.updated) - Date.parse(a.updated);
      } else if (field === 'updated-desc') {
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
        <select onChange={handleGenreChange} value={selectedGenre}>
          <option value="">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
        <select onChange={handleSortChange} value={sortField}>
          <option value="name">Sort by Name (A-Z)</option>
          <option value="name_desc">Sort by Name (Z-A)</option>
          <option value="updated_at">Sort by Recently Updated</option>
          <option value="updated_at_desc">Sort by Least Recently Updated</option>
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
