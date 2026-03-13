import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  LinearProgress,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  FormControlLabel,
} from "@mui/material";

import { motion, AnimatePresence } from "framer-motion";
import { glassBoxStyles } from "../utils/glassStyles";

export function PondSelection() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const [pondType, setPondType] = useState("");
  const [hasFish, setHasFish] = useState("");
  const [selectedFish, setSelectedFish] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

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
    "Mud Cat",
    "Gar",
    "Grinnel",
    "Shad",
  ];

  const newPondOptions = [
    { value: "trophy-bass", label: "I have a new pond and want trophy bass" },
    { value: "bass-pond", label: "I have a new pond and want bass and bream" },
    { value: "fishing-pond", label: "Bass, bream, crappie and catfish" },
    { value: "catfish-pond", label: "Catfish pond" },
    { value: "hybrid-bream", label: "Big bream pond" },
  ];

  const oldPondOptions = [
    { value: "adult-fish", label: "Add catchable fish" },
    { value: "feed-bass", label: "Feed my bass" },
    { value: "grass-carp", label: "Stock grass carp for weeds" },
  ];

  const alaCarteOption = {
    value: "ala-carte",
    label: "Stop asking questions, I know what I want",
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

  const progress = ((step + 1) / steps.length) * 100;

  const handleNext = () => {
    if (step === 0 && !pondType) {
      setSnackMessage("Please select New Pond or Old Pond");
      setSnackOpen(true);
      return;
    }

    if (step === 1 && pondType === "old" && !hasFish) {
      setSnackMessage("Please select if there are fish in the pond");
      setSnackOpen(true);
      return;
    }

    if (step === 3 && !selectedOption) {
      setSnackMessage("Please select an option to continue");
      setSnackOpen(true);
      return;
    }
    if (step < steps.length - 1) {
      if (step === 0 && pondType === "new") {
        setStep(steps.length - 1); // skip to last question
      } else if (step === 1 && hasFish === "no") {
        setStep(steps.length - 1); // skip to last question
      } else {
        setStep(step + 1);
      }
    } else {
      navigate(`/estimator/${selectedOption}`);
    }
  };

  const handleBack = () => {
    if (step === 0) {
      navigate("/pond-info");
    } else if (step > 0) {
      if (step === steps.length - 1 && pondType === "new") {
        setStep(0); // back to first question
      } else if (step === steps.length - 1 && pondType === "old") {
        setStep(1); // back to second question
      } else {
        setStep(step - 1);
      }
    }
  };

  return (
    <Box sx={{ minHeight: "84vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="md" sx={{ ...glassBoxStyles, padding: 4, my: step === 2 ? 2 : 0 }}>
        <Box textAlign="center" mb={4}>
          {/* Page Counter */}
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: "primary.contrastText",
            }}
          >
            Page 3 / 6
          </Typography>
          {/* Label */}
          <Typography
            sx={{
              mt: 1,
              fontSize: { xs: "0.75rem", md: "0.875rem" },
              textAlign: "center",
              color: "primary.light",
              fontWeight: 500,
            }}
          >
            Pond Selection
          </Typography>
        </Box>

        {/* Progress bar */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            mb: 5,
            height: 8,
            borderRadius: 4,
            "& .MuiLinearProgress-bar": { background: "#44A194" },
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary.contrastText"
              mb={4}
            >
              {steps[step]}
            </Typography>

            {/* Step 1 */}
            {step === 0 && (
              <Box display="flex" gap={3}>
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
                    <Radio checked={pondType === type} required />
                    <span style={{ color: "#fff" }}>
                      {type === "new" ? "New Pond" : "Old Pond"}
                    </span>
                  </Box>
                ))}
              </Box>
            )}

            {/* Step 2 */}
            {step === 1 && pondType === "old" && (
              <Box display="flex" gap={3}>
                {["yes", "no"].map((ans) => (
                  <Box
                    key={ans}
                    onClick={() => setHasFish(ans)}
                    sx={{
                      flex: 1,
                      border: "2px solid",
                      borderColor:
                        hasFish === ans ? "primary.contrastText" : "#537D96  ",
                      borderRadius: 2,
                      p: 1,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Radio checked={hasFish === ans} required />
                    <span style={{ color: "#fff" }}>{ans.toUpperCase()}</span>
                  </Box>
                ))}
              </Box>
            )}

            {/* Step 3 */}
            {step === 2 && pondType === "old" && hasFish === "yes" && (
              <Box display="grid" gridTemplateColumns="repeat(3,1fr)" gap={2}>
                {fishSpecies.map((fish) => (
                  <Box
                    key={fish}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <FormControlLabel
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
                        ".MuiFormControlLabel-label": { color: "primary.contrastText" },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}

            {/* Step 4 */}
            {step === 3 && (
              <Select
                fullWidth
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                autoFocus
                displayEmpty
                sx={{
                  mb: 4,
                  color: "primary.contrastText",
                  ".MuiSelect-icon": { color: "primary.contrastText" },
                }}
              >
                <MenuItem
                  disabled
                  value=""
                  sx={{ color: "primary.contrastText" }}
                >
                  Select option
                </MenuItem>
                {getOptions().map((opt) => (
                  <MenuItem
                    key={opt.value}
                    value={opt.value}
                    sx={{ color: "primary.contrastText" }}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            )}

            {/* Navigation */}
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button onClick={handleBack}>Back</Button>

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  background: "#44A194",
                  "&:hover": { background: "#537D96" },
                }}
              >
                {step === steps.length - 1 ? "Continue" : "Next"}
              </Button>
            </Box>
            <Snackbar
              open={snackOpen}
              autoHideDuration={3000}
              onClose={() => setSnackOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
        </AnimatePresence>
      </Container>
    </Box>
  );
}
