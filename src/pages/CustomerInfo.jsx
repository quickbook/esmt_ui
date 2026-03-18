import { useEffect, useState } from "react";
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
import { glassBoxStyles } from "../utils/glassStyles";
import { useNavigate } from "react-router-dom";
import { menuItemSx, selectSx, textFieldSx } from "../theme/theme";
import { motion } from "framer-motion";

export function CustomerInfo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    hearAbout: "",
  });

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
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleBack = () => {
    navigate("/estimate/");
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
        py: 6,
      }}
    >
      <Container
        sx={{
          ...glassBoxStyles,
          padding: { xs: 2, sm: "2rem" },
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
          <Box textAlign="center" mb={4}>
            <Typography
              sx={{
                fontWeight: 600,
                color: "primary.contrastText",
              }}
            >
              Page 1 / 5
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: { xs: "1rem", md: "1.25rem" },
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
              mb: 5,
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

          {/* Full Name */}
          <Box mb={1}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary.contrastText"
              mb={1}
            >
              What is your name?
            </Typography>
            <TextField
              fullWidth
              label="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              sx={{ mb: 3, ...textFieldSx }}
            />
          </Box>

          {/* Email */}
          <Box mb={1}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary.contrastText"
              mb={1}
            >
              What is your mailing address?
            </Typography>
            <TextField
              fullWidth
              label="Enter your email address"
              type="email"
              //placeholder="john@email.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              sx={{ mb: 3, ...textFieldSx }}
            />
          </Box>

          {/* Phone */}
          <Box mb={1}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary.contrastText"
              mb={1}
            >
              What is your phone number?
            </Typography>
            <TextField
              fullWidth
              label="Enter your phone number"
              type="tel"
              //placeholder="123-456-7890"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              sx={{ mb: 3, ...textFieldSx }}
            />
          </Box>

          {/* Quote Email */}
          <Box mb={1}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary.contrastText"
              mb={1}
            >
              What is an email address I can send a written quote to?
            </Typography>
            <TextField
              fullWidth
              label="Enter your working email address"
              type="quote-email"
              //placeholder="john@email.com"
              value={formData["quote-email"]}
              onChange={(e) => handleChange("quote-email", e.target.value)}
              sx={{ mb: 3, ...textFieldSx }}
            />
          </Box>

          {/* Address */}
          <Box mb={1}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary.contrastText"
              mb={1}
            >
              Where is the physical address of the pond?
            </Typography>
            <TextField
              fullWidth
              label="Enter your physical address"
              multiline
              rows={3}
              //placeholder="Your home address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              sx={{ mb: 3, ...textFieldSx }}
            />
          </Box>

          {/* Hear About */}
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary.contrastText"
            mb={1}
          >
            How did you hear about us?
          </Typography>
          <Select
            fullWidth
            autoFocus
            value={formData.hearAbout}
            onChange={(e) => handleChange("hearAbout", e.target.value)}
            displayEmpty
            sx={{ ...selectSx, mb: 6 }}
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

          {/* Buttons */}
          <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
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
        </motion.div>
      </Container>
    </Box>
  );
}
