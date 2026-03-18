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
} from "@mui/material";
import { motion } from "framer-motion";

import { glassBoxStyles } from "../utils/glassStyles";
import { menuItemSx, selectSx, textFieldSx } from "../theme/theme";
import { menu } from "framer-motion/client";

export function PondInfo() {
  const navigate = useNavigate();

  const [pondType, setPondType] = useState("");
  const [hasFish, setHasFish] = useState("");
  const [selectedFish, setSelectedFish] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [formData, setFormData] = useState({
    pondSize: "",
    distance: "",
    pondAccess: "",
    pondType: "",
    hasFish: "",
    selectedFish: [],
    selectedOption: "",
  });

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
    "Specklebelly Bream"
  ];

  const newPondOptions = [
    { value: "trophy-bass", label: "I have a new pond and want trophy bass" },
    { value: "bass-pond", label: "I have a new pond and want bass and bream" },
    {
      value: "fishing-pond",
      label:
        "I have a new pond and want to fish for bass, bream, crappie and catfish",
    },
    {
      value: "catfish-pond",
      label: "I have a new pond and want to fish for catfish",
    },
    {
      value: "hybrid-bream",
      label: "I have a new pond and want to fish for big bream",
    },
  ];

  const oldPondOptions = [
    {
      value: "adult-fish",
      label: "I have an old pond and want to add catchable fish",
    },
    {
      value: "feed-bass",
      label: "I have an old pond and want to feed my bass",
    },
    {
      value: "grass-carp",
      label: "I want to stock grass carp to get rid of my weeds",
    },
  ];

  const alaCarteOption = {
    value: "ala-carte",
    label:
      "I want to create my own custom fish stocking  from your ala carte menu",
  };

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
    setFormData({
      ...formData,
      [field]: value,
    });
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
        py: 6,
      }}
    >
      <Container
        sx={{ ...glassBoxStyles, padding: { xs: 2, sm: "2rem" } }}
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
          <Box textAlign="center" mb={4}>
            <Typography
              sx={{
                fontWeight: 600,
                color: "primary.contrastText",
              }}
            >
              Page 2 / 5
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: { xs: "0.75rem", md: "1.25rem" },
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
              mb: 5,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#e5e7eb",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#44A194",
              },
            }}
          />

          {/* Pond Size */}
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary.contrastText"
            mb={1}
          >
            How big is the pond in surface acres?
          </Typography>

          <TextField
            fullWidth
            type="number"
            placeholder="e.g. 1.5"
            value={formData.pondSize}
            onChange={(e) => handleChange("pondSize", e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">acres</InputAdornment>
                ),
              },
            }}
            sx={{ mb: 4, ...textFieldSx }}
          />

          {/* Distance */}
          <Typography
            variant="h5"
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
            type="number"
            placeholder="e.g. 2.0"
            value={formData.distance}
            onChange={(e) => handleChange("distance", e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">miles</InputAdornment>
                ),
              },
            }}
            sx={{ mb: 4, ...textFieldSx }}
          />

          {/* Pond Access */}
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary.contrastText"
            mb={1}
          >
            How is access to the pond?
          </Typography>

          <Select
            fullWidth
            value={formData.pondAccess}
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

          {/* NEW / OLD POND */}
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary.contrastText"
            mb={1}
          >
            Is this an old pond or a new pond?
          </Typography>

          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
            gap={3}
            mb={4}
          >
            {["new", "old"].map((type) => (
              <Box
                key={type}
                onClick={() => setPondType(type)}
                sx={{
                  flex: 1,
                  border: "2px solid",
                  borderColor:
                    pondType === type ? "primary.contrastText" : "#537D96",
                  borderRadius: 2,
                  p: 1,
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <Radio checked={pondType === type} />
                <span style={{ color: "#fff" }}>
                  {type === "new" ? "New Pond" : "Old Pond"}
                </span>
              </Box>
            ))}
          </Box>

          {/* FISH IN POND */}
          {pondType === "old" && (
            <>
              <Typography
                variant="h5"
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
                mb={4}
              >
                {["yes", "no"].map((ans) => (
                  <Box
                    key={ans}
                    onClick={() => setHasFish(ans)}
                    sx={{
                      flex: 1,
                      border: "2px solid",
                      borderColor:
                        hasFish === ans ? "primary.contrastText" : "#537D96",
                      borderRadius: 2,
                      p: 1,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <Radio checked={hasFish === ans} />
                    <span style={{ color: "#fff" }}>{ans.toUpperCase()}</span>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* EXISTING FISH SPECIES */}
          {pondType === "old" && hasFish === "yes" && (
            <>
              <Typography
                variant="h5"
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
            Select the fish species that are currently in your pond. This will help us make better recommendations for your stocking needs.
          </Typography>

              <Box
                display="grid"
                gridTemplateColumns={{ xs: "1fr 1fr", md: "1fr 1fr 1fr" }}
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
                          if (e.target.checked) {
                            setSelectedFish([...selectedFish, fish]);
                          } else {
                            setSelectedFish(
                              selectedFish.filter((f) => f !== fish),
                            );
                          }
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
            </>
          )}

          {/* INTEREST SELECT */}
          {(pondType === "new" || (pondType === "old" && hasFish)) && (
            <>
              (
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary.contrastText"
                mb={1}
              >
                Which statement fits your interest?
              </Typography>
              <Select
                fullWidth
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
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
              )
            </>
          )}

          {/* Buttons */}
          <Box display="flex" justifyContent="space-between">
            <Button onClick={handleBack}>Back</Button>

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
