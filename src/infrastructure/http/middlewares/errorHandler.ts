/**
 * Error Handler Middleware
 * 
 * This middleware catches errors thrown during request processing
 * and returns appropriate error responses to the client.
 */

import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

import logger from '../../logger';

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error details to Winston (will go to error rotating file)
  logger.error('HTTP request error', {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode || 500,
    code: err.code,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  });

  // Default error status and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send error response
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};