// src/pages/Home.jsx
import React from 'react';
import UrlForm from '../components/UrlForm';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">URL Shortener</h1>
      <div className="card">
        <UrlForm />
      </div>
      <div className="blob blob--one"></div>
      <div className="blob blob--two"></div>
    </div>
  );
};

export default Home;