import dotenv from 'dotenv';

dotenv.config();

function toInt(value: string | undefined, fallback: number): number {
  return value ? parseInt(value, 10) || fallback : fallback;
}

export interface Config {
  port: number;
  corsOrigin: string;
  googleBooksApiKey: string | null;
  enrichmentConcurrency: number;
  openLibraryBaseUrl: string;
  openLibraryCoversUrl: string;
  googleBooksBaseUrl: string;
}

export const config: Config = {
  port: toInt(process.env.PORT, 4000),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  googleBooksApiKey: process.env.GOOGLE_BOOKS_API_KEY || null,
  enrichmentConcurrency: toInt(process.env.ENRICHMENT_CONCURRENCY, 5),
  openLibraryBaseUrl: 'https://openlibrary.org',
  openLibraryCoversUrl: 'https://covers.openlibrary.org/b',
  googleBooksBaseUrl: 'https://books.googleapis.com/books/v1/volumes',
};

export default config;
