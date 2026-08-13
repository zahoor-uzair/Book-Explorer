"use client";

import Image from "next/image";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

import { Book } from "@/lib/types";
import { RatingStamp } from "./RatingStamp";

export function BookDetailModal({
  book,
  onClose,
}: {
  book: Book;
  onClose: () => void;
}) {
  const authorLine = book.authors.length
    ? book.authors.join(", ")
    : "Unknown author";

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
      aria-labelledby="book-modal-title"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(24, 38, 61, 0.62)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          backgroundImage: "none",
          boxShadow: "0 25px 70px rgba(24, 38, 61, 0.25)",
          overflow: "hidden",
        },
      }}
    >
      {/* Header / Close */}
      <Box
        sx={{
          position: "relative",
          px: { xs: 2.5, sm: 4 },
          pt: { xs: 2.5, sm: 3 },
          pb: 1,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "secondary.main",
            fontWeight: 700,
            letterSpacing: "0.14em",
          }}
        >
          Book details
        </Typography>

        <IconButton
          onClick={onClose}
          aria-label="Close book details"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "text.secondary",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1.5,

            "&:hover": {
              color: "text.primary",
              bgcolor: "action.hover",
              borderColor: "primary.light",
            },
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          px: { xs: 2.5, sm: 4 },
          pb: 3,
        }}
      >
        {/* Main Book Information */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3, sm: 4 }}
        >
          {/* Cover */}
          <Box
            sx={{
              position: "relative",
              flexShrink: 0,
              width: { xs: 150, sm: 170 },
              height: { xs: 220, sm: 250 },
              mx: { xs: "auto", sm: 0 },
              overflow: "hidden",

              bgcolor: "rgba(38,58,91,0.06)",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1.5,

              boxShadow:
                "6px 8px 0 rgba(38, 58, 91, 0.06), 0 10px 25px rgba(0,0,0,0.12)",
            }}
          >
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                fill
                sizes="170px"
                style={{
                  objectFit: "cover",
                }}
              />
            ) : (
              <Stack
                spacing={1.5}
                sx={{
                  height: "100%",
                  p: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <AutoStoriesRoundedIcon
                  sx={{
                    fontSize: 34,
                    color: "primary.light",
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 600,
                  }}
                >
                  {book.title}
                </Typography>
              </Stack>
            )}
          </Box>

          {/* Details */}
          <Stack
            spacing={1}
            sx={{
              minWidth: 0,
              flex: 1,
            }}
          >
            {/* Metadata */}
            <Typography
              variant="overline"
              sx={{
                color: "text.secondary",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
              }}
            >
              {book.firstPublishYear ?? "Year unknown"}
              {book.pageCount ? ` · ${book.pageCount} pages` : ""}
            </Typography>

            {/* Title */}
            <Typography
              id="book-modal-title"
              variant="h4"
              sx={{
                color: "primary.dark",
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: "-0.035em",
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.25rem",
                },
              }}
            >
              {book.title}
            </Typography>

            {/* Author */}
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.5,
              }}
            >
              {authorLine}
            </Typography>

            {/* Rating + Source */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2.5}
              sx={{
                mt: 2,
                alignItems: { xs: "flex-start", sm: "center" },
              }}
            >
              <RatingStamp rating={book.rating} size="lg" />

              <Stack spacing={0.7}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  Catalog record{" "}
                  <Box
                    component="span"
                    sx={{
                      fontFamily: "monospace",
                      color: "text.primary",
                      fontWeight: 600,
                    }}
                  >
                    {book.source.catalog}
                  </Box>
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  Ratings{" "}
                  <Box
                    component="span"
                    sx={{
                      fontFamily: "monospace",
                      color: "text.primary",
                      fontWeight: 600,
                    }}
                  >
                    {book.source.ratings ?? "Unavailable for this title"}
                  </Box>
                </Typography>
              </Stack>
            </Stack>

            {/* Subjects */}
            {book.subjects.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.75,
                  mt: 2,
                }}
              >
                {book.subjects.slice(0, 10).map((subject) => (
                  <Chip
                    key={subject}
                    label={subject}
                    size="small"
                    sx={{
                      height: 26,
                      bgcolor: "rgba(38,58,91,0.045)",
                      border: "1px solid",
                      borderColor: "divider",
                      color: "text.secondary",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>
            )}
          </Stack>
        </Stack>

        {/* Description */}
        {(book.description || book.previewLink) && (
          <>
            <Divider sx={{ my: 3 }} />

            {book.description && (
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    color: "primary.dark",
                    fontWeight: 700,
                  }}
                >
                  About this book
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.8,
                    display: "-webkit-box",
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {book.description}
                </Typography>
              </Box>
            )}
          </>
        )}
      </DialogContent>

      {/* Actions */}
      {book.previewLink && (
        <DialogActions
          sx={{
            px: { xs: 2.5, sm: 4 },
            py: 2.5,
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "rgba(38,58,91,0.025)",
          }}
        >
          <Button
            component="a"
            href={book.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            disableElevation
            endIcon={<OpenInNewRoundedIcon />}
            sx={{
              borderRadius: 1.5,
              px: 2.5,
              fontWeight: 700,
            }}
          >
            View on Google Books
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
