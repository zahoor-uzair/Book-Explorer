"use client";

import React from "react";
import {
  Box,
  IconButton,
  Pagination as MuiPagination,
  Stack,
  Typography,
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        mt: 5,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Previous */}
      <IconButton
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        sx={{
          width: 40,
          height: 40,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1.5,
          color: "primary.main",
          bgcolor: "background.paper",

          "&:hover": {
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderColor: "primary.main",
          },

          "&.Mui-disabled": {
            opacity: 0.35,
            bgcolor: "background.paper",
          },
        }}
      >
        <ChevronLeftRoundedIcon />
      </IconButton>

      {/* Pages */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.75,
          flexWrap: "wrap",
        }}
      >
        <MuiPagination
          page={page}
          count={totalPages}
          onChange={(_, value) => onChange(value)}
          siblingCount={1}
          boundaryCount={1}
          hidePrevButton
          hideNextButton
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              minWidth: 38,
              height: 38,
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: "divider",
              color: "text.secondary",
              fontWeight: 600,
              bgcolor: "background.paper",
              transition: "all 0.2s ease",
            },

            "& .MuiPaginationItem-root:hover": {
              bgcolor: "rgba(38, 58, 91, 0.06)",
              borderColor: "primary.light",
              color: "primary.main",
            },

            "& .MuiPaginationItem-root.Mui-selected": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
              borderColor: "primary.main",
              fontWeight: 700,
            },

            "& .MuiPaginationItem-root.Mui-selected:hover": {
              bgcolor: "primary.dark",
            },

            "& .MuiPaginationItem-ellipsis": {
              border: "none",
              bgcolor: "transparent",
              color: "text.disabled",
            },

            "& .MuiPaginationItem-ellipsis:hover": {
              bgcolor: "transparent",
              border: "none",
            },
          }}
        />
      </Box>

      {/* Next */}
      <IconButton
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        sx={{
          width: 40,
          height: 40,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1.5,
          color: "primary.main",
          bgcolor: "background.paper",

          "&:hover": {
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderColor: "primary.main",
          },

          "&.Mui-disabled": {
            opacity: 0.35,
            bgcolor: "background.paper",
          },
        }}
      >
        <ChevronRightRoundedIcon />
      </IconButton>
    </Stack>
  );
}
