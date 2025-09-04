# Test Submission Repository

This repository contains a full-stack URL shortener application consisting of a backend API and a frontend React application.

## Project Structure

- **BackendTestSubmission/**: Node.js Express backend server
- **FrontendTestSubmission/**: React frontend application built with Vite
- **LoggingMiddleware/**: Custom logging middleware for the backend

## Backend (BackendTestSubmission)

### Features
- URL shortening service
- RESTful API for creating and managing short URLs
- Click tracking and statistics
- Custom logging middleware

### Setup and Running
1. Navigate to the backend directory:
   ```bash
   cd BackendTestSubmission
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

The server will run on `http://localhost:3000`.

### API Endpoints

#### POST /shorturls
Create a new short URL.

**Request Body:**
```json
{
  "url": "https://example.com",
  "validity": 30,
  "shortcode": "customcode" // optional
}
```

**Response:**
```json
{
  "shortLink": "http://localhost:3000/customcode",
  "expiry": "2025-09-04T07:05:59.000Z"
}
```

#### GET /shorturls/:code
Get statistics for a short URL.

**Response:**
```json
{
  "originalUrl": "https://example.com",
  "createdAt": "2025-09-04T07:05:59.000Z",
  "expiryAt": "2025-09-04T07:35:59.000Z",
  "clickCount": 1,
  "clicks": [
    {
      "timestamp": "2025-09-04T07:06:00.000Z",
      "referrer": null,
      "geo": "Unknown"
    }
  ]
}
```

#### GET /shorturls/:code/redirect
Redirect to the original URL and track the click.

## Frontend (FrontendTestSubmission)

### Features
- User interface for the URL shortener
- Form to create short URLs
- Display of URL statistics

### Setup and Running
1. Navigate to the frontend directory:
   ```bash
   cd FrontendTestSubmission
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will run on `http://localhost:5173`.

## Logging Middleware

The backend uses a custom logging middleware that sends logs to an external evaluation service. The middleware is configured with a bearer token and handles logging failures gracefully.

## Technologies Used

- **Backend:** Node.js, Express.js, Axios
- **Frontend:** React, Vite
- **Middleware:** Custom logging with Axios

## Notes

- The backend server includes CORS support for cross-origin requests.
- The logging service may fail if the authorization token is invalid, but the application continues to function.
- Ensure both backend and frontend are running simultaneously for full functionality.
