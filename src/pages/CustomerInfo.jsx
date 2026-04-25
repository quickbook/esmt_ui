import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Select,
  MenuItem,
  Grid,
  FormHelperText,
} from "@mui/material";
import { glassBoxStyles } from "../utils/glassStyles";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import { useNavigate } from "react-router-dom";
import { menuItemSx, selectSx, textFieldSx } from "../theme/theme";
import { motion } from "framer-motion";
import { useEstimateForm } from "../contexts/EstimateFormContext";
import { useSelector } from "react-redux";

export function CustomerInfo() {
  const navigate = useNavigate();
  const leadSource = useSelector((state) => state.domain.leadSources);
  const { data, updateSection, reset } = useEstimateForm();
  const formData = data.customer;

  // State for validation errors
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    phone: false,
    quoteEmail: false,
    address: false,
    hearAbout: false,
  });

  // State to track if validation has been attempted
  const [validationAttempted, setValidationAttempted] = useState(false);

  const handleChange = (field, value) => {
    updateSection("customer", { [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {
      fullName: !formData.fullName?.trim(),
      email: !formData.email?.trim() || !isValidEmail(formData.email),
      phone: !formData.phone?.trim(),
      quoteEmail:
        !formData.quoteEmail?.trim() || !isValidEmail(formData.quoteEmail),
      address: !formData.address?.trim(),
      hearAbout: !formData.hearAbout,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error === true);
  };

  // Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleNext = () => {
    setValidationAttempted(true);

    if (validateForm()) {
      console.log("FORM DATA:", formData);
      navigate("/estimate/pond-info");
    }
  };

  const handleResetPage = () => {
    updateSection("customer", {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      quoteEmail: "",
      hearAbout: "",
    });
    setErrors({
      fullName: false,
      email: false,
      phone: false,
      quoteEmail: false,
      address: false,
      hearAbout: false,
    });
    setValidationAttempted(false);
  };

  const handleResetAll = () => {
    reset();
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper function to get error message
  const getErrorMessage = (field, value) => {
    if (!validationAttempted && !errors[field]) return "";

    switch (field) {
      case "fullName":
        return !formData.fullName?.trim() ? "Full name is required" : "";
      case "email":
        if (!formData.email?.trim()) return "Email address is required";
        if (!isValidEmail(formData.email))
          return "Please enter a valid email address";
        return "";
      case "phone":
        return !formData.phone?.trim() ? "Phone number is required" : "";
      case "quoteEmail":
        if (!formData.quoteEmail?.trim()) return "Quote email is required";
        if (!isValidEmail(formData.quoteEmail))
          return "Please enter a valid email address";
        return "";
      case "address":
        return !formData.address?.trim() ? "Physical address is required" : "";
      case "hearAbout":
        return !formData.hearAbout
          ? "Please select how you heard about us"
          : "";
      default:
        return "";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "84vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: 2,
      }}
    >
      <Container
        sx={{
          ...glassBoxStyles,
          padding: { xs: 2, sm: " 1rem 2rem" },
          mx: { xs: 1, md: 0 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            type: "tween",
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Header */}
          <Box textAlign="center" mb={2}>
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "primary.contrastText",
              }}
            >
              Page 1 / 5
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: "0.875rem",
                color: "primary.light",
                fontWeight: 500,
              }}
            >
              Customer Information
            </Typography>
          </Box>

          {/* Progress */}
          <LinearProgress
            variant="determinate"
            value={20}
            sx={{
              mb: 2,
              height: 6,
              borderRadius: 4,
              backgroundColor: "#e5e7eb",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#44A194",
              },
            }}
          />

          <Grid
            container
            spacing={3}
            rowGap={0}
            sx={{ flex: 1, overflow: "hidden" }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              {/* Full Name */}
              <Box mb={1}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary.contrastText"
                  mb={1}
                >
                  What is your name? <span style={{ color: "#f44336" }}>*</span>
                </Typography>
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  error={errors.fullName && validationAttempted}
                  helperText={getErrorMessage("fullName")}
                  sx={{ mb: 3, ...textFieldSx }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* Email */}
              <Box mb={1}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary.contrastText"
                  mb={1}
                >
                  What is your mailing address?{" "}
                  <span style={{ color: "#f44336" }}>*</span>
                </Typography>
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="Enter your email address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email && validationAttempted}
                  helperText={getErrorMessage("email")}
                  sx={{ mb: 3, ...textFieldSx }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* Phone */}
              <Box mb={1}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary.contrastText"
                  mb={1}
                >
                  What is your phone number?{" "}
                  <span style={{ color: "#f44336" }}>*</span>
                </Typography>
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="Enter your phone number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  error={errors.phone && validationAttempted}
                  helperText={getErrorMessage("phone")}
                  sx={{ mb: 3, ...textFieldSx }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* Quote Email */}
              <Box mb={1}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary.contrastText"
                  mb={1}
                >
                  What is an email address I can send a written quote to?{" "}
                  <span style={{ color: "#f44336" }}>*</span>
                </Typography>
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="Enter your working email address"
                  type="email"
                  value={formData.quoteEmail}
                  onChange={(e) => handleChange("quoteEmail", e.target.value)}
                  error={errors.quoteEmail && validationAttempted}
                  helperText={getErrorMessage("quoteEmail")}
                  sx={{ mb: 3, ...textFieldSx }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* Address */}
              <Box mb={1}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary.contrastText"
                  mb={1}
                >
                  Where is the physical address of the pond?{" "}
                  <span style={{ color: "#f44336" }}>*</span>
                </Typography>
                <TextField
                  required
                  fullWidth
                  size="small"
                  placeholder="Enter your physical address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  error={errors.address && validationAttempted}
                  helperText={getErrorMessage("address")}
                  sx={{ mb: 3, ...textFieldSx }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* Hear About */}
              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary.contrastText"
                mb={1}
              >
                How did you hear about us?{" "}
                <span style={{ color: "#f44336" }}>*</span>
              </Typography>
              <Select
                fullWidth
                size="small"
                value={formData.hearAbout}
                onChange={(e) => handleChange("hearAbout", e.target.value)}
                displayEmpty
                error={errors.hearAbout && validationAttempted}
                sx={{ ...selectSx }}
              >
                <MenuItem disabled value="" sx={{ ...menuItemSx }}>
                  Select option
                </MenuItem>
                {leadSource.map((option, index) => (
                  <MenuItem
                    key={index}
                    value={option.id}
                    sx={{ ...menuItemSx }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.hearAbout && validationAttempted && (
                <FormHelperText error>
                  {getErrorMessage("hearAbout")}
                </FormHelperText>
              )}
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <Box display="flex" justifyContent="space-between">
              <Button
                onClick={handleBack}
                sx={{
                  backgroundColor: "text.secondary",
                  color: "secondary.main",
                  "&:hover": { backgroundColor: "text.primary" },
                }}
              >
                <ArrowLeftIcon /> Back
              </Button>

              {/* <Box display="flex" justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleResetPage}
                  sx={{
                    minWidth: "120px",
                  }}
                >
                  Reset Page
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={handleResetAll}
                  sx={{
                    minWidth: "120px",
                  }}
                >
                  Reset All
                </Button>
              </Box> */}

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  background: "#44A194",
                  "&:hover": { background: "#537D96" },
                }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
