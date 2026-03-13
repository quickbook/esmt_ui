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
export function FeedBassEstimator() {
  const navigate = useNavigate();
  const [fishData, setFishData] = useState([
    {
      name: "Intermediate Bream",
      unit: "fish",
      recommendation:
        "Recommended 1000 to 2000 per acre after harvest of 8 to 15 inch bass.",
      quantity: 0,
    },
    {
      name: "Fathead Minnows",
      unit: "pounds",
      recommendation:
        "Recommended 100 plus pounds per acre in established ponds. Comes down to how much you want to spend.",
      quantity: 0,
    },
    {
      name: "Golden Shiners",
      unit: "pounds",
      recommendation:
        "Recommended 100 plus pounds per acre in established ponds. Comes down to how much you want to spend.",
      quantity: 0,
    },
  ]);

  const [totalCostMore12000, setTotalCostMore12000] = useState(0);
  const [totalCostLess12000, setTotalCostLess12000] = useState(0);

  useEffect(() => {
    // Calculate total based on quantities
    const breamCount = fishData[0].quantity;
    const minnowsPounds = fishData[1].quantity;
    const shinersPounds = fishData[2].quantity;

    const totalBream = breamCount + minnowsPounds + shinersPounds;

    if (totalBream > 12000 || minnowsPounds > 600 || shinersPounds > 600) {
      setTotalCostMore12000(totalBream * 0.5); // Simplified pricing
      setTotalCostLess12000(0);
    } else {
      setTotalCostLess12000(totalBream * 0.5);
      setTotalCostMore12000(0);
    }
  }, [fishData]);

  const handleQuantityChange = (index, value) => {
    const newFishData = [...fishData];
    newFishData[index].quantity = parseFloat(value) || 0;
    setFishData(newFishData);
  };

  const handleNext = () => {
    navigate("/availability");
  };

  const handleBack = () => {
    navigate("/pond-selection");
  };

  return (
    <Box sx={{ minHeight: "84vh", py: 8, px: 2 }}>
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: { xs: 3, md: 6 },
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
              Page 4 / 6
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
              Feed Bass Estimator
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary.contrastText"
            mb={1}
          >
            Feed Bass Estimator
          </Typography>

          <Typography color="primary.contrastText" mb={4}>
            Enter the Quantity of Fish You Desire to Purchase To Feed Your Bass
          </Typography>

          {/* Table */}
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#537D96" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Fish Type
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Recommendation
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {fishData.map((fish, index) => (
                  <TableRow key={index} hover>
                    <TableCell
                      sx={{ fontWeight: 500, color: "primary.contrastText" }}
                    >
                      {fish.name}
                    </TableCell>

                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={2}
                      >
                        <TextField
                          type="number"
                          size="small"
                          value={fish.quantity || ""}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                          placeholder="0"
                          inputProps={{ min: 0, step: 1 }}
                          sx={{
                            width: 120,
                            "& input": { textAlign: "center" },
                            backgroundColor: "#FFF7CC",
                            "& .MuiInputBase-input": {
                              color: "primary.dark",
                              fontWeight: 600,
                            },
                            borderRadius: 1,
                          }}
                        />

                        <Typography
                          color="primary.contrastText"
                          fontWeight="500"
                        >
                          {fish.unit}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell
                      sx={{ fontSize: 14, color: "primary.contrastText" }}
                    >
                      {fish.recommendation}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Cost Estimates */}
          <Box mt={4} display="flex" flexDirection="column" gap={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              sx={{
                ...glassBoxStyles,
                borderRadius: 2,
              }}
            >
              <Typography fontWeight="500" color="#537D96">
                Total Cost Estimate More than 12,000 bream or 600 pounds of
                minnows/shiners
              </Typography>

              <Typography fontWeight="bold" color="#537D96">
                $ {totalCostMore12000.toFixed(2)} - Delivery included
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              sx={{
                ...glassBoxStyles,
                borderRadius: 2,
              }}
            >
              <Typography fontWeight="500" color="#537D96">
                Total Cost Estimate Less than 12,000 bream or 600 pounds of
                minnows/shiners
              </Typography>

              <Typography fontWeight="bold" color="#537D96">
                $ {totalCostLess12000.toFixed(2)} - Delivery included
              </Typography>
            </Box>
          </Box>

          {/* Info Box */}
          <Box
            mt={4}
            p={3}
            sx={{
              ...glassBoxStyles,
              border: "1px solid rgba(236,143,141,0.3)",
              textAlign: "center",
            }}
          >
            <Typography fontWeight="bold" color="#537D96" mb={1}>
              $750 minimum
            </Typography>

            <Typography fontSize={12} color="#537D96">
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
