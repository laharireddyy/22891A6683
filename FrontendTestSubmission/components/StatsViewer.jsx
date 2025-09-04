import React, { useState } from 'react';
import './StatsViewer.css';

const StatsViewer = () => {
  const [code, setCode] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setError('');
    setStats(null);
    try {
      const res = await fetch(`http://localhost:3000/shorturls/${code}`, {
        headers: { Authorization: `Bearer YOUR_BEARER_TOKEN` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch stats');
      setStats(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="stats-viewer">
      <div className="input-group">
        <input
          className="stats-input"
          type="text"
          placeholder="Enter shortcode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="stats-button" onClick={fetchStats}>Get Stats</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {stats && (
        <div className="stats-display">
          <p><strong>Original URL:</strong> <a href={stats.originalUrl}>{stats.originalUrl}</a></p>
          <p><strong>Created At:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
          <p><strong>Expiry At:</strong> {new Date(stats.expiryAt).toLocaleString()}</p>
          <p><strong>Click Count:</strong> {stats.clickCount}</p>
          <ul className="click-list">
            {stats.clicks.map((click, index) => (
              <li key={index} className="click-item">
                {new Date(click.timestamp).toLocaleString()} — Referrer: {click.referrer || "N/A"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatsViewer;