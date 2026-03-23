import { useEffect } from "react";
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
  LinearProgress,
  Grid
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { glassBoxStyles } from "../utils/glassStyles";
import { useEstimateForm } from "../contexts/EstimateFormContext";

export function Availability() {
  const navigate = useNavigate();
  const { data, updateSection } = useEstimateForm();
  const { availableDate, availableTime } = data.availability;

  const handleNext = () => {
    navigate("/estimate/quote");
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ minHeight: "84vh", padding:{xs:"1rem 0" , md:2} }}>
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
                  Preferred Contact Date
                </Typography>

                <TextField
                  type="date"
                  fullWidth
                  size="medium"
                  value={availableDate}
                  onChange={(e) =>
                    updateSection("availability", { availableDate: e.target.value })
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
                  Preferred Contact Time
                </Typography>

                <TextField
                  type="time"
                  fullWidth
                  size="medium"
                  value={availableTime}
                  onChange={(e) =>
                    updateSection("availability", { availableTime: e.target.value })
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
            </Grid>

            <Grid size={{ xs: 12 }}>
              {/* Note */}
              <Box
                sx={{
                  border: "1px solid #dcdcdc",
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
        </Paper>
      </Container>
    </Box>
  );
}
