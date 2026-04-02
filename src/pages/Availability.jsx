import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Grid,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useEstimateForm } from "../contexts/EstimateFormContext";

export function Availability() {
  const navigate = useNavigate();
  const { data, updateSection } = useEstimateForm();
  const { availableDate, availableTime } = data.availability;

  // State for validation errors
  const [errors, setErrors] = useState({
    availableDate: false,
    availableTime: false,
  });
  
  // State to track if validation has been attempted
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleChange = (field, value) => {
    updateSection("availability", { [field]: value });
    // Clear error for this field when user makes a change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {
      availableDate: !availableDate,
      availableTime: !availableTime,
    };
    
    // Additional date validation (must be within 24-72 hours)
    if (availableDate && !isValidDateRange(availableDate)) {
      newErrors.availableDate = true;
    }
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error === true);
  };

  // Check if date is within 24-72 hours from now
  const isValidDateRange = (dateString) => {
    const selectedDate = new Date(dateString);
    const now = new Date();
    
    // Set time to midnight for date comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selected = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    
    const diffDays = Math.ceil((selected - today) / (1000 * 60 * 60 * 24));
    
    // Check if date is within 1-3 days (24-72 hours)
    return diffDays >= 1 && diffDays <= 3;
  };

  // Helper function to get error message
  const getErrorMessage = (field) => {
    if (!validationAttempted && !errors[field]) return "";
    
    switch(field) {
      case "availableDate":
        if (!availableDate) return "Preferred contact date is required";
        if (!isValidDateRange(availableDate)) {
          return "Please select a date within 24-72 hours (1-3 days from today)";
        }
        return "";
      case "availableTime":
        if (!availableTime) return "Preferred contact time is required";
        return "";
      default:
        return "";
    }
  };

  // Get minimum date (tomorrow) and maximum date (3 days from now)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 4);
    return maxDate.toISOString().split('T')[0];
  };

  const handleNext = () => {
    setValidationAttempted(true);
    
    if (validateForm()) {
      navigate("/estimate/quote");
    } else {
      // Show snackbar for first error encountered
      const firstError = Object.keys(errors).find(key => errors[key]);
      if (firstError) {
        setSnackMessage(getErrorMessage(firstError));
        setSnackOpen(true);
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ minHeight: "84vh", padding: { xs: "1rem 0", md: 2 } }}>
      <Container>
        <Paper
          sx={{
            padding: { xs: 2, md: "2rem" },
            borderRadius: 3,
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          }}
        >
          <Box textAlign="center" mb={2}>
            {/* Page Counter */}
            <Typography
              sx={{
                fontSize: "0.875rem",
                textAlign: "center",
                fontWeight: 600,
                color: "primary.contrastText",
              }}
            >
              Page 4 / 5
            </Typography>
            {/* Label */}
            <Typography
              sx={{
                mt: 1,
                fontSize: "0.875rem",
                textAlign: "center",
                color: "primary.light",
                fontWeight: 500,
              }}
            >
              Availability
            </Typography>
          </Box>
          {/* Progress */}
          <LinearProgress
            variant="determinate"
            value={80}
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

          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary.contrastText"
            mb={1}
          >
            Schedule Your Availability
          </Typography>

          <Typography color="text.disabled" mb={4}>
            Please provide a convenient date and time when our team can contact
            you to discuss your pond stocking estimate.
          </Typography>

          <Grid
            container
            spacing={2}
            rowGap={4}
            sx={{ flex: 1, overflow: "hidden" }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              {/* Date Field */}
              <Box>
                <Typography
                  fontSize={14}
                  fontWeight={500}
                  color="primary.light"
                  mb={1}
                >
                  Preferred Contact Date <span style={{ color: "#f44336" }}>*</span>
                </Typography>

                <TextField
                  type="date"
                  fullWidth
                  size="medium"
                  value={availableDate}
                  onChange={(e) => handleChange("availableDate", e.target.value)}
                  error={errors.availableDate && validationAttempted}
                  helperText={getErrorMessage("availableDate")}
                  inputProps={{
                    min: getMinDate(),
                    max: getMaxDate(),
                  }}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "primary.dark",
                      fontWeight: 600,
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ mt: 1, display: "block", color: "text.secondary" }}
                >
                  Please select a date within 24-72 hours (1-3 days from today)
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* Time Field */}
              <Box>
                <Typography
                  fontSize={14}
                  fontWeight={500}
                  color="primary.light"
                  mb={1}
                >
                  Preferred Contact Time <span style={{ color: "#f44336" }}>*</span>
                </Typography>

                <TextField
                  type="time"
                  fullWidth
                  size="medium"
                  value={availableTime}
                  onChange={(e) => handleChange("availableTime", e.target.value)}
                  error={errors.availableTime && validationAttempted}
                  helperText={getErrorMessage("availableTime")}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "primary.dark",
                      fontWeight: 600,
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              {/* Note */}
              <Box
                sx={{
                  border: "1px solid #dcdcdc",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              >
                <Typography fontSize={14} color="text.secondary">
                  <strong>Note:</strong> Please select an availability window
                  within the next <strong>24–72 hours</strong>. This helps our
                  team contact you promptly and provide timely assistance with
                  your pond stocking estimate.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button
              variant="contained"
              startIcon={<ArrowLeftIcon />}
              onClick={handleBack}
              sx={{
                backgroundColor: "text.secondary",
                color: "secondary.main",
                "&:hover": { backgroundColor: "text.primary" },
              }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              endIcon={<ArrowRightIcon />}
              onClick={handleNext}
              sx={{
                backgroundColor: "#44A194",
                "&:hover": { backgroundColor: "#537D96" },
              }}
            >
              <Typography
                variant="p"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                Continue to Quote
              </Typography>
              <Typography
                variant="p"
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                Continue
              </Typography>
            </Button>
          </Box>
          
          <Snackbar
            open={snackOpen}
            autoHideDuration={3000}
            onClose={() => setSnackOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              severity="warning"
              variant="filled"
              sx={{ width: "100%" }}
              onClose={() => setSnackOpen(false)}
            >
              {snackMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </Box>
  );
}