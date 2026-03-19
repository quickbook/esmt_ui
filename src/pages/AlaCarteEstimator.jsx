import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper } from "../components/Stepper";
import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
} from "@mui/material";
import { glassBoxStyles } from "../utils/glassStyles";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { fishPricing } from "../utils/pricing";

export function AlaCarteEstimator() {
  const navigate = useNavigate();

  const [fishItems, setFishItems] = useState([
    // Bluegill
    {
      category: "Bluegill",
      name: "Bluegill",
      size: "1 to 3 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.1,
    },
    {
      category: "Bluegill",
      name: "Bluegill",
      size: "3 to 4 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.22,
    },
    {
      category: "Bluegill",
      name: "Bluegill",
      size: "4 to 5 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.65,
    },
    {
      category: "Bluegill",
      name: "Bluegill",
      size: "5 to 6 inch",
      unit: "pounds",
      quantity: 0,
      pricePerUnit: 8,
    },

    // Redear
    {
      category: "Redear",
      name: "Redear",
      size: "1 to 3 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.15,
    },
    {
      category: "Redear",
      name: "Redear",
      size: "3 to 4 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.32,
    },
    {
      category: "Redear",
      name: "Redear",
      size: "4 to 5 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.8,
    },
    {
      category: "Redear",
      name: "Redear",
      size: "5 to 6 inch",
      unit: "pounds",
      quantity: 0,
      pricePerUnit: 9,
    },

    // Black Crappie
    {
      category: "Black Crappie",
      name: "Black Crappie",
      size: "1 to 3 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.34,
    },
    {
      category: "Black Crappie",
      name: "Black Crappie",
      size: "3 to 4 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.43,
    },
    {
      category: "Black Crappie",
      name: "Black Crappie",
      size: "4 to 5 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.75,
    },
    {
      category: "Black Crappie",
      name: "Black Crappie",
      size: "5 to 6 inch",
      unit: "pounds",
      quantity: 0,
      pricePerUnit: 9,
    },

    // Hybrid Crappie
    {
      category: "Hybrid Crappie",
      name: "Hybrid Crappie",
      size: "1 to 3 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.39,
    },
    {
      category: "Hybrid Crappie",
      name: "Hybrid Crappie",
      size: "3 to 4 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.65,
    },
    {
      category: "Hybrid Crappie",
      name: "Hybrid Crappie",
      size: "4 to 5 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 1.1,
    },

    // Hybrid Bream
    {
      category: "Hybrid Bream",
      name: "Hybrid Bream",
      size: "1 to 3 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.1,
    },
    {
      category: "Hybrid Bream",
      name: "Hybrid Bream",
      size: "3 to 4 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.22,
    },
    {
      category: "Hybrid Bream",
      name: "Hybrid Bream",
      size: "4 to 5 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.65,
    },
    {
      category: "Hybrid Bream",
      name: "Hybrid Bream",
      size: "5 to 6 inch",
      unit: "pounds",
      quantity: 0,
      pricePerUnit: 8,
    },

    // Catfish
    {
      category: "Catfish",
      name: "Catfish",
      size: "3 to 5 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.13,
    },
    {
      category: "Catfish",
      name: "Catfish",
      size: "5 to 7 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.3,
    },
    {
      category: "Catfish",
      name: "Catfish",
      size: "7 to 9 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.6,
    },
    {
      category: "Catfish",
      name: "Catfish",
      size: "1 pound plus",
      unit: "pounds",
      quantity: 0,
      pricePerUnit: 1.75,
    },

    // Bass (Northern/Florida)
    {
      category: "Bass",
      name: "Northern Bass",
      size: "1 to 3 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.38,
    },
    {
      category: "Bass",
      name: "Northern Bass",
      size: "3 to 4 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.95,
    },
    {
      category: "Bass",
      name: "Northern Bass",
      size: "4 to 5 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 1.25,
    },
    {
      category: "Bass",
      name: "Northern Bass",
      size: "5 to 7 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 2.15,
    },
    {
      category: "Bass",
      name: "Northern Bass",
      size: "7 to 9 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 3.15,
    },
    {
      category: "Bass",
      name: "Northern Bass",
      size: "10 to 12 inch",
      unit: "pounds",
      quantity: 0,
      pricePerUnit: 12.5,
    },
    {
      category: "Bass",
      name: "Northern Bass",
      size: "12 to 15 inch",
      unit: "pounds",
      quantity: 0,
      pricePerUnit: 10,
    },

    // Florida Bass
    {
      category: "Bass",
      name: "Florida Bass",
      size: "1 to 3 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.5,
    },
    {
      category: "Bass",
      name: "Florida Bass",
      size: "3 to 4 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 1.05,
    },
    {
      category: "Bass",
      name: "Florida Bass",
      size: "4 to 5 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 1.9,
    },
    {
      category: "Bass",
      name: "Florida Bass",
      size: "5 to 7 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 2.75,
    },
    {
      category: "Bass",
      name: "Florida Bass",
      size: "7 to 9 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 3.8,
    },

    // Minnows & Shiners
    {
      category: "Minnows",
      name: "Minnows",
      size: "1 to 3 inch",
      unit: "pounds",
      quantity: 0,
      pricePerUnit: 6.5,
    },
    {
      category: "Shiners",
      name: "Shiners",
      size: "3 to 5 inch",
      unit: "pounds",
      quantity: 0,
      pricePerUnit: 7,
    },

    // Grass Carp
    {
      category: "Grass Carp",
      name: "Triploid Grass Carp",
      size: "8 to 10 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 5.75,
    },
    {
      category: "Grass Carp",
      name: "Triploid Grass Carp",
      size: "12 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 7.25,
    },

    // F1 Hybrid Bass
    {
      category: "F1 Bass",
      name: "F1 Hybrid Bass",
      size: "1 to 3 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.5,
    },
    {
      category: "F1 Bass",
      name: "F1 Hybrid Bass",
      size: "3 to 4 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 1.05,
    },
    {
      category: "F1 Bass",
      name: "F1 Hybrid Bass",
      size: "4 to 5 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 1.9,
    },
    {
      category: "F1 Bass",
      name: "F1 Hybrid Bass",
      size: "5 to 7 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 2.75,
    },
    {
      category: "F1 Bass",
      name: "F1 Hybrid Bass",
      size: "7 to 9 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 3.8,
    },

    // Specklebelly Bream
    {
      category: "Specklebelly Bream",
      name: "Specklebelly Bream",
      size: "1 to 3 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.1,
    },
    {
      category: "Specklebelly Bream",
      name: "Specklebelly Bream",
      size: "3 to 4 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.22,
    },
    {
      category: "Specklebelly Bream",
      name: "Specklebelly Bream",
      size: "4 to 5 inch",
      unit: "fish",
      quantity: 0,
      pricePerUnit: 0.65,
    },
    {
      category: "Specklebelly Bream",
      name: "Specklebelly Bream",
      size: "5 to 6 inch",
      unit: "pounds",
      quantity: 0,
      pricePerUnit: 8,
    },
  ]);

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const total = fishItems.reduce((sum, item) => {
      return sum + item.quantity * item.pricePerUnit;
    }, 0);
    setTotalCost(total);
  }, [fishItems]);

  const handleQuantityChange = (index, value) => {
    const newFishItems = [...fishItems];
    newFishItems[index].quantity = parseFloat(value) || 0;
    setFishItems(newFishItems);
  };

  const handleNext = () => {
    navigate("/estimate/availability");
  };

  const handleBack = () => {
    navigate("/estimate/pond-info");
  };

  // Group items by category for better display
  const groupedItems = {};
  fishItems.forEach((item) => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = [];
    }
    groupedItems[item.category].push(item);
  });

  return (
    <Box sx={{ minHeight: "84vh", py: 4, px: {xs: 0, md:"2rem"} }}>
      <Container>
        <Paper
          sx={{
            p: { xs: 2, md: "1.5rem 4rem" },
            borderRadius: 3,
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            color: "primary.contrastText",
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
              Page 3 / 5
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
              Ala Carte Fish Estimator
            </Typography>
          </Box>

          {/* Title */}
          {/* <Typography
            variant="h4"
            fontWeight="bold"
            color="primary.contrastText"
            mb={1}
          >
            Ala Carte Fish Estimator
          </Typography> */}

          <Typography color="primary.contrastText" mb={2}>
            Enter the Quantity of Fish You Wish To Purchase
          </Typography>

          {/* Table */}
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#537D96" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Size
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Species
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Unit
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {fishItems.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ color: "primary.contrastText" }}>
                      {item.size}
                    </TableCell>

                    <TableCell
                      sx={{ fontWeight: 500, color: "primary.contrastText" }}
                    >
                      {item.name}
                    </TableCell>

                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={item.quantity || ""}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                        placeholder="0"
                        inputProps={{ min: 0, step: 1 }}
                        sx={{
                          width: {md:"50%"},
                          "& input": { textAlign: "center" },
                          backgroundColor: "#FFF7CC",
                          "& .MuiInputBase-input": {
                            color: "primary.dark",
                            fontWeight: 600,
                          },
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{ color: "primary.contrastText", textTransform:"capitalize" }}
                    >
                      {item.unit}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Estimate Box */}
          <Box
            mt={4}
            p={3}
            sx={{
              ...glassBoxStyles,
              border: "2px solid #44A194",
            }}
          >
            <Box
              display="flex"
              flexDirection={{xs:"column", md:"row"}}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                fontSize={16}
                fontWeight="bold"
                color="primary.contrastText"
              >
                Fish Cost Estimate
              </Typography>

              <Typography fontSize={{xs:20,md:24}} fontWeight="bold" color="primary.contrastText">
                $ {totalCost.toFixed(2)} - Delivery Included
              </Typography>
            </Box>

            <Typography
              textAlign="center"
              fontSize="1rem"
              color="primary.contrastText"
              fontWeight={600}
              mt={1}
            >
              $750 minimum
            </Typography>
          </Box>

          {/* Info Box */}
          <Box
            mt={3}
            p={3}
            sx={{
              ...glassBoxStyles,
              border: "1px solid rgba(236,143,141,0.3)",
              textAlign: "center",
            }}
          >
            <Typography fontSize={12} color="primary.contrastText">
              Estimated Price is calculated using pond size, fish size and
              distance from Lonoke, Arkansas.
              <br />A Representative will contact you to confirm the estimate
              prior to fish delivery.
            </Typography>
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
              Next
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
