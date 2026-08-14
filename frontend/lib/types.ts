export interface BookRating {
  average: number | null;
  count: number;
}

export interface Book {
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
  source: {
    catalog: string;
    ratings: string | null;
  };
}

export interface BooksResponse {
  query: string | null;
  mode: "search" | "trending";
  page: number;
  limit: number;
  totalResults: number;
  books: Book[];
}
