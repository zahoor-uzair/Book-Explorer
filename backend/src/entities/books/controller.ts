import { Request, Response, NextFunction } from 'express';
import { getBooks } from './service';

const MAX_LIMIT = 30;

function parsePagination(query: Request['query']): { page: number; limit: number } {
  const pageStr = typeof query.page === 'string' ? query.page : '';
  const limitStr = typeof query.limit === 'string' ? query.limit : '';

  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  const limitRaw = parseInt(limitStr, 10) || 10;
  const limit = Math.min(Math.max(limitRaw, 1), MAX_LIMIT);
  return { page, limit };
}

export async function getBooksHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { page, limit } = parsePagination(req.query);
    const searchQuery = typeof req.query.q === 'string' ? req.query.q : undefined;
    const data = await getBooks({ query: searchQuery, page, limit });
    res.json(data);
  } catch (err) {
    next(err);
  }
}
