// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PodcastList from './components/PodcastList';
import PodcastDetailsPage from './components/PodcastDetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PodcastList />} />
        <Route path="/id/:id" element={<PodcastDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
