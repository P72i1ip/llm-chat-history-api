import express from 'express';
import morgan from 'morgan'; // Import morgan for logging HTTP requests

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //use morgan middleware to log requests in the console
}

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files
app.use(express.static('public'));
// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

export default app;
