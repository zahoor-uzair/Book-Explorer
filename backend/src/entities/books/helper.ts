import config from '../../config/config';
import {
  GoogleBooksVolumeInfo,
  GoogleRating,
  NormalizedBook,
  OpenLibraryDoc,
} from './interface';

export function coverUrl(coverId?: number, size = 'L'): string | null {
  if (!coverId) return null;
  return `${config.openLibraryCoversUrl}/id/${coverId}-${size}.jpg`;
}

/**
 * Normalizes a raw Open Library search "doc" into the shape the rest of
 * the app works with.
 */
export function normalizeDoc(doc: OpenLibraryDoc): NormalizedBook {
  const isbns = Array.isArray(doc.isbn) ? doc.isbn : [];
  return {
    olKey: doc.key,
    title: doc.title || 'Untitled',
    authors: doc.author_name || [],
    firstPublishYear: doc.first_publish_year || null,
    isbn: isbns[0] || null,
    isbns,
    coverUrl: coverUrl(doc.cover_i),
    subjects: (doc.subject || []).slice(0, 5),
    pageCount: doc.number_of_pages_median || null,
    languages: doc.language || [],
  };
}

/**
 * Normalizes Google Books volumeInfo metadata.
 */
export function normalizeVolume(volumeInfo: GoogleBooksVolumeInfo = {}): GoogleRating {
  return {
    average: typeof volumeInfo.averageRating === 'number' ? volumeInfo.averageRating : null,
    count: typeof volumeInfo.ratingsCount === 'number' ? volumeInfo.ratingsCount : 0,
    description: volumeInfo.description || null,
    categories: volumeInfo.categories || [],
    previewLink: volumeInfo.previewLink || null,
  };
}
