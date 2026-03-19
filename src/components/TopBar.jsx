import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { glassBoxStyles } from "../utils/glassStyles";
import { useEstimateForm } from "../contexts/EstimateFormContext";

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
    const { data, reset } = useEstimateForm();
  
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHome = () => {
    navigate("/");
    reset();
    handleClose();
  }

  const handleLogin = () => {
    navigate("/estimate/login");
    handleClose();
  };

  const handleLogout = () => {
    // Add logout logic here if needed
    navigate("/estimate/signup");
    handleClose();
  };

  return (
    <AppBar position="sticky" sx={{ ...glassBoxStyles }}>
      <Container
        maxWidth="xl"
        sx={{ padding: { xs: "0 4px 0 8px", md: "0 24px" } }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} onClick={handleHome} style={{ cursor: "pointer" }}>
              <Box
                component="img"
                sx={{ height: 38 }}
                alt="Glennon Fish Farms Logo"
                src="/logo.png"
              />
              <Box
                component="img"
                sx={{ height: 42, width: "auto", mt: 1 }}
                alt="Glennon Fish Farms"
                src="/Label.png"
              />
            </Box>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            //add background color for menu
            slotProps={{
              paper: {
                sx: {
                  mt: 6,
                  backgroundColor: "text.primary",
                  color: "#secondary.main",
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "primary.disabled",
                  },
                },
              },
            }}
          >
            <MenuItem onClick={handleLogin}>Login</MenuItem>
            <MenuItem onClick={handleLogout}>Sign Up</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
