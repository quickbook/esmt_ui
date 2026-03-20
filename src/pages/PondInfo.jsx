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
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { glassBoxStyles } from "../utils/glassStyles";
import { menuItemSx, selectSx, textFieldSx } from "../theme/theme";
import { useEstimateForm } from "../contexts/EstimateFormContext";

export const newPondOptions = [
  { value: "trophy-bass", label: "I want to fish for trophy bass." },
  { value: "bass-pond", label: "I want to fish for quality bass and bream." },
  {
    value: "fishing-pond",
    label:
      "I want to fish for a variety of fsh (bass, bream, crappie, catish).",
  },
  {
    value: "catfish-pond",
    label: "I want to fish for catfish.",
  },
  {
    value: "hybrid-bream",
    label: "I want to fish for big bream in a small pond.",
  },
];

export const oldPondOptions = [
  {
    value: "adult-fish",
    label: "I want to add catchable/adult fsh to my existng pond ",
  },
  {
    value: "feed-bass",
    label: "I want to feed the bass in my pond ",
  },
  {
    value: "grass-carp",
    label: "I want to stock grass carp to eat the weeds in my pond ",
  },
];

export const alaCarteOption = {
  value: "ala-carte",
  label:
    "I want to create my own custom fish stocking  from your ala carte menu",
};

export function PondInfo() {
  const navigate = useNavigate();
  const { data, updateSection } = useEstimateForm();
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

  const pondAccessOptions = [
    "Good solid road/driveway to the pond",
    "Gravel road",
    "Dirt road",
    "4 wheeler trail",
    "Cross cow pasture/lawn/field",
    "Do not deliver if it rained in the last week",
    "I have a tractor/bulldozer to pull you out",
  ];

  const fishSpecies = [
    "Bass",
    "Bluegill Sunfish",
    "Redear",
    "Black Crappie",
    "Channel Catfish",
    "Hybrid Bream",
    "Golden Shiners",
    "Fathead Minnows",
    "Green Sunfish",
    "White Crappie",
    "Blue Catfish",
    "Flathead Catfish",
    "Mud Catfish / Bullhead Catfish",
    "Gar",
    "Hybrid Crappie",
    "Grinnel / Bowfin",
    "Shad",
    "Specklebelly Bream",
  ];

  const getOptions = () => {
    if (pondType === "new") return [...newPondOptions, alaCarteOption];
    if (pondType === "old") return [...oldPondOptions, alaCarteOption];
    return [];
  };

  const steps = [
    "Do you have a new pond or an old pond?",
    "Are there any fish in the pond now?",
    "Select fish species in your pond",
    "Which statement fits your interest?",
  ];

  const handleChange = (field, value) => {
    updateSection("pondInfo", { [field]: value });
  };

  const handleBack = () => {
    navigate("/estimate/customer-info");
  };

  const handleNext = () => {
    if (!pondType) {
      setSnackMessage("Please select pond type");
      setSnackOpen(true);
      return;
    }

    if (pondType === "old" && !hasFish) {
      setSnackMessage("Please select if fish exist");
      setSnackOpen(true);
      return;
    }

    if (!selectedOption) {
      setSnackMessage("Please select your interest");
      setSnackOpen(true);
      return;
    }

    navigate(`/estimate/estimator/${selectedOption}`);
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
                How big is your pond in surface acres?
              </Typography>

              <TextField
                fullWidth
                size="small"
                type="number"
                placeholder="e.g. 1.5"
                value={pondSize}
                onChange={(e) => handleChange("pondSize", e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">acres</InputAdornment>
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
                How many miles is your pond from Lonoke, Arkansas?
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
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">miles</InputAdornment>
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
                How is access to the pond?
              </Typography>

              <Select
                fullWidth
                size="small"
                value={pondAccess}
                autoFocus
                onChange={(e) => handleChange("pondAccess", e.target.value)}
                displayEmpty
                sx={{ ...selectSx }}
              >
                <MenuItem disabled value="" sx={{ ...menuItemSx }}>
                  Select an option
                </MenuItem>

                {pondAccessOptions.map((option, index) => (
                  <MenuItem key={index} value={option} sx={{ ...menuItemSx }}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* NEW / OLD POND */}
              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary.contrastText"
                mb={1}
              >
                Is this an old pond or a new pond?
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
                    onClick={() =>
                      updateSection("pondInfo", { pondType: type })
                    }
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
                      //p: 1,
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
                  Are there any fish in the pond now?
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
                      onClick={() =>
                        updateSection("pondInfo", { hasFish: ans })
                      }
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
                        //p: 1,
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      <Radio checked={hasFish === ans} size="small" />
                      <span style={{ color: "#fff" }}>{ans.toUpperCase()}</span>
                    </Box>
                  ))}
                </Box>
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
                  What kind of fish are in the pond?
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
                  mb={4}
                >
                  {fishSpecies.map((fish) => (
                    <FormControlLabel
                      key={fish}
                      control={
                        <Checkbox
                          checked={selectedFish.includes(fish)}
                          sx={{ color: "primary.contrastText" }}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...selectedFish, fish]
                              : selectedFish.filter((f) => f !== fish);
                            updateSection("pondInfo", { selectedFish: next });
                          }}
                        />
                      }
                      label={fish}
                      sx={{
                        color: "primary.contrastText",
                        ".MuiFormControlLabel-label": {
                          color: "primary.contrastText",
                        },
                      }}
                    />
                  ))}
                </Box>
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
                  Which statement fits your interest?
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
                    updateSection("pondInfo", { selectedOption: newValue });
                  }}
                  displayEmpty
                  sx={{ ...selectSx }}
                >
                  <MenuItem disabled value="" sx={{ ...menuItemSx }}>
                    Select option
                  </MenuItem>

                  {getOptions().map((opt) => (
                    <MenuItem
                      key={opt.value}
                      value={opt.value}
                      sx={{ ...menuItemSx }}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}
          </Grid>

          {/* Buttons */}
          <Box display="flex" justifyContent="space-between" mt={2}>
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
