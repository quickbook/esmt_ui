import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { glassBoxStyles } from "../utils/glassStyles";
import { useEstimateForm } from "../contexts/EstimateFormContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/Slices/loginSlice";

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { reset } = useEstimateForm();
  const dispatch = useDispatch(); // ✅ Add dispatch
  const user = useSelector((state) => state.login.user);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const roleName = useSelector((state) => state.login.roleName);

  const navigate = useNavigate();

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleHome = () => {
    navigate("/");
    reset();
    handleClose();
  };

  const handleLogin = () => {
    navigate("/estimate/login");
    handleClose();
  };

  const handleSignup = () => {
    navigate("/estimate/signup");
    handleClose();
  };

  const handleProfile = () => {
    navigate("/estimate/profile");
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout()); // ✅ Properly dispatch the logout action
    navigate("/");
    handleClose();
  };

  const handleAdmin = () => {
    navigate("/estimate/admin");
    handleClose();
  };

  return (
    <AppBar position="sticky" sx={{ ...glassBoxStyles }}>
      <Container
        maxWidth="xl"
        sx={{ padding: { xs: "0 4px 0 8px", md: "0 24px" } }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            onClick={handleHome}
            style={{ cursor: "pointer" }}
          >
            <Box
              component="img"
              sx={{ height: { xs: 24, md: 38 } }}
              alt="Glennon Fish Farms Logo"
              src="/logo.png"
            />
            <Box
              component="img"
              sx={{ height: { xs: 34, md: 42 }, width: "auto", mt: 1 }}
              alt="Glennon Fish Farms"
              src="/Label.png"
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* ✅ Show username when logged in */}
          {isLoggedIn && user?.userName && (
            <Typography
              variant="body2"
              sx={{
                mr: 1,
                color: "inherit",
                fontWeight: 500,
                display: { xs: "none", sm: "block" }, // hide on very small screens
              }}
            >
              {user.userName}
            </Typography>
          )}

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
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            slotProps={{
              paper: {
                sx: {
                  mt: 6,
                  minWidth: 180,
                  backgroundColor: "text.primary",
                  color: "secondary.main",
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "primary.disabled",
                  },
                  // Style the icons to inherit the menu text color
                  "& .MuiListItemIcon-root": {
                    color: "inherit",
                    minWidth: 36,
                  },
                },
              },
            }}
          >
            {isLoggedIn ? (
              <div>
                <MenuItem onClick={handleProfile}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>

                {(roleName === "ROOT" ||roleName === "ADMIN") && (
                  <MenuItem onClick={handleAdmin}>
                    <ListItemIcon>
                      <AdminPanelSettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Admin</ListItemText>
                  </MenuItem>
                )}

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem onClick={handleLogin}>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleSignup}>
                  <ListItemIcon>
                    <PersonAddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Sign Up</ListItemText>
                </MenuItem>
              </div>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
