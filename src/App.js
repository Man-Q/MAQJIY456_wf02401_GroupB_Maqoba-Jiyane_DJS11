// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PodcastList from './components/PodcastList';
import PodcastDetailsPage from './components/PodcastDetailsPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<PodcastList />} />
        <Route path="/id/:id" element={<PodcastDetailsPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
