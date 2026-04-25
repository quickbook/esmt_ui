import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  LinearProgress,
  InputAdornment,
  Radio,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
  Grid,
  FormHelperText,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { glassBoxStyles } from "../utils/glassStyles";
import { menuItemSx, selectSx, textFieldSx } from "../theme/theme";
import { useEstimateForm } from "../contexts/EstimateFormContext";
import { useSelector, useDispatch } from "react-redux";
import { postEstimate } from "../api/endpoints/pondEstimateApi";

export function PondInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pondAccessOptions = useSelector((state) => state.domain.pondAccess);
  const fishTypes = useSelector((state) => state.domain.fishSpecies);
  const pondTypeOptions = useSelector((state) => state.domain.pondOptions);
  const leadSources = useSelector((state) => state.domain.leadSources);
  const quoteLoading = useSelector((state) => state.pondEstimate.loading);
  const { data, updateSection, reset } = useEstimateForm();
  const {
    pondSize,
    distance,
    pondAccess,
    pondType,
    hasFish,
    selectedFish,
    selectedOption,
  } = data.pondInfo;

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({
    pondSize: false,
    distance: false,
    pondAccess: false,
    pondType: false,
    hasFish: false,
    selectedFish: false,
    selectedOption: false,
  });

  // State to track if validation has been attempted
  const [validationAttempted, setValidationAttempted] = useState(false);

  const getOptions = () => {
    if (pondType === "new") return [...(pondTypeOptions?.NEW || [])];
    if (pondType === "old") return [...(pondTypeOptions?.OLD || [])];
    return [];
  };

  const handleChange = (field, value) => {
    updateSection("pondInfo", { [field]: value });
    // Clear error for this field when user makes a change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {
      pondSize: !pondSize || pondSize <= 0,
      distance: !distance || distance <= 0,
      pondAccess: !pondAccess,
      pondType: !pondType,
      hasFish: pondType === "old" ? !hasFish : false,
      selectedFish:
        pondType === "old" && hasFish === "yes"
          ? selectedFish.length === 0
          : false,
      selectedOption:
        pondType === "new" || (pondType === "old" && hasFish)
          ? !selectedOption
          : false,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error === true);
  };

  // Helper function to get error message
  const getErrorMessage = (field) => {
    if (!validationAttempted && !errors[field]) return "";

    switch (field) {
      case "pondSize":
        if (!pondSize) return "Pond size is required";
        if (pondSize <= 0)
          return "Please enter a valid pond size greater than 0";
        return "";
      case "distance":
        if (!distance) return "Distance is required";
        if (distance <= 0)
          return "Please enter a valid distance greater than 0";
        return "";
      case "pondAccess":
        return "Please select pond access type";
      case "pondType":
        return "Please select if this is a new or old pond";
      case "hasFish":
        return "Please select if there are fish in the pond";
      case "selectedFish":
        return "Please select at least one fish species";
      case "selectedOption":
        return "Please select your interest";
      default:
        return "";
    }
  };

  const handleBack = () => {
    navigate("/estimate/customer-info");
  };

  const handleNext = async () => {
    setValidationAttempted(true);

    if (validateForm()) {
      try {
        // Find hearAboutUsCode from leadSources
        const hearAboutSource = leadSources.find(
          (source) => source.id === data.customer.hearAbout,
        );
        const hearAboutUsCode = hearAboutSource?.code || 1;

        // Find pondAccessCode from pondAccessOptions
        const accessOption = pondAccessOptions.find(
          (option) => option.id === pondAccess,
        );
        const pondAccessCode = accessOption?.id || pondAccess;

        // Build the estimate payload
        const estimatePayload = {
          fullName: data.customer.fullName,
          email: data.customer.email,
          phoneNumber: data.customer.phone,
          address: data.customer.address,
          hearAboutUsCode: hearAboutUsCode,
          pondSurfaceAcres: parseFloat(pondSize),
          distanceFromLonokeMiles: parseFloat(distance),
          pondAccessCode: pondAccessCode,
          pondCondition: pondType.toUpperCase(),
          quoteType: selectedOption,
        };

        console.log("📤 Posting estimate:", estimatePayload);

        // Call the API
        const response = await postEstimate(estimatePayload);

        console.log("✅ Estimate response:", response);

        // Store the quote ID in the estimator context
        updateSection("estimator", {
          quoteId: response.id || response.quoteId,
        });

        // Navigate to pond estimator after successful API call
        navigate(`/estimate/estimator/${selectedOption}`);
      } catch (error) {
        console.error("❌ Error posting estimate:", error);
        setSnackMessage(
          "Failed to create estimate. Please check your inputs and try again.",
        );
        setSnackOpen(true);
      }
    } else {
      // Show snackbar for first error encountered
      const firstError = Object.keys(errors).find((key) => errors[key]);
      if (firstError) {
        setSnackMessage(getErrorMessage(firstError));
        setSnackOpen(true);
      }
    }
  };

  const handleResetPage = () => {
    updateSection("pondInfo", {
      pondSize: "",
      distance: "",
      pondAccess: "",
      pondType: "",
      hasFish: "",
      selectedFish: [],
      selectedOption: "",
    });
    setErrors({
      pondSize: false,
      distance: false,
      pondAccess: false,
      pondType: false,
      hasFish: false,
      selectedFish: false,
      selectedOption: false,
    });
    setValidationAttempted(false);
  };

  const handleResetAll = () => {
    reset();
    navigate("/");
  };

  const handlePondTypeChange = (type) => {
    // Reset dependent fields when pond type changes
    updateSection("pondInfo", {
      selectedOption: "",
      hasFish: "",
      selectedFish: [],
    });
    updateSection("pondInfo", { pondType: type });

    // Clear relevant errors
    setErrors((prev) => ({
      ...prev,
      pondType: false,
      hasFish: false,
      selectedFish: false,
      selectedOption: false,
    }));
  };

  const handleHasFishChange = (answer) => {
    updateSection("pondInfo", { hasFish: answer });

    // Reset selected fish and interest when hasFish changes
    if (answer === "no") {
      updateSection("pondInfo", { selectedFish: [], selectedOption: "" });
      setErrors((prev) => ({
        ...prev,
        selectedFish: false,
        selectedOption: false,
      }));
    } else {
      updateSection("pondInfo", { selectedOption: "" });
      setErrors((prev) => ({ ...prev, selectedOption: false }));
    }

    // Clear hasFish error
    setErrors((prev) => ({ ...prev, hasFish: false }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "84vh",
        display: "flex",
        alignItems: "center",
        pt: 2,
      }}
    >
      <Container
        sx={{ ...glassBoxStyles, padding: { xs: 2, sm: "1rem 2rem" } }}
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
              Page 2 / 5
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: "0.875rem",
                color: "primary.light",
                fontWeight: 500,
              }}
            >
              Pond Information
            </Typography>
          </Box>

          {/* Progress */}
          <LinearProgress
            variant="determinate"
            value={40}
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
            rowGap={{ xs: 2, md: 1 }}
            sx={{ flex: 1, overflow: "hidden" }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              {/* Pond Size */}
              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary.contrastText"
                mb={{ xs: 2, md: 4.7 }}
              >
                How big is your pond in surface acres?{" "}
                <span style={{ color: "#f44336" }}>*</span>
              </Typography>

              <TextField
                fullWidth
                size="small"
                type="number"
                placeholder="e.g. 1.5"
                value={pondSize}
                onChange={(e) => handleChange("pondSize", e.target.value)}
                error={errors.pondSize && validationAttempted}
                helperText={getErrorMessage("pondSize")}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <span style={{ color: "#2c2c2c" }}>acres</span>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ ...textFieldSx }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* Distance */}
              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary.contrastText"
                mb={1}
              >
                How many miles is your pond from Lonoke, Arkansas?{" "}
                <span style={{ color: "#f44336" }}>*</span>
              </Typography>
              <Typography
                variant="body2"
                color="primary.light"
                mb={1}
                sx={{ fontStyle: "italic" }}
              >
                We will verify the distance and confirm the total cost with you
                prior to delivery.
              </Typography>

              <TextField
                fullWidth
                size="small"
                type="number"
                placeholder="e.g. 2.0"
                value={distance}
                onChange={(e) => handleChange("distance", e.target.value)}
                error={errors.distance && validationAttempted}
                helperText={getErrorMessage("distance")}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <span style={{ color: "#2c2c2c" }}>miles</span>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ ...textFieldSx, mb: 2 }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* Pond Access */}
              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary.contrastText"
                mb={1}
              >
                How is access to the pond?{" "}
                <span style={{ color: "#f44336" }}>*</span>
              </Typography>

              <Select
                fullWidth
                size="small"
                value={pondAccess}
                autoFocus
                onChange={(e) => handleChange("pondAccess", e.target.value)}
                displayEmpty
                error={errors.pondAccess && validationAttempted}
                sx={{ ...selectSx }}
              >
                <MenuItem disabled value="" sx={{ ...menuItemSx }}>
                  Select an option
                </MenuItem>

                {pondAccessOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    value={option.id}
                    sx={{ ...menuItemSx }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.pondAccess && validationAttempted && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {getErrorMessage("pondAccess")}
                </FormHelperText>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* NEW / OLD POND */}
              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary.contrastText"
                mb={1}
              >
                Is this an old pond or a new pond?{" "}
                <span style={{ color: "#f44336" }}>*</span>
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
                mb={{ xs: 3, md: 1 }}
                gap={3}
              >
                {["new", "old"].map((type) => (
                  <Box
                    key={type}
                    onClick={() => handlePondTypeChange(type)}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                      flex: 1,
                      border: "2px solid",
                      borderColor:
                        pondType === type ? "primary.contrastText" : "#537D96",
                      borderRadius: 2,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <Radio checked={pondType === type} size="small" />
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "1rem",
                        fontWeight: 500,
                      }}
                    >
                      {type === "new" ? "New Pond" : "Old Pond"}
                    </span>
                  </Box>
                ))}
              </Box>
              {errors.pondType && validationAttempted && (
                <FormHelperText error sx={{ mt: -1, mb: 1 }}>
                  {getErrorMessage("pondType")}
                </FormHelperText>
              )}
            </Grid>

            {/* FISH IN POND */}
            {pondType === "old" && (
              <Grid size={{ xs: 12 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary.contrastText"
                  mb={1}
                >
                  Are there any fish in the pond now?{" "}
                  <span style={{ color: "#f44336" }}>*</span>
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                  gap={3}
                  mb={2}
                >
                  {["yes", "no"].map((ans) => (
                    <Box
                      key={ans}
                      onClick={() => handleHasFishChange(ans)}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        flex: 1,
                        border: "2px solid",
                        borderColor:
                          hasFish === ans ? "primary.contrastText" : "#537D96",
                        borderRadius: 2,
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      <Radio checked={hasFish === ans} size="small" />
                      <span style={{ color: "#fff" }}>{ans.toUpperCase()}</span>
                    </Box>
                  ))}
                </Box>
                {errors.hasFish && validationAttempted && (
                  <FormHelperText error sx={{ mt: -1, mb: 1 }}>
                    {getErrorMessage("hasFish")}
                  </FormHelperText>
                )}
              </Grid>
            )}

            {/* EXISTING FISH SPECIES */}
            {pondType === "old" && hasFish === "yes" && (
              <Grid size={{ xs: 12 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary.contrastText"
                  mb={2}
                >
                  What kind of fish are in the pond?{" "}
                  <span style={{ color: "#f44336" }}>*</span>
                </Typography>
                <Typography
                  variant="body2"
                  color="primary.light"
                  mb={3}
                  sx={{ fontStyle: "italic" }}
                >
                  Select the fish species that are currently in your pond. This
                  will help us make better recommendations for your stocking
                  needs.
                </Typography>

                <Box
                  display="grid"
                  gridTemplateColumns={{ xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
                  gap={2}
                  mb={2}
                >
                  {fishTypes.map((fish) => (
                    <FormControlLabel
                      key={fish.code}
                      control={
                        <Checkbox
                          checked={selectedFish.includes(fish.code)}
                          sx={{ color: "primary.contrastText" }}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...selectedFish, fish.code]
                              : selectedFish.filter((f) => f !== fish.code);
                            handleChange("selectedFish", next);
                            // Clear error when at least one fish is selected
                            if (next.length > 0 && errors.selectedFish) {
                              setErrors((prev) => ({
                                ...prev,
                                selectedFish: false,
                              }));
                            }
                          }}
                        />
                      }
                      label={fish.name}
                      sx={{
                        color: "primary.contrastText",
                        ".MuiFormControlLabel-label": {
                          color: "primary.contrastText",
                        },
                      }}
                    />
                  ))}
                </Box>
                {errors.selectedFish && validationAttempted && (
                  <FormHelperText error sx={{ mt: 1, mb: 2 }}>
                    {getErrorMessage("selectedFish")}
                  </FormHelperText>
                )}
              </Grid>
            )}

            {/* INTEREST SELECT */}
            {(pondType === "new" || (pondType === "old" && hasFish)) && (
              <Grid size={{ xs: 12 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary.contrastText"
                  mb={1}
                >
                  Which statement fits your interest?{" "}
                  <span style={{ color: "#f44336" }}>*</span>
                </Typography>
                <Select
                  fullWidth
                  size="small"
                  value={selectedOption || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;

                    // Reset estimator data when estimator option changes
                    updateSection("estimator", {
                      // Common fields
                      pondType: "",
                      selectedOptionIndices: [],
                      selectedOptions: [],
                      totalPrice: 0,

                      // New pond estimator fields
                      grassCarp: {
                        selected: false,
                        quantity: 1,
                        total: 0,
                      },
                      hybridChoice: {
                        regularHybrid: false,
                        specklebelly: false,
                      },
                      breakdown: [],

                      // Adult Fish Estimator fields
                      adultFishData: [],
                      totalCostLess450: 0,
                      totalCostMore450: 0,

                      // Feed Bass Estimator fields
                      feedBassData: [],
                      totalCostLess12000: 0,
                      totalCostMore12000: 0,

                      // Grass Carp Estimator fields
                      grassCarpData: [],
                      totalCostLess1000: 0,
                      totalCostMore1000: 0,

                      // Ala Carte Estimator fields
                      alaCarteData: [],
                      alaCarteTotal: 0,
                    });

                    // Update the selected option
                    handleChange("selectedOption", newValue);
                  }}
                  displayEmpty
                  error={errors.selectedOption && validationAttempted}
                  sx={{ ...selectSx }}
                >
                  <MenuItem disabled value="" sx={{ ...menuItemSx }}>
                    Select option
                  </MenuItem>

                  {getOptions().map((opt) => (
                    <MenuItem
                      key={opt.code}
                      value={opt.code}
                      sx={{ ...menuItemSx }}
                    >
                      {opt.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.selectedOption && validationAttempted && (
                  <FormHelperText error sx={{ mt: 1 }}>
                    {getErrorMessage("selectedOption")}
                  </FormHelperText>
                )}
              </Grid>
            )}
          </Grid>

          {/* Buttons */}
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Box display="flex" justifyContent="space-between">
              <Button
                onClick={handleBack}
                disabled={quoteLoading}
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
                  variant="outlined"
                  color="text.secondary"
                  onClick={handleResetPage}
                  sx={{
                    minWidth: "120px",
                  }}
                >
                  Reset Page
                </Button>

                <Button
                  variant="outlined"
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
                disabled={quoteLoading}
                sx={{
                  background: "#44A194",
                  "&:hover": { background: "#537D96" },
                }}
              >
                {quoteLoading ? "Creating Estimate..." : "Continue"}
              </Button>
            </Box>
          </Box>

          {/* Loading Backdrop */}
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={quoteLoading}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <CircularProgress color="inherit" />
              <Typography variant="h6">Creating your estimate...</Typography>
            </Box>
          </Backdrop>
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
        </motion.div>
      </Container>
    </Box>
  );
}
