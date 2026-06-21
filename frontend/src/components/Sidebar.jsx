import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const drawerWidth = 280;

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/",
    },
    {
      text: "Products",
      icon: <Inventory2Icon />,
      path: "/products",
    },
    {
      text: "Customers",
      icon: <PeopleAltIcon />,
      path: "/customers",
    },
    {
      text: "Orders",
      icon: <ShoppingBagIcon />,
      path: "/orders",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          bgcolor: "#0f172a",
          color: "white",
          borderRight: "1px solid #1e293b",
        },
      }}
    >
      <Toolbar>
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            InventoryPro
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#94a3b8" }}
          >
            Inventory Management
          </Typography>
        </Box>
      </Toolbar>

      <Divider sx={{ borderColor: "#1e293b" }} />

      <List sx={{ px: 2, mt: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 3,
              mb: 1,

              "&.Mui-selected": {
                bgcolor: "#2563eb",
              },

              "&.Mui-selected:hover": {
                bgcolor: "#2563eb",
              },

              "&:hover": {
                bgcolor: "#1e293b",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderColor: "#1e293b" }} />

      <List sx={{ px: 2 }}>
        <ListItemButton
  onClick={handleLogout}
  sx={{
    borderRadius: 3,
    my: 2,
  }}
>
          <ListItemIcon sx={{ color: "white" }}>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}