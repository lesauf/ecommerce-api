/**
 * Express Server Setup
 * 
 * This file sets up the Express server with middleware and routes.
 * It's part of the infrastructure layer in the clean architecture.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { productRouter } from './routes/productRoutes';
import { errorHandler } from './middlewares/errorHandler';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Set port
const PORT = process.env.PORT || 3000;

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request body

// Apply routes
app.use('/api/products', productRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Apply error handler middleware
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;