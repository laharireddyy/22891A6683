import React from 'react';
import StatsViewer from '../components/StatsViewer';
import './Stats.css';

const Stats = () => {
  return (
    <div className="stats-container">
      <h1 className="stats-title">🔍 Short URL Stats</h1>
      <div className="card">
        <StatsViewer />
      </div>
      <div className="blob blob--one"></div>
      <div className="blob blob--two"></div>
    </div>
  );
};

export default Stats;