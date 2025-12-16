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
import { logRouter } from './routes/logRoutes';
import { errorHandler } from './middlewares/errorHandler';
import logger, { httpLogStream } from '../logger';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Set port
const PORT = process.env.PORT || 3000;

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
// Use morgan for HTTP access logs, piping to Winston so logs also go to files.
app.use(morgan('combined', { stream: httpLogStream })); // Request logging via Winston
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request body

// Apply routes
app.use('/api/products', productRouter);
app.use('/api/', logRouter);

// Health check endpoint
app.get('/health', (req, res, next) => {
  try {
    // throw new Error('Health check forced error');
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    next(err);
  }
});

// Apply error handler middleware
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // Use centralized logger instead of console for consistency and persistence
    logger.info(`Server running on port ${PORT}`);
  });
}

export default app;