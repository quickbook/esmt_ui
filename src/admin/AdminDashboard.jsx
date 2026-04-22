import React, { use, useEffect, useRef, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Alert,
  Snackbar,
  Portal,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import MasterListPage from "./MasterListPage";
import AddAdminPage from "./AddAdminPage";
import LoadingScreen from "../components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { getMasterList } from "../redux/Slices/adminSlice";

const drawerWidth = 240;

const adminTabs = [
  { label: "Master List", value: "master" },
  //{ label: "Fish Ponds", value: "ponds" },
  { label: "Add Admin", value: "admin-signup" },
];

// ================= DASHBOARD =================
export default function AdminDashboard() {
  const dispatch = useDispatch();
  const roleName = useSelector((state) => state.login.user?.roleName);
  const masterListFromStore = useSelector((state) => state.admin.masterList);
  const isLoading = useSelector((state) => state.admin.loading);
  const [tab, setTab] = useState("master");
  const [masterListData, setMasterListData] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getMasterListRef = useRef(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setMasterListData(masterListFromStore);
  }, [masterListFromStore, dispatch]);

  const drawerContent = (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ background: "primary.main" }}
      >
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <List sx={{ cursor: "pointer" }}>
        {adminTabs.map((item) => (
          <ListItem
            key={item.value}
            onClick={() => {
              setTab(item.value);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              display:
                item.value === "admin-signup"
                  ? roleName === "ROOT"
                    ? "flex"
                    : "none"
                  : "flex",
              mb: 1,
              background: tab === item.value ? "#44A19460" : "transparent",
              "&:hover": {
                background: tab === item ? "#44A19440" : "#44A19420",
                "& .MuiListItemText-primary": {
                  color: "#ffffff",
                },
              },
              "& .MuiListItemText-primary": {
                color:
                  tab === item.value ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </>
  );

  useEffect(() => {
    if (!getMasterListRef.current) {
      getMasterListRef.current = true;
      dispatch(getMasterList());
    }
  }, [dispatch]);

  useEffect(() => {
    if (masterListFromStore && masterListFromStore.length > 0) {
      setMasterListData(masterListFromStore);
    }
  }, [masterListFromStore]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            marginTop: isMobile ? 0 : "74px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(2px)",
            borderRight: "none",
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 1, sm: 2, md: 3 },
          py: 1,
          width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{ background: "primary.main" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xs: "flex", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="text.primary">
              {adminTabs.find((t) => t.value === tab)?.label}
            </Typography>
          </Toolbar>
        </AppBar>

        {tab === "master" && (
          <MasterListPage
            masterListData={masterListData}
            setMasterListData={setMasterListData}
            setSnackbar={setSnackbar}
          />
        )}
        {tab === "admin-signup" && <AddAdminPage setSnackbar={setSnackbar} />}
      </Box>
      <Portal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar></Portal>
    </Box>
  );
}
