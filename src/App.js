import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PodcastList from './components/PodcastList';
import PodcastDetailsPage from './components/PodcastDetailsPage';
import FavoritesModal from './components/FavoritesModal';
import './App.css';

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);

  const addToFavorites = (episode, showTitle, seasonNumber) => {
    setFavorites([...favorites, { ...episode, showTitle, seasonNumber }]);
  };

  const removeFavorite = (episodeId) => {
    setFavorites(favorites.filter(episode => episode.id !== episodeId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const toggleFavoritesModal = () => {
    setIsFavoritesModalOpen(!isFavoritesModalOpen);
  };

  return (
    <Router>
      <Header onFavoritesClick={toggleFavoritesModal} />
      <Routes>
        <Route path="/" element={<PodcastList addToFavorites={addToFavorites} />} />
        <Route path="/id/:id" element={<PodcastDetailsPage addToFavorites={addToFavorites} />} />
      </Routes>
      <Footer />
      <FavoritesModal 
        isOpen={isFavoritesModalOpen} 
        onClose={toggleFavoritesModal} 
        favorites={favorites}
        removeFavorite={removeFavorite}
        clearFavorites={clearFavorites} 
      />
    </Router>
  );
};

export default App;
