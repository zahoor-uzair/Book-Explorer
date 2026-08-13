"use client";

import { BookRating } from "@/lib/types";
import { Box, Stack, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

export function RatingStamp({
  rating,
  size = "md",
}: {
  rating: BookRating;
  size?: "md" | "lg";
}) {
  const isLarge = size === "lg";

  const hasRating = rating.average !== null;

  return (
    <Box
      sx={{
        flexShrink: 0,

        display: "inline-flex",
        alignItems: "center",

        minWidth: isLarge ? 180 : 135,
        height: isLarge ? 58 : 46,

        px: isLarge ? 1.75 : 1.25,

        borderRadius: 1.5,
        border: "1px solid",
        borderColor: hasRating ? "secondary.main" : "divider",

        bgcolor: hasRating ? "rgba(183, 121, 62, 0.05)" : "background.paper",

        color: hasRating ? "secondary.dark" : "text.secondary",

        boxShadow: hasRating
          ? "inset 0 0 0 1px rgba(183, 121, 62, 0.08)"
          : "none",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ width: "100%", alignItems: "center" }}
      >
        {/* Star */}
        <StarRoundedIcon
          sx={{
            flexShrink: 0,
            fontSize: isLarge ? 25 : 20,
            color: hasRating ? "secondary.main" : "text.disabled",
          }}
        />

        {/* Rating */}
        <Typography
          sx={{
            fontSize: isLarge ? "1.25rem" : "1rem",
            lineHeight: 1,
            fontWeight: 800,
            color: hasRating ? "secondary.dark" : "text.disabled",
          }}
        >
          {hasRating ? rating.average?.toFixed(1) : "N/A"}
        </Typography>

        {/* Divider */}
        <Box
          sx={{
            width: "1px",
            height: isLarge ? 28 : 22,
            bgcolor: "divider",
            mx: 0.25,
          }}
        />

        {/* Votes */}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: isLarge ? "0.7rem" : "0.62rem",
              lineHeight: 1.2,
              fontWeight: 700,
              color: "text.secondary",
              whiteSpace: "nowrap",
            }}
          >
            {rating.count.toLocaleString()}
          </Typography>

          <Typography
            sx={{
              fontSize: isLarge ? "0.62rem" : "0.55rem",
              lineHeight: 1.2,
              color: "text.disabled",
              whiteSpace: "nowrap",
            }}
          >
            votes
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
