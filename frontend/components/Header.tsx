import { AppBar, Box, Chip, Toolbar, Typography } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

export function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "76px !important",
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.12)",
            mr: 2,
            backdropFilter: "blur(10px)",
          }}
        >
          <AutoStoriesRoundedIcon sx={{ color: "#fff", fontSize: 25 }} />
        </Box>

        {/* Title + Subtitle */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "#fff",
            }}
          >
            Books Explorer
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 0.3,
              color: "rgba(255,255,255,0.7)",
              display: { xs: "none", sm: "block" },
            }}
          >
            Discover your next great read
          </Typography>
        </Box>

        {/* Status */}
        <Chip
          label="Explore"
          size="small"
          sx={{
            display: { xs: "none", sm: "flex" },
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.12)",
            fontWeight: 600,
            "& .MuiChip-label": {
              px: 1.5,
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
