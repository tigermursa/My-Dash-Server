// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

interface HttpException extends Error {
  statusCode?: number;
  status?: number;
  message: string;
}

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Default error status code and message
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error details in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error Handler] ${statusCode} - ${message}`);
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
