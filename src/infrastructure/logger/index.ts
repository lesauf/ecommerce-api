/**
 * Application Logger (Winston)
 *
 * This module configures a centralized Winston logger for the application.
 * It writes logs to rotating files under the /logs directory and also logs to
 * the console in non-production environments for developer convenience.
 *
 * Key features:
 * - Daily rotation of log files using date patterns
 * - Separate error log file for errors and above
 * - Automatic logs directory creation if it doesn't exist
 * - JSON log format for files (structured, machine-readable)
 * - Human-friendly colorized console output in development
 * - Safe handling of uncaught exceptions and unhandled promise rejections
 */

import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

// Resolve logs directory relative to project root. Adjust if folder structure changes.
const logsDir = path.resolve(process.cwd(), 'logs');

// Ensure logs directory exists (idempotent)
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Helpful shorthands for environment checks
const isProduction = process.env.NODE_ENV === 'production';
const serviceName = process.env.SERVICE_NAME || 'ecommerce-api';

// Common formats
const fileFormat = format.combine(
  // Add timestamp for log correlation
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  // Include useful metadata
  format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
  // Output as JSON for easy parsing/ingestion
  format.json()
);

const consoleFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: 'HH:mm:ss' }),
  format.printf(({ level, message, timestamp, ...meta }) => {
    const rest = meta && Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level}: ${message}${rest}`;
  })
);

// Configure daily rotating file transports
const DailyRotateFile = require('winston-daily-rotate-file');

const infoRotateTransport = new DailyRotateFile({
  dirname: logsDir, // folder to store logs
  filename: `${serviceName}-%DATE%.log`, // e.g., ecommerce-api-2025-08-31.log
  datePattern: 'YYYY-MM-DD', // rotate daily
  zippedArchive: true, // optional: compress archived logs
  maxSize: '20m', // optional: split files larger than 20 MB
  maxFiles: '14d', // keep logs for 14 days
  level: 'info', // capture info and above (info, warn, error)
  format: fileFormat,
});

const errorRotateTransport = new DailyRotateFile({
  dirname: logsDir,
  filename: `${serviceName}-error-%DATE%.log`, // separate file for errors
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d', // keep error logs longer
  level: 'error', // only errors and above
  format: fileFormat,
});

// Create the logger instance
export const logger = createLogger({
  level: isProduction ? 'info' : 'debug', // more verbose in non-prod
  defaultMeta: { service: serviceName, env: process.env.NODE_ENV || 'development' },
  transports: [infoRotateTransport, errorRotateTransport],
  // Handle exceptions by directing them to error transport and avoiding process crash when possible
  exceptionHandlers: [errorRotateTransport],
  rejectionHandlers: [errorRotateTransport],
});

// Add console transport in non-production for developer-friendly logs
if (!isProduction) {
  logger.add(new transports.Console({
    level: 'debug',
    format: consoleFormat,
    handleExceptions: true,
  }));
}

// Provide a stream interface for morgan integration (HTTP request logging)
// Morgan will call stream.write(msg), we forward to winston at info level
export const httpLogStream = {
  write: (message: string) => {
    // message already includes trailing newline, trim to keep files clean
    logger.info(message.trim(), { context: 'http' });
  },
};

export default logger;
