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

async function fetchVolumes(query: string): Promise<GoogleRating | null> {
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
    return first ? normalizeVolume(first.volumeInfo) : null;
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
