import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  // eslint-disable-next-line no-console
  console.error(err);
  if (res.headersSent) return;

  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: err.code,
      message: err.message,
      ...(process.env.NODE_ENV !== 'production' && err.details ? { details: err.details } : {}),
    });
  }

  res.status(500).json({ error: 'internal_error', message: 'Internal Server Error' });
}


