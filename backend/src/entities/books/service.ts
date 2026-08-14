import axios from "axios";
import config from "../../config/config";
import { runWithConcurrency } from "../../shared/utils/concurrency";
import { normalizeDoc, normalizeVolume } from "./helper";
import {
  BookQueryOptions,
  EnrichedBook,
  GetBooksResponse,
  GoogleBooksResponse,
  GoogleRating,
  NormalizedBook,
  OpenLibrarySearchResponse,
  OpenLibraryTrendingResponse,
} from "./interface";

const httpClient = axios.create({
  headers: {
    "User-Agent": "book-library-app/1.0 (personal project)",
  },
});

export async function searchBooks({
  query,
  page,
  limit,
}: {
  query: string;
  page: number;
  limit: number;
}): Promise<{ totalResults: number; books: NormalizedBook[] }> {
  const { data } = await httpClient.get<OpenLibrarySearchResponse>(
    `${config.openLibraryBaseUrl}/search.json`,
    {
      params: {
        q: query,
        page: String(page),
        limit: String(limit),
      },
    },
  );

  return {
    totalResults: data.numFound || 0,
    books: (data.docs || []).map(normalizeDoc),
  };
}

export async function getTrending({
  limit,
  period = "weekly",
}: {
  limit: number;
  period?: string;
}): Promise<{ totalResults: number; books: NormalizedBook[] }> {
  const { data } = await httpClient.get<OpenLibraryTrendingResponse>(
    `${config.openLibraryBaseUrl}/trending/${period}.json`,
    {
      params: { limit: String(limit) },
    },
  );

  const books = (data.works || []).slice(0, limit).map((work) =>
    normalizeDoc({
      key: work.key,
      title: work.title,
      author_name: work.author_name,
      first_publish_year: work.first_publish_year,
      isbn: work.availability?.isbn ? [work.availability.isbn] : [],
      cover_i: work.cover_i,
      subject: work.subject,
      number_of_pages_median: undefined,
      language: [],
    }),
  );

  return { totalResults: data.works?.length || 0, books };
}

//fir now we are using local state for caching the ratings fetched from Google Books API. In future we can use Redis or any other caching mechanism to store the ratings for a longer period of time.
const googleBooksCache = new Map<
  string,
  { data: GoogleRating | null; expiresAt: number }
>();

const GOOGLE_CACHE_TIME = 1000 * 60 * 60; // 1 hour

// function to fetch book ratings from Google Books API based on the book title
// First check record in cache, if not found, fetch from Google Books API and store in cache
async function fetchVolumes(query: string): Promise<GoogleRating | null> {
  const cacheKey = query.trim().toLowerCase();

  // Check cache
  const cached = googleBooksCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  // Remove expired cache
  if (cached) {
    googleBooksCache.delete(cacheKey);
  }

  try {
    const params: Record<string, string> = {
      q: encodeURIComponent(query),
      maxResults: "1",
    };

    if (config.googleBooksApiKey) {
      params.key = config.googleBooksApiKey;
    }

    const { data } = await httpClient.get<GoogleBooksResponse>(
      config.googleBooksBaseUrl,
      { params },
    );

    const first = data.items?.[0];
    const result = first ? normalizeVolume(first.volumeInfo) : null;

    // Cache result, including null
    googleBooksCache.set(cacheKey, {
      data: result,
      expiresAt: Date.now() + GOOGLE_CACHE_TIME,
    });

    return result;
  } catch {
    return null;
  }
}

export async function getRatingForBook({
  title,
}: {
  title: string;
}): Promise<GoogleRating | null> {
  if (!title) return null;
  return fetchVolumes(title);
}

export async function enrichBook(book: NormalizedBook): Promise<EnrichedBook> {
  const rating = await getRatingForBook({
    title: book.title,
  });

  return {
    id: book.olKey,
    title: book.title,
    authors: book.authors,
    firstPublishYear: book.firstPublishYear,
    isbn: book.isbn,
    coverUrl: book.coverUrl || null,
    subjects: book.subjects,
    pageCount: book.pageCount,
    rating: rating
      ? { average: rating.average, count: rating.count }
      : { average: null, count: 0 },
    description: rating?.description || null,
    previewLink: rating?.previewLink || null,
    source: {
      catalog: "Open Library",
      ratings: rating ? "Google Books" : null,
    },
  };
}

export async function getBooks({
  query,
  page,
  limit,
}: BookQueryOptions): Promise<GetBooksResponse> {
  const trimmed = (query || "").trim();

  const { totalResults, books } = trimmed
    ? await searchBooks({ query: trimmed, page, limit })
    : await getTrending({ limit });

  const enriched = await runWithConcurrency(
    books,
    config.enrichmentConcurrency,
    enrichBook,
  );

  return {
    query: trimmed || null,
    mode: trimmed ? "search" : "trending",
    page,
    limit,
    totalResults,
    books: enriched,
  };
}
