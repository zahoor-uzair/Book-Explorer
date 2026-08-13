import { Request, Response, NextFunction } from 'express';

export interface HttpError extends Error {
  status?: number;
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
}

export function errorHandler(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[api error]', err);
  const status = err.status || 502;
  res.status(status).json({
    error: 'Upstream or server error',
    message: err.message || 'Something went wrong while fetching book data.',
  });
}
