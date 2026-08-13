import { Router } from 'express';
import { getBooksHandler } from './controller';

const router = Router();

// GET /api/books?q=harry+potter&page=1&limit=10
router.get('/', getBooksHandler);

export default router;
