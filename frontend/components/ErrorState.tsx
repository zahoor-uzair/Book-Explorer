import { Stack, Typography, Button } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
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
      <Typography variant="h6" color="text.secondary">
        {message || "An error occurred while fetching books."}
      </Typography>
      <Button variant="contained" onClick={onRetry}>
        Retry
      </Button>
    </Stack>
  );
}
