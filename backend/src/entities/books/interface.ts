export interface BookQueryOptions {
  query?: string;
  page: number;
  limit: number;
}

export interface NormalizedBook {
  olKey: string;
  title: string;
  authors: string[];
  firstPublishYear: number | null;
  isbn: string | null;
  isbns: string[];
  coverUrl: string | null;
  subjects: string[];
  pageCount: number | null;
  languages: string[];
}

export interface GoogleRating {
  average: number | null;
  count: number;
  description: string | null;
  categories: string[];
  previewLink: string | null;
}

export interface BookRating {
  average: number | null;
  count: number;
}

export interface BookSource {
  catalog: string;
  ratings: string | null;
}

export interface EnrichedBook {
  id: string;
  title: string;
  authors: string[];
  firstPublishYear: number | null;
  isbn: string | null;
  coverUrl: string | null;
  subjects: string[];
  pageCount: number | null;
  rating: BookRating;
  description: string | null;
  previewLink: string | null;
  source: BookSource;
}

export interface GetBooksResponse {
  query: string | null;
  mode: 'search' | 'trending';
  page: number;
  limit: number;
  totalResults: number;
  books: EnrichedBook[];
}

export interface OpenLibraryDoc {
  key: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  isbn?: string[];
  cover_i?: number;
  edition_key?: string[];
  subject?: string[];
  number_of_pages_median?: number;
  language?: string[];
}

export interface OpenLibraryWork {
  key: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  availability?: {
    isbn?: string;
  };
  cover_i?: number;
  subject?: string[];
}

export interface OpenLibrarySearchResponse {
  numFound?: number;
  docs?: OpenLibraryDoc[];
}

export interface OpenLibraryTrendingResponse {
  works?: OpenLibraryWork[];
}

export interface GoogleBooksVolumeInfo {
  averageRating?: number;
  ratingsCount?: number;
  description?: string;
  categories?: string[];
  previewLink?: string;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
}

export interface GoogleBooksItem {
  volumeInfo?: GoogleBooksVolumeInfo;
}

export interface GoogleBooksResponse {
  items?: GoogleBooksItem[];
}
