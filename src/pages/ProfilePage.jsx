import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  InputAdornment,
  Divider,
  Alert,
  Snackbar,
  Skeleton,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Person,
  Email,
  Phone,
  Home,
  LocationCity,
  PinDrop,
  Public,
  Badge,
} from "@mui/icons-material";
import { menuItemSx, selectSx, textFieldSx } from "../theme/theme";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountries } from "../redux/Slices/domainSlice";

export function ProfilePage() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Get user data from store
  const storeUser = useSelector((state) => state.login.user);
  const countries = useSelector((state) => state.domain.countries || []);
  const countryCode = countries.find(c => c.name === storeUser?.countryName)?.code || "";

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // User data state
  const [userData, setUserData] = useState({
    id: "",
    userName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gmail: "",
    contactNumber: "",
    address: "",
    city: "",
    zipCode: "",
    countryName: "",
    stateName: "",
  });

  const [originalData, setOriginalData] = useState({});
  const [errors, setErrors] = useState({});

  // Fetch countries and user data on component mount
  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
    
    if (storeUser) {
      setUserData((prev) => ({ ...prev, ...storeUser }));
      setOriginalData((prev) => ({ ...prev, ...storeUser }));
    }
    setLoading(false);
  }, [storeUser, dispatch, countries.length]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "userName":
        if (!value.trim()) error = "Username is required";
        break;
      case "gmail":
        if (!value.trim()) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value))
          error = "Enter a valid email address";
        break;
      case "contactNumber":
        if (value && !/^\d{10,15}$/.test(value.replace(/\D/g, "")))
          error = "Enter a valid phone number (10-15 digits)";
        break;
      case "firstName":
        if (!value.trim()) error = "First name is required";
        break;
      case "lastName":
        if (!value.trim()) error = "Last name is required";
        break;
      case "address":
        if (!value.trim()) error = "Address is required";
        break;
      case "city":
        if (!value.trim()) error = "City is required";
        break;
      case "zipCode":
        if (!value.trim()) error = "ZIP code is required";
        else if (!/^\d{5,6}$/.test(value)) error = "Enter a valid ZIP code";
        break;
      case "countryName":
        if (!value.trim()) error = "Country is required";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    if (isEditing) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleEdit = () => {
    setOriginalData({ ...userData });
    setIsEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    setUserData({ ...originalData });
    setIsEditing(false);
    setErrors({});
  };

  const handleSave = async () => {
    // Validate all fields
    const newErrors = {};
    Object.keys(userData).forEach((key) => {
      if (key !== "id" && key !== "middleName" && key !== "stateName") {
        const error = validateField(key, userData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSnackbar({
        open: true,
        message: "Please fix validation errors",
        severity: "error",
      });
      return;
    }

    setSaving(true);
    try {
      // Simulate API call - replace with actual API endpoint
      // await axios.put("/api/user/profile", userData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setOriginalData({ ...userData });
      setIsEditing(false);
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error saving user data:", error);
      setSnackbar({
        open: true,
        message: "Failed to save profile",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Field configurations
  const personalFields = [
    {
      label: "Username",
      key: "userName",
      type: "text",
      placeholder: "Enter username",
      icon: <Person fontSize="small" sx={{ color: "#9CA3AF" }} />,
      required: true,
      gridSize: 6,
    },
    {
      label: "First Name",
      key: "firstName",
      type: "text",
      placeholder: "Enter first name",
      icon: <Person fontSize="small" sx={{ color: "#9CA3AF" }} />,
      required: true,
      gridSize: 6,
    },
    {
      label: "Middle Name",
      key: "middleName",
      type: "text",
      placeholder: "Enter middle name (optional)",
      icon: <Badge fontSize="small" sx={{ color: "#9CA3AF" }} />,
      required: false,
      gridSize: 6,
    },
    {
      label: "Last Name",
      key: "lastName",
      type: "text",
      placeholder: "Enter last name",
      icon: <Badge fontSize="small" sx={{ color: "#9CA3AF" }} />,
      required: true,
      gridSize: 6,
    },
  ];

  const contactFields = [
    {
      label: "Email Address",
      key: "gmail",
      type: "email",
      placeholder: "Enter email address",
      icon: <Email fontSize="small" sx={{ color: "#9CA3AF" }} />,
      required: true,
      gridSize: 6,
    },
    {
      label: "Contact Number",
      key: "contactNumber",
      type: "tel",
      placeholder: "Enter phone number",
      icon: <Phone fontSize="small" sx={{ color: "#9CA3AF" }} />,
      required: false,
      gridSize: 6,
    },
  ];

  const addressFields = [
    {
      label: "Address",
      key: "address",
      type: "text",
      placeholder: "Enter street address",
      icon: <Home fontSize="small" sx={{ color: "#9CA3AF" }} />,
      required: true,
      gridSize: 12,
    },
    {
      label: "City",
      key: "city",
      type: "text",
      placeholder: "Enter city",
      icon: <LocationCity fontSize="small" sx={{ color: "#9CA3AF" }} />,
      required: true,
      gridSize: 6,
    },
    {
      label: "State",
      key: "stateName",
      type: "text",
      placeholder: "Enter state (optional)",
      icon: <LocationCity fontSize="small" sx={{ color: "#9CA3AF" }} />,
      required: false,
      gridSize: 6,
    },
    {
      label: "ZIP Code",
      key: "zipCode",
      type: "text",
      placeholder: "Enter ZIP code",
      icon: <PinDrop fontSize="small" sx={{ color: "#9CA3AF" }} />,
      required: true,
      gridSize: 6,
    },
    {
      label: "Country",
      key: "countryName",
      type: "select",
      placeholder: "Enter country",
      icon: <Public fontSize="small" sx={{ color: "#9CA3AF" }} />,
      required: true,
      gridSize: 6,
    },
  ];

  const getInitials = () => {
    const first = userData.firstName?.[0] || "";
    const last = userData.lastName?.[0] || "";
    return (first + last).toUpperCase();
  };

  const getCountryName = (code) => {
    if (!code || !countries.length) return code;
    const country = countries.find((c) => c.code === code);
    return country?.name || code;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" fontWeight={700} sx={{ color: "#537D96" }}>
            My Profile
          </Typography>
          {!isEditing && (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={handleEdit}
              sx={{
                background: "linear-gradient(to right, #44A194, #537D96)",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": {
                  background: "linear-gradient(to right, #44A194, #537D96)",
                  transform: "scale(1.02)",
                },
              }}
            >
              Edit Profile
            </Button>
          )}
          {isEditing && (
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={handleCancel}
              disabled={saving}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                borderColor: "#EC8F8D",
                color: "#EC8F8D",
                "&:hover": {
                  borderColor: "#EC8F8D",
                  bgcolor: "rgba(236, 143, 141, 0.1)",
                },
              }}
            >
              Cancel
            </Button>
          )}
        </Box>

        {/* Profile Card */}
        <Paper
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
            bgcolor: isEditing ? "transparent" : "#00000030",
          }}
        >
          {/* Cover Section */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #44A194 0%, #537D96 100%)",
              p: 4,
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "rgba(255,255,255,0.2)",
                  fontSize: 40,
                  fontWeight: 600,
                  border: "4px solid white",
                }}
              >
                {loading && (
                  <Skeleton variant="circular" width={100} height={100} />
                )}
                {!loading && (
                  <Person
                    fontSize="large"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  />
                )}
              </Avatar>
              <Box>
                {loading ? (
                  <>
                    <Skeleton variant="text" width={200} height={40} />
                    <Skeleton variant="text" width={150} height={24} />
                  </>
                ) : (
                  <>
                    <Typography variant="h4" fontWeight={600} color="white">
                      {userData.firstName} {userData.lastName}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgba(255,255,255,0.9)" }}
                    >
                      @{userData.userName}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>

          {/* Profile Content */}
          <Box sx={{ p: 4 }}>
            {loading ? (
              // Loading skeleton
              <>
                <Skeleton
                  variant="text"
                  width={200}
                  height={32}
                  sx={{ mb: 2 }}
                />
                <Grid container spacing={3}>
                  {[...Array(8)].map((_, i) => (
                    <Grid key={i} size={{ xs: 12, sm: 6 }}>
                      <Skeleton variant="rounded" height={80} />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <>
                {/* Personal Information Section */}
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    color: "#537D96",
                    mb: 2,
                    borderLeft: "4px solid #44A194",
                    pl: 1,
                  }}
                >
                  Personal Information
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {personalFields.map(
                    ({ key, type, placeholder, icon, required, gridSize }) => (
                      <Grid key={key} size={{ xs: 12, sm: gridSize }}>
                        <TextField
                          name={key}
                          type={type}
                          variant={isEditing ? "outlined" : "standard"}
                          placeholder={placeholder}
                          value={userData[key] || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                          required={required}
                          error={!!errors[key]}
                          helperText={errors[key]}
                          fullWidth
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  {icon}
                                </InputAdornment>
                              ),
                            },
                          }}
                          sx={textFieldSx}
                        />
                      </Grid>
                    ),
                  )}
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Contact Information Section */}
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    color: "#537D96",
                    mb: 2,
                    borderLeft: "4px solid #44A194",
                    pl: 1,
                  }}
                >
                  Contact Information
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {contactFields.map(
                    ({ key, type, placeholder, icon, required, gridSize }) => (
                      <Grid key={key} size={{ xs: 12, sm: gridSize }}>
                        <TextField
                          name={key}
                          type={type}
                          variant={isEditing ? "outlined" : "standard"}
                          placeholder={placeholder}
                          value={userData[key] || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                          required={required}
                          error={!!errors[key]}
                          helperText={errors[key]}
                          fullWidth
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  {icon}
                                </InputAdornment>
                              ),
                            },
                          }}
                          sx={textFieldSx}
                        />
                      </Grid>
                    ),
                  )}
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Address Information Section */}
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    color: "#537D96",
                    mb: 2,
                    borderLeft: "4px solid #44A194",
                    pl: 1,
                  }}
                >
                  Address Information
                </Typography>
                <Grid container spacing={3}>
                  {addressFields.map(
                    ({ key, type, placeholder, icon, required, gridSize }) => (
                      <Grid key={key} size={{ xs: 12, sm: gridSize }}>
                        {type === "select" ? (
                          <FormControl
                            fullWidth
                            error={!!errors[key]}
                            sx={textFieldSx}
                          >
                            <Select
                              name={key}
                              value={countryCode || ""}
                              disabled={!isEditing}
                              onChange={handleChange}
                              placeholder={placeholder}
                              required={required}
                              displayEmpty
                              renderValue={(selected) => {
                                if (!selected) return "select your country";
                                return getCountryName(selected);
                              }}
                              sx={{
                                ...selectSx,
                                "& .MuiSelect-select": {
                                  color: userData[key]
                                    ? "text.primary"
                                    : "text.disabled",
                                  paddingLeft: "8px",
                                },
                              }}
                            >
                              <MenuItem
                                disabled
                                sx={{ ...menuItemSx }}
                                value=""
                              >
                                select your country
                              </MenuItem>
                              {countries.map((option) => (
                                <MenuItem
                                  sx={{ ...menuItemSx }}
                                  key={option.code}
                                  value={option.code}
                                >
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors[key] && (
                              <Typography
                                variant="caption"
                                color="error"
                                sx={{ mt: 0.5, ml: 1 }}
                              >
                                {errors[key]}
                              </Typography>
                            )}
                          </FormControl>
                        ) : (
                          <TextField
                            name={key}
                            type={type}
                            disabled={!isEditing}
                            variant={isEditing ? "outlined" : "standard"}
                            placeholder={placeholder}
                            value={userData[key]}
                            onChange={handleChange}
                            required={required}
                            error={!!errors[key]}
                            helperText={errors[key]}
                            fullWidth
                            slotProps={{
                              input: {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {icon}
                                  </InputAdornment>
                                ),
                              },
                            }}
                            sx={textFieldSx}
                          />
                        )}
                      </Grid>
                    ),
                  )}
                </Grid>

                {/* Action Buttons for Edit Mode */}
                {isEditing && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "flex-end",
                      mt: 4,
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      disabled={saving}
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        borderColor: "#EC8F8D",
                        color: "#EC8F8D",
                        "&:hover": {
                          borderColor: "#EC8F8D",
                          bgcolor: "rgba(236, 143, 141, 0.1)",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={saving ? <span>...</span> : <Save />}
                      onClick={handleSave}
                      disabled={saving}
                      sx={{
                        background:
                          "linear-gradient(to right, #44A194, #537D96)",
                        textTransform: "none",
                        borderRadius: 2,
                        "&:hover": {
                          background:
                            "linear-gradient(to right, #44A194, #537D96)",
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
