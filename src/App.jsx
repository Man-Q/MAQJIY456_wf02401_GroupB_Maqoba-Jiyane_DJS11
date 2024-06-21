import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PodcastList from "./components/PodcastList";
import PodcastDetailsPage from "./components/PodcastDetailsPage";
import FavoritesModal from "./components/FavoritesModal";
import "./App.css";

const App = () => {
  // const [episodes, setEpisodes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);

  // Load episodes and favorites from localStorage on app start
  useEffect(() => {
    // const storedEpisodes = JSON.parse(localStorage.getItem("episodes")) || [];
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // setEpisodes(storedEpisodes);
    setFavorites(storedFavorites);
  }, []);

  // Function to mark an episode as listened
  // const markEpisodeAsListened = (episodeId) => {
  //   const updatedEpisodes = episodes.map(episode =>
  //     episode.id === episodeId ? { ...episode, listened: true } : episode
  //   );
  //   setEpisodes(updatedEpisodes);
  //   localStorage.setItem('episodes', JSON.stringify(updatedEpisodes));
  // };
  
  const addToFavorites = (episode, showTitle, seasonNumber, time) => {
    console.log('Adding to favorites:', episode, showTitle, seasonNumber, time);
    const updatedEpisode = { ...episode, showTitle, seasonNumber, time };
    const updatedFavorites = [...favorites, updatedEpisode];
    setFavorites(updatedFavorites);
    console.log(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  

  // Function to remove an episode from favorites
  const removeFavorite = (episodeId) => {
    console.log(favorites);
    const updatedFavorites = favorites.filter(
      (episode) => episode.episode !== episodeId
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Function to reset listening history
  // const resetListeningHistory = () => {
  //   const resetEpisodes = episodes.map((episode) => ({
  //     ...episode,
  //     listened: false,
  //   }));
  //   setEpisodes(resetEpisodes);
  //   localStorage.removeItem("episodes");
  // };

  // Function to clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const toggleFavoritesModal = () => {
    setIsFavoritesModalOpen(!isFavoritesModalOpen);
  };

  return (
    <Router>
      <Header onFavoritesClick={toggleFavoritesModal} />
      <Routes>
        <Route
          path="/"
          element={<PodcastList addToFavorites={addToFavorites} />}
        />
        <Route
          path="/id/:id"
          element={<PodcastDetailsPage addToFavorites={addToFavorites} />}
        />
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