import { useState } from "react";
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
} from "@mui/material";

import { motion, AnimatePresence } from "framer-motion";
import { glassBoxStyles } from "../utils/glassStyles";
import { textFieldSx } from "../theme/theme";

export function PondInfo() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    pondSize: "",
    distance: "",
    pondAccess: "",
  });

  const questions = [
    {
      id: "pondSize",
      question: "How big is the pond in surface acres?",
      type: "number",
      unit: "acres",
      placeholder: "e.g. 1.5",
    },
    {
      id: "distance",
      question: "How many miles is your pond from Lonoke, Arkansas?",
      type: "number",
      unit: "miles",
      placeholder: "e.g. 2.0",
    },
    {
      id: "pondAccess",
      question: "How is access to the pond?",
      type: "select",
    },
  ];

  const pondAccessOptions = [
    "Good solid road/driveway to the pond",
    "Gravel road",
    "Dirt road",
    "4 wheeler trail",
    "Cross cow pasture/lawn/field",
    "Do not deliver if it rained in the last week",
    "I have a tractor/bulldozer to pull you out",
  ];

  const current = questions[step];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/pond-selection");
    }
  };

  const handleBack = () => {
    if (step === 0) {
      navigate("/customer-info");
    } else {
      setStep(step - 1);
    }
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <Box
      sx={{
        minHeight: "84vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ ...glassBoxStyles, padding: "2rem" }}>
        <Box textAlign="center" mb={4}>
          {/* Page Counter */}
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: "primary.contrastText",
            }}
          >
            Page 2 / 6
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
            Pond Information
          </Typography>
        </Box>

        {/* Progress */}
        <LinearProgress
          variant="determinate"
          value={progress}
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

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ 
              duration: 0.35,
              ease: "easeOut",
              type: "tween"
            }}
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Question */}
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary.contrastText"
              mb={4}
            >
              {current.question}
            </Typography>

            {/* Input */}
            {current.type === "number" ? (
              <TextField
                fullWidth
                autoFocus
                type="number"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start" sx={{ pl: 2 }}>
                        {current.unit}
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder={current.placeholder}
                value={formData[current.id]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [current.id]: e.target.value,
                  })
                }
                sx={{...textFieldSx, mb: 4 }}
              />
            ) : (
              <Select
                fullWidth
                autoFocus
                value={formData.pondAccess}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pondAccess: e.target.value,
                  })
                }
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
                  Select an option
                </MenuItem>
                {pondAccessOptions.map((option, index) => (
                  <MenuItem key={index} value={option} sx={{ color: "primary.contrastText" }}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            )}

            {/* Navigation */}
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
                {step === questions.length - 1 ? "Continue" : "Next"}
              </Button>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
}
