import React, { useState } from 'react';
import './UrlForm.css';

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const body = { url };
    if (validity) body.validity = parseInt(validity);
    if (shortcode) body.shortcode = shortcode;

    try {
      const response = await fetch('http://localhost:3000/shorturls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_BEARER_TOKEN`
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to shorten URL');
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="url-form-container">
      <form className="url-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="url-input"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <input
            className="url-input small"
            type="number"
            placeholder="Validity (mins)"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            min="1"
          />
          <input
            className="url-input small"
            type="text"
            placeholder="Custom code (opt.)"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
          />
        </div>
        <button className="url-button" type="submit">🚀 Shorten</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="result-card">
          <p><strong>Short URL:</strong> <a href={result.shortLink} target="_blank" rel="noreferrer">{result.shortLink}</a></p>
          <p><strong>Expires:</strong> {new Date(result.expiry).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default UrlForm;