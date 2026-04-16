import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Button,
  Link,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import { Waves, User, Mail, Phone, Lock, MapPin, Badge } from "lucide-react";
import { menuItemSx, selectSx, textFieldSx } from "../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/Slices/signUpSlice";
import { fetchCountries } from "../redux/Slices/domainSlice";

export function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    // User account fields
    userName: "",
    gmail: "",
    password: "",
    contactNumber: "",
    // Customer info fields
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    countryName: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const { status, error } = useSelector((state) => state.signUp);
  const countries = useSelector((state) => state.domain.countries || []);
  const isLoading = status === 'loading';

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries.length]);

  useEffect(() => {
    if (status === 'succeeded') {
      setSnackbar({ open: true, message: "Account created successfully!", severity: "success" });
      setTimeout(() => {
        navigate("/estimate/customer-info");
      }, 2000);
    } else if (status === 'failed') {
      setSnackbar({ open: true, message: error || "Signup failed", severity: "error" });
    }
  }, [status, error, navigate]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "userName":
        if (!value.trim()) error = "Username is required";
        break;
      case "gmail":
        if (!value.trim()) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Enter a valid email address";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "contactNumber":
        if (!value.trim()) error = "Contact number is required";
        else if (!/^\d{10,15}$/.test(value.replace(/\D/g, ''))) error = "Enter a valid phone number";
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
        break;
      case "stateName":
        // State is optional, so no validation error
        if (!value.trim()) error = "State name cannot be empty if provided";
        break;
      case "countryName":
        if (!value.trim()) error = "Country Name is required";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare payload matching required structure
    const payload = {
      gmail: formData.gmail,
      userName: formData.userName,
      password: formData.password,
      contactNumber: formData.contactNumber,
      lastName: formData.lastName,
      zipCode: formData.zipCode,
      firstName: formData.firstName,
      address: formData.address,
      city: formData.city,
      stateName: formData.stateName,
      countryName: formData.countryName,
    };

    dispatch(signUpUser(payload));
  };

  // Field configurations - split into two groups for better organization
  const accountFields = [
    { label: "Username", key: "userName", type: "text", placeholder: "Enter your username", icon: <User size={20} color="#9CA3AF" />, required: true },
    { label: "Email Address", key: "gmail", type: "email", placeholder: "Enter your email", icon: <Mail size={20} color="#9CA3AF" />, required: true },
    { label: "Password", key: "password", type: "password", placeholder: "Create a password", icon: <Lock size={20} color="#9CA3AF" />, required: true },
    { label: "Contact Number", key: "contactNumber", type: "tel", placeholder: "Enter your phone number", icon: <Phone size={20} color="#9CA3AF" />, required: true },
  ];

  const addressFields = [
    { label: "First Name", key: "firstName", type: "text", placeholder: "Enter first name", icon: <PersonIcon size={20} color="#9CA3AF" />, required: true },
    { label: "Last Name", key: "lastName", type: "text", placeholder: "Enter last name", icon: <Badge size={20} color="#9CA3AF" />, required: true },
    { label: "Address", key: "address", type: "text", placeholder: "Enter street address", icon: <MapPin size={20} color="#9CA3AF" />, required: true },
    { label: "City", key: "city", type: "text", placeholder: "Enter city", icon: <LocationCityIcon size={20} color="#9CA3AF" />, required: true },
    { label: "ZIP Code", key: "zipCode", type: "text", placeholder: "Enter ZIP code", icon: <MapPin size={20} color="#9CA3AF" />, required: true },
    { label: "State Name", key: "stateName", type: "text", placeholder: "Enter state name", icon: <LocationCityIcon size={20} color="#9CA3AF" />, required: false },
    { label: "Country", key: "countryName", type: "select", placeholder: "Select country", icon: <PublicIcon size={20} color="#9CA3AF" />, required: true, options: countries },
  ];

  return (
    <Box
      sx={{
        minHeight: "84vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900 }}> {/* Wider container for desktop */}
        <Paper
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(to right, #44A194, #537D96)",
              p: 2,
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  p: 2,
                  borderRadius: "50%",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                }}
              >
                <Waves size={24} />
              </Box>
            </Box>
            <Typography
              variant="h4"
              fontWeight={700}
              textAlign="center"
              mb={0.5}
            >
              Create Account
            </Typography>
            <Typography
              textAlign="center"
              sx={{ color: "rgba(255,255,255,0.9)", fontSize: "0.875rem" }}
            >
              Your Professional Pond Service
            </Typography>
          </Box>

          {/* Signup Form */}
          <Box component="form" onSubmit={handleSignup} sx={{ p: 4 }}>
            {/* Account Information Section */}
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: "#537D96", mb: 2, borderLeft: "4px solid #44A194", pl: 1 }}
            >
              Account Information
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {accountFields.map(({ key, type, placeholder, icon, required }) => (
                <Grid key={key} size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name={key}
                    type={type}
                    placeholder={placeholder}
                    value={formData[key]}
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
                </Grid>
              ))}
            </Grid>

            {/* Personal Information Section */}
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: "#537D96", mb: 2, borderLeft: "4px solid #44A194", pl: 1, mt: 1 }}
            >
              Personal Information
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {addressFields.map(({key, type, placeholder, icon, required, options }) => (
                <Grid key={key} size={{ xs: 12, sm: 6 }}>
                  {type === "select" ? (
                    <FormControl fullWidth error={!!errors[key]} sx={textFieldSx}>
                      <Select
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required={required}
                        displayEmpty
                        sx={{...selectSx, 
                          //selected item color
                          "& .MuiSelect-select": {
                            color: formData[key] ? "text.primary" : "text.disabled",
                          },
                        }}
                        startAdornment={
                          <InputAdornment position="start">
                            {icon}
                          </InputAdornment>
                        }
                      >
                        <MenuItem disabled sx={{...menuItemSx}} value="">select your country</MenuItem>
                        {options.map((option) => (
                          <MenuItem sx={{...menuItemSx}} key={option.code} value={option.code}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors[key] && <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>{errors[key]}</Typography>}
                    </FormControl>
                  ) : (
                    <TextField
                      name={key}
                      type={type}
                      placeholder={placeholder}
                      value={formData[key]}
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
              ))}
            </Grid>

            {/* Terms Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  required
                  size="small"
                  sx={{
                    color: "grey.400",
                    alignSelf: "flex-start",
                    pt: 0,
                    "&.Mui-checked": { color: "#44A194" },
                  }}
                />
              }
              label={
                <Typography variant="body2" color="text.disabled">
                  I agree to the{" "}
                  <Link
                    href="#"
                    underline="hover"
                    sx={{
                      color: "#44A194",
                      "&:hover": { color: "#EC8F8D" },
                      transition: "color 0.2s",
                    }}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    underline="hover"
                    sx={{
                      color: "#44A194",
                      "&:hover": { color: "#EC8F8D" },
                      transition: "color 0.2s",
                    }}
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ alignItems: "flex-start", mx: 0, mb: 2 }}
            />

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                width: {md:"60%"},
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: "1rem",
                background: "linear-gradient(to right, #44A194, #537D96)",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  background: "linear-gradient(to right, #44A194, #537D96)",
                  boxShadow: "0 8px 24px rgba(68,161,148,0.4)",
                  transform: "scale(1.02)",
                },
                transition: "all 0.2s",
                "&:disabled": {
                  opacity: 0.6,
                  cursor: "not-allowed",
                },
              }}
            >
              {isLoading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  <span>Creating Account...</span>
                </Box>
              ) : (
                "Create Account"
              )}
            </Button></Box>

            {/* Sign in link */}
            <Typography
              variant="body2"
              textAlign="center"
              color="text.disabled"
              mt={3}
            >
              Already have an account?{" "}
              <Link
                onClick={() => navigate("/estimate/login")}
                underline="hover"
                fontWeight={600}
                sx={{
                  color: "#44A194",
                  "&:hover": { color: "#EC8F8D" },
                  transition: "color 0.2s",
                  cursor: "pointer",
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>

        {/* Footer */}
        <Typography
          variant="body2"
          textAlign="center"
          color="text.disabled"
          mt={4}
        >
          © 2026 Fish Guru. All rights reserved.
        </Typography>
      </Box>
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
      </Snackbar>
    </Box>
  );
}