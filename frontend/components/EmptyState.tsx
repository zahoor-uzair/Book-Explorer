import { Stack, Typography } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

export function EmptyState({ query }: { query: string }) {
  return (
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
          fontSize: 60,
          color: "text.secondary",
        }}
      />
      <Typography variant="h6" color="text.secondary">
        {query
          ? `No results found for "${query}".`
          : "Search for books to get started."}
      </Typography>
    </Stack>
  );
}
