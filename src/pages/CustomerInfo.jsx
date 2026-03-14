import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { glassBoxStyles } from "../utils/glassStyles";
import { useNavigate } from "react-router-dom";
import { textFieldSx } from "../theme/theme";

export function CustomerInfo() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    hearAbout: "",
  });

  const questions = [
    {
      id: "fullName",
      question: "What is your full name?",
      type: "text",
      placeholder: "John Smith",
    },
    {
      id: "email",
      question: "What is your email address?",
      type: "email",
      placeholder: "john@email.com",
    },
    {
      id: "phone",
      question: "What is your phone number?",
      type: "tel",
      placeholder: "123-456-7890",
    },
    {
      id: "address",
      question: "What is your address?",
      type: "text",
      placeholder: "Your home address",
    },
    {
      id: "hearAbout",
      question: "How did you hear about us?",
      type: "select",
    },
  ];

  const hearAboutOptions = [
    "AGFC Guidebook",
    "Farm Bureau Magazine",
    "First Electric Magazine",
    "Website",
    "Event Sponsorship",
    "Return Customer",
    "Arkansans Great Outdoors",
    "Neighbor",
    "Facebook",
    "Instagram",
    "YouTube",
    "State Fair",
  ];

  const current = questions[step];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      //console.log("FORM DATA", formData);
      navigate("/pond-info");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate("/");
    }
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <Box
      sx={{
        minHeight: "84vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ ...glassBoxStyles, padding: {xs:2,sm:"2rem"} }}>
        <Box textAlign="center" mb={4}>
          {/* Page Counter */}
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: "primary.contrastText",
            }}
          >
            Page 1 / 6
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
            Customer Information
          </Typography>
        </Box>

        {/* Progress Bar */}
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
              type: "tween",
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary.contrastText"
              mb={4}
            >
              {current.question}
            </Typography>

            {/* Input types */}
            {current.type === "text" ||
            current.type === "email" ||
            current.type === "tel" ? (
              <TextField
                fullWidth
                autoFocus
                type={current.type}
                placeholder={current.placeholder}
                value={formData[current.id]}
                multiline={current.id === "address"}
                rows={current.id === "address" ? 3 : 1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [current.id]: e.target.value,
                  })
                }
                sx={{ mb: 4, ...textFieldSx }}
              />
            ) : (
              <Select
                fullWidth
                autoFocus
                value={formData.hearAbout}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hearAbout: e.target.value,
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
                {hearAboutOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    value={option}
                    sx={{ color: "primary.contrastText" }}
                  >
                    {option}
                  </MenuItem>
                ))}
                <MenuItem value="other" sx={{ color: "primary.contrastText" }}>
                  Other
                </MenuItem>
              </Select>
            )}

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
                {step === questions.length - 1 ? "Next" : "Continue"}
              </Button>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
}
