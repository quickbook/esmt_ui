import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Stepper } from "../components/Stepper";
import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export function Availability() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    availableDate: "",
    availableTime: "",
  });

  const handleNext = () => {
    navigate("/quote");
  };

  const handleBack = () => {
    navigate("/pond-selection");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ minHeight: "84vh", py: 8, px: 2 }}>
      <Container maxWidth={{ xs: "sm", md: "lg" }}>
        <Paper
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          }}
        >
          <Box textAlign="center" mb={4}>
            {/* Page Counter */}
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 600,
                color: "primary.contrastText",
              }}
            >
              Page 5 / 6
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
              Availability
            </Typography>
          </Box>

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

          <Box display="flex" flexDirection="column" gap={4}>
            {/* Date Field */}
            <Box>
              <Typography
                fontSize={14}
                fontWeight={500}
                color="primary.light"
                mb={1}
              >
                Preferred Contact Date
              </Typography>

              <TextField
                type="date"
                fullWidth
                value={formData.availableDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableDate: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "primary.dark",
                    fontWeight: 600,
                  },
                }}
              />
            </Box>

            {/* Time Field */}
            <Box>
              <Typography
                fontSize={14}
                fontWeight={500}
                color="primary.light"
                mb={1}
              >
                Preferred Contact Time
              </Typography>

              <TextField
                type="time"
                fullWidth
                value={formData.availableTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableTime: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "primary.dark",
                    fontWeight: 600,
                  },
                }}
              />
            </Box>

            {/* Note */}
            <Box
              sx={{
                backgroundColor: "#F4F8F7",
                border: "1px solid rgba(68,161,148,0.3)",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography fontSize={14} color="text.secondary">
                <strong>Note:</strong> Please select an availability window
                within the next <strong>24–72 hours</strong>. This helps our
                team contact you promptly and provide timely assistance with
                your pond stocking estimate.
              </Typography>
            </Box>
          </Box>

          {/* Buttons */}
          <Box display="flex" justifyContent="space-between" mt={6}>
            <Button
              variant="contained"
              startIcon={<ArrowLeftIcon />}
              onClick={handleBack}
              sx={{
                backgroundColor: "#E0E0E0",
                color: "#537D96",
                "&:hover": { backgroundColor: "#D5D5D5" },
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
              <Typography variant="p" sx={{ display: {xs: "none", md: "flex"} }}>
                Continue to Quote
              </Typography>
              <Typography variant="p" sx={{ display: {xs: "flex", md: "none"} }}>
                Continue
              </Typography>

            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
