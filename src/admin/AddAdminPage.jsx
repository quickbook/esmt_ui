import { useState } from "react";
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
} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import { Waves, User, Mail, Phone, Lock, MapPin, Badge } from "lucide-react";
import { textFieldSx } from "../theme/theme";

export default function AddAdminPage() {
  const navigate = useNavigate();
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

    // Check password match? Not in the spec but good UX
    // The spec didn't include confirmPassword, so we'll skip that check

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
      countryName: formData.countryName,
    };

    console.log("Signup payload:", payload);
    // Navigate to customer info page after signup
    navigate("/estimate/customer-info");
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
    { label: "Country", key: "countryName", type: "text", placeholder: "Enter country", icon: <PublicIcon size={20} color="#9CA3AF" />, required: true },
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
              Create Admin Account
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
              {accountFields.map(({ label, key, type, placeholder, icon, required }) => (
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
              {addressFields.map(({ label, key, type, placeholder, icon, required }) => (
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
              }}
            >
              Create Account
            </Button></Box>
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
    </Box>
  );
}