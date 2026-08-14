import { Stack, Typography } from "@mui/material";

export function ErrorState({ message }: { message: string }) {
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
    </Stack>
  );
}
