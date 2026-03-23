import { useEffect } from "react";
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
} from "@mui/material";
import { glassBoxStyles } from "../utils/glassStyles";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import { useNavigate } from "react-router-dom";
import { menuItemSx, selectSx, textFieldSx } from "../theme/theme";
import { motion } from "framer-motion";
import { useEstimateForm } from "../contexts/EstimateFormContext";

export function CustomerInfo() {
  const navigate = useNavigate();
  const { data, updateSection } = useEstimateForm();
  const formData = data.customer;

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

  const handleChange = (field, value) => {
    updateSection("customer", { [field]: value });
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleNext = () => {
    console.log("FORM DATA:", formData);
    navigate("/estimate/pond-info");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

          {/* <Typography
            variant="h3"
            fontWeight="bold"
            color="text.disabled"
            mb={6}
            //textAlign={"center"}
          >
            Tell Us About You
          </Typography> */}
          <Grid container spacing={3} rowGap={0} sx={{ flex: 1, overflow: "hidden" }}>
            <Grid size={{ xs: 12, md: 6 }}>
              {/* Full Name */}
              <Box mb={1}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary.contrastText"
                  mb={1}
                >
                  What is your name?
                </Typography>
                <TextField
                  fullWidth
                  size="small"

                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
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
                  What is your mailing address?
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter your email address"
                  type="email"
                  //placeholder="john@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
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
                  What is your phone number?
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter your phone number"
                  type="tel"
                  //placeholder="123-456-7890"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
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
                  What is an email address I can send a written quote to?
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter your working email address"
                  type="email"
                  value={formData.quoteEmail}
                  onChange={(e) => handleChange("quoteEmail", e.target.value)}
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
                  Where is the physical address of the pond?
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter your physical address"
                 
                  //placeholder="Your home address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
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
                How did you hear about us?
              </Typography>
              <Select
                fullWidth
                size="small"
                value={formData.hearAbout}
                onChange={(e) => handleChange("hearAbout", e.target.value)}
                displayEmpty
                sx={{ ...selectSx }}
              >
                <MenuItem disabled value="" sx={{ ...menuItemSx }}>
                  Select option
                </MenuItem>
                {hearAboutOptions.map((option, index) => (
                  <MenuItem key={index} value={option} sx={{ ...menuItemSx }}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          {/* Buttons */}
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
        </motion.div>
      </Container>
    </Box>
  );
}
