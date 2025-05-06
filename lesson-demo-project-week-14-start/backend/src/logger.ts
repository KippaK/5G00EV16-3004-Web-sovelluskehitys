import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, errors } = format;

// Custom log format
const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Create logger instance
const logger = createLogger({
  level: 'info', // Log only if level is less than or equal to this
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // Include error stack trace
    customFormat
  ),
  transports: [
    new transports.Console(), // Output logs to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Save error logs to file
    new transports.File({ filename: 'logs/combined.log' }) // Save all logs to file
  ]
});

// Handle uncaught exceptions and rejections
logger.exceptions.handle(
  new transports.File({ filename: 'logs/exceptions.log' })
);

export default logger;