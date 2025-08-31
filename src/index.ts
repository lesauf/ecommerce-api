/**
 * Application Entry Point
 * 
 * This file serves as the main entry point for the e-commerce API.
 * It imports and exports the Express server configured in the infrastructure layer.
 */

import 'reflect-metadata';
import './infrastructure/container';
import app from './infrastructure/http/server';
import logger from './infrastructure/logger';

// Global process-level error safety nets to ensure errors are logged
process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled Promise Rejection', { reason });
});

process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception', { message: err.message, stack: err.stack });
});

export default app;