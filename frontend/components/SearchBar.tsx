"use client";

import { FormEvent, useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export function SearchBar({
  defaultValue,
  onSearch,
}: {
  defaultValue: string;
  onSearch: (value: string) => void;
}) {
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch(value.trim());
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          width: "100%",
          p: 0.75,
          gap: 0.75,

          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2.5,

          boxShadow: "0 8px 30px rgba(38, 58, 91, 0.08)",

          transition: "all 0.2s ease",

          "&:focus-within": {
            borderColor: "primary.main",
            boxShadow: "0 8px 30px rgba(38, 58, 91, 0.14)",
          },
        }}
      >
        <TextField
          id="catalog-search"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Try "Ursula K. Le Guin" or "The Hobbit"'
          variant="outlined"
          autoComplete="off"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon
                    sx={{
                      color: "text.secondary",
                      fontSize: 23,
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 54,
              borderRadius: 2,
              bgcolor: "transparent",

              "& fieldset": {
                border: "none",
              },

              "&:hover fieldset": {
                border: "none",
              },

              "&.Mui-focused fieldset": {
                border: "none",
              },
            },

            "& .MuiInputBase-input": {
              fontSize: "0.98rem",
              color: "text.primary",
            },

            "& .MuiInputBase-input::placeholder": {
              color: "text.secondary",
              opacity: 0.75,
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disableElevation
          sx={{
            minWidth: { xs: 52, sm: 120 },
            px: { xs: 1.5, sm: 2.5 },
            borderRadius: 2,

            bgcolor: "primary.main",
            color: "primary.contrastText",

            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: "0.03em",

            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <Box
            component="span"
            sx={{
              display: { xs: "none", sm: "inline" },
            }}
          >
            Search
          </Box>

          <SearchRoundedIcon
            sx={{
              display: { xs: "block", sm: "none" },
              fontSize: 21,
            }}
          />
        </Button>
      </Box>
    </Box>
  );
}
