import dotenv from 'dotenv'; // Import dotenv to load environment variables
dotenv.config(); // Load environment variables from .env file
import express from 'express';
import morgan from 'morgan'; // Import morgan for logging HTTP requests

import userRoutes from './routes/userRoutes.js'; // Import user routes
import globalErrorHandler from './utils/globalErrorHandler.js'; // Import global error handler
import AppError from './utils/appError.js'; // Import AppError class

const app = express();
// 1. global middleware
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //use morgan middleware to log requests in the console
}

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files
app.use(express.static('public'));

// 2. Routes
app.use('/api/v1/users', userRoutes); // Use user routes for the /api/v1/users endpoint
app.all('*', (req, res, next) => {
  // Handle all other routes that are not defined
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      404
    )
  );
});

// 3. Error handling middleware
app.use(globalErrorHandler);

export default app;
