"use client";

import Image from "next/image";
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { Book } from "@/lib/types";
import { RatingStamp } from "./RatingStamp";

export function BookCard({
  book,
  onOpen,
}: {
  book: Book;
  onOpen: (book: Book) => void;
}) {
  const authorLine = book.authors.length
    ? book.authors.slice(0, 2).join(", ")
    : "Unknown author";

  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        height: "100%",
        overflow: "visible",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        borderRadius: 1.5,
        transition: "all 0.25s ease",

        "&:hover": {
          borderColor: "primary.light",
          transform: "translateY(-4px)",
          boxShadow: "0 14px 35px rgba(38, 58, 91, 0.12)",
        },

        "&:hover .book-cover": {
          transform: "scale(1.04)",
        },

        "&:hover .arrow-icon": {
          opacity: 1,
          transform: "translateX(0)",
        },
      }}
    >
      <CardActionArea
        onClick={() => onOpen(book)}
        sx={{
          height: "100%",
          borderRadius: 2.5,
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 2,
            minHeight: 180,
          }}
        >
          {/* Cover */}
          <Box
            sx={{
              position: "relative",
              flexShrink: 0,
              width: 122,
              height: 200,
              overflow: "hidden",
              borderRadius: 1,
              bgcolor: "rgba(38,58,91,0.06)",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                fill
                sizes="92px"
                className="book-cover"
                style={{
                  objectFit: "cover",
                  transition: "transform 300ms ease",
                }}
              />
            ) : (
              <Stack
                spacing={1}
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 1.5,
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AutoStoriesRoundedIcon
                  sx={{
                    fontSize: 26,
                    color: "primary.light",
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {book.title}
                </Typography>
              </Stack>
            )}
          </Box>

          {/* Content */}
          <Stack
            sx={{
              minWidth: 0,
              flex: 1,
              pr: 3,
            }}
          >
            {/* Year */}
            <Typography
              variant="overline"
              sx={{
                color: "text.secondary",
                fontSize: "0.62rem",
                lineHeight: 1.2,
                fontWeight: 700,
                letterSpacing: "0.12em",
              }}
            >
              {book.firstPublishYear ?? "Year unknown"}
            </Typography>

            {/* Title */}
            <Typography
              variant="h6"
              sx={{
                mt: 0.6,
                color: "text.primary",
                fontSize: "1.08rem",
                lineHeight: 1.35,
                fontWeight: 750,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {book.title}
            </Typography>

            {/* Author */}
            <Typography
              variant="body2"
              sx={{
                mt: 0.6,
                color: "text.secondary",
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {authorLine}
            </Typography>

            {/* Subjects */}
            {book.subjects.length > 0 && (
              <Stack
                direction="row"
                spacing={0.7}
                sx={{
                  mt: "auto",
                  pt: 1.5,
                  flexWrap: "wrap",
                  rowGap: 0.7,
                }}
              >
                {book.subjects.slice(0, 2).map((subject) => (
                  <Chip
                    key={subject}
                    label={subject}
                    size="small"
                    sx={{
                      height: 23,
                      maxWidth: 130,
                      bgcolor: "rgba(38,58,91,0.05)",
                      border: "1px solid",
                      borderColor: "divider",
                      color: "text.secondary",
                      fontSize: "0.62rem",
                      fontWeight: 600,

                      "& .MuiChip-label": {
                        px: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    }}
                  />
                ))}
              </Stack>
            )}
          </Stack>

          {/* Rating */}
          <Box
            sx={{
              position: "absolute",
              bottom: 14,
              right: 14,
            }}
          >
            <RatingStamp rating={book.rating} />
          </Box>

          {/* Hover arrow */}
          <ArrowForwardRoundedIcon
            className="arrow-icon"
            sx={{
              position: "absolute",
              right: 14,
              bottom: 14,
              fontSize: 18,
              color: "primary.main",
              opacity: 0,
              transform: "translateX(-5px)",
              transition: "all 0.2s ease",
            }}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
}
