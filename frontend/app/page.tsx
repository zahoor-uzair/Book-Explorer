"use client";

import { useCallback, useEffect, useState } from "react";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";

import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { BookCard } from "@/components/BookCard";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { Pagination } from "@/components/Pagination";
import { BookDetailModal } from "@/components/BookDetailModal";

import { fetchBooks } from "@/lib/api";
import { Book, BooksResponse } from "@/lib/types";

const PAGE_SIZE = 15;

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<BooksResponse | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const load = useCallback(async (q: string, p: number) => {
    try {
      const res = await fetchBooks({
        q,
        page: p,
        limit: PAGE_SIZE,
      });

      return res;
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    load(query, page)
      .then((res) => {
        if (cancelled) return;

        setData(res);
        setStatus("idle");
      })
      .catch((err: Error) => {
        if (cancelled) return;

        setErrorMessage(err.message || "Could not reach the catalog service.");
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [query, page, load]);

  function handleSearch(value: string) {
    setPage(1);
    setQuery(value);
  }

  const totalPages = data
    ? Math.max(1, Math.ceil(data.totalResults / PAGE_SIZE))
    : 1;

  const hasBooks = status === "idle" && data && data.books.length > 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Header />

      {/* Hero / Search Section */}
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(38,58,91,0.06) 0%, rgba(247,244,238,0) 100%)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 5, md: 7 },
            px: { xs: 2, sm: 4 },
          }}
        >
          <Stack
            spacing={3}
            sx={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "primary.dark",
                  fontSize: {
                    xs: "2rem",
                    sm: "2.5rem",
                    md: "3rem",
                  },
                  letterSpacing: "-0.04em",
                }}
              >
                Discover your next great read
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  maxWidth: 620,
                  mx: "auto",
                  color: "text.secondary",
                  lineHeight: 1.7,
                }}
              >
                Search thousands of books, explore trending titles, and find
                something worth getting lost in.
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                maxWidth: 720,
              }}
            >
              <SearchBar defaultValue={query} onSearch={handleSearch} />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 3, md: 5 },
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* Results Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{
            alignItems: { xs: "flex-start", sm: "center" },
            JustifyContent: "space-between",
            textAlign: "center",
            mb: 3,
          }}
        >
          <Box>
            {status === "loading" && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontWeight: 600,
                }}
              >
                Searching the stacks…
              </Typography>
            )}

            {status === "idle" && data && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: "text.primary",
                    fontWeight: 700,
                    mr: 0.5,
                  }}
                >
                  {data.totalResults.toLocaleString()}
                </Box>
                {data.totalResults === 1 ? "book" : "books"}
                {data.mode === "search" && data.query && (
                  <>
                    matching
                    <Box
                      component="span"
                      sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        ml: 0.5,
                      }}
                    >
                      {`"${data.query}"`}
                    </Box>
                  </>
                )}
                {data.mode !== "search" && (
                  <>
                    <Box
                      component="span"
                      sx={{
                        color: "secondary.main",
                        fontWeight: 700,
                      }}
                    >
                      · Trending this week
                    </Box>
                  </>
                )}
              </Typography>
            )}
          </Box>

          {status === "idle" && data && (
            <Typography
              variant="caption"
              sx={{
                px: 1.5,
                py: 0.75,
                borderRadius: 2,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              Page {data.page} of {totalPages}
            </Typography>
          )}
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Loading */}
        {status === "loading" && <Typography>Loading books...</Typography>}

        {/* Error */}
        {status === "error" && (
          <Box
            sx={{
              py: 8,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ErrorState message={errorMessage} />
          </Box>
        )}

        {/* Empty */}
        {status === "idle" && data && data.books.length === 0 && (
          <Box
            sx={{
              py: 8,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <EmptyState query={data.query || ""} />
          </Box>
        )}

        {/* Books */}
        {hasBooks && (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2.5,
              }}
            >
              {data.books.map((book) => (
                <BookCard key={book.id} book={book} onOpen={setSelectedBook} />
              ))}
            </Box>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            </Box>
          </>
        )}
      </Container>

      {/* Book Details */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </Box>
  );
}
