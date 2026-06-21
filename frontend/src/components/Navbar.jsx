import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "white",
        color: "#111827",
        borderRadius: 3,
        mb: 4,
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ flexGrow: 1 }}
        >
          Inventory Dashboard
        </Typography>

        <IconButton>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Avatar
          sx={{
            ml: 2,
            bgcolor: "#2563eb",
          }}
        >
          S
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}