# Backend Test Submission

This directory contains the backend Node.js Express server for the URL shortener project.

## Features

- RESTful API for URL shortening
- Click tracking and analytics
- Custom logging middleware
- CORS enabled for frontend integration

## Setup and Running

1. Navigate to this directory:
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

## API Endpoints

See the main README.md in the root directory for detailed API documentation.

## Technologies Used

- Node.js
- Express.js
- Axios (for logging)
- UUID
- Body-parser
- CORS

## Notes

- The server uses a custom logging middleware that sends logs to an external service.
- Ensure the LoggingMiddleware directory is properly linked as a local dependency.
