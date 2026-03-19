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
import { calculateFishCost } from "../utils/pricing";
import { useEstimateForm } from "../contexts/EstimateFormContext";

export function AdultFishEstimator() {
  const navigate = useNavigate();
  const { data, updateSection } = useEstimateForm();
  const [fishData, setFishData] = useState([
    {
      name: "Adult Bass",
      size: "12 to 15 inch fish",
      recommendation: "50 to 100 pounds per acre recommended",
      quantity: 0,
      pricePerPound: 10.5,
    },
    {
      name: "Adult Catfish",
      size: "12 to 15 inch fish",
      recommendation: "100 to 500 pounds per acre recommended",
      quantity: 0,
      pricePerPound: 8.75,
    },
    {
      name: "Adult Bream",
      size: "5 to 6 inch fish",
      recommendation: "50 to 300 pounds per acre recommended",
      quantity: 0,
      pricePerPound: 7.25,
    },
    {
      name: "Adult Hybrid Bream",
      size: "5 to 6 inch fish",
      recommendation: "50 to 300 pounds per acre recommended",
      quantity: 0,
      pricePerPound: 8.5,
    },
    {
      name: "Adult Redear",
      size: "5 to 6 inch fish",
      recommendation: "50 to 100 pounds per acre recommended",
      quantity: 0,
      pricePerPound: 7.75,
    },
    {
      name: "Adult Crappie",
      size: "5 to 6 inch fish",
      recommendation: "50 to 100 pounds per acre recommended",
      quantity: 0,
      pricePerPound: 9.25,
    },
  ]);

  const [totalCostLess450, setTotalCostLess450] = useState(0);
  const [totalCostMore450, setTotalCostMore450] = useState(0);

  useEffect(() => {
    let totalPounds = 0;
    let totalCost = 0;
    fishData.forEach((fish) => {
      totalPounds += fish.quantity;
      totalCost += fish.quantity * (fish.pricePerPound || 0);
    });

    // Calculate costs based on total pounds
    if (totalPounds < 450) {
      setTotalCostLess450(totalCost); // Simplified pricing
      setTotalCostMore450(0);
    } else {
      setTotalCostLess450(0);
      setTotalCostMore450(totalCost + 100); // Add a flat fee for larger orders
    }
  }, [fishData]);

  const handleQuantityChange = (index, value) => {
    const newFishData = [...fishData];
    newFishData[index].quantity = parseFloat(value) || 0;
    setFishData(newFishData);
  };

  const handleNext = () => {
    navigate("/estimate/availability");
  };

  const handleBack = () => {
    navigate("/estimate/pond-info");
  };

  return (
    <Box sx={{ minHeight: "84vh", py: 4, px: { xs: 0, md: "1rem 2rem" } }}>
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
          {/* Stepper */}
          <Box textAlign="center" mb={4}>
            {/* Page Counter */}
            <Typography
              sx={{
                fontSize: "0.875rem",
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
              Adult Fish Estimator
            </Typography>
          </Box>

          {/* Heading */}
          {/* <Typography
            variant="h4"
            fontWeight="bold"
            color="primary.contrastText"
            mt={2}
          >
            Adult Fish Estimator
          </Typography> */}

          <Typography color="primary.contrastText" mb={4}>
            Enter the Quantity of Fish You Desire to Purchase
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
                      //textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Quantity (pounds)
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontWeight: "bold", minWidth: 80 }}
                  >
                    Size
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
                      <TextField
                        type="number"
                        size="small"
                        value={fish.quantity || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          const nextQty = Number(value) < 0 ? 0 : value;
                          handleQuantityChange(index, nextQty);
                        }}
                        placeholder="0"
                        inputProps={{ min: 0, step: 1 }}
                        sx={{
                          width: { md: "50%" },
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
                      sx={{ fontSize: 14, color: "primary.contrastText" }}
                    >
                      {fish.size}
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

          {/* Cost Section */}
          <Box display="flex" flexDirection="column" gap={2} mt={"4rem"}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection={{ xs: "column", md: "row" }}
              gap={{ xs: 2, md: 0 }}
              p={2}
              sx={{
                ...glassBoxStyles,
                borderRadius: 2,
              }}
            >
              <Typography fontWeight="500" color="text.disabled">
                Total Cost Estimate Less Than 450 Pounds Of Fish
              </Typography>

              <Typography fontWeight="bold" color="text.primary">
                $ {totalCostLess450.toFixed(2)} - Delivery included
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection={{ xs: "column", md: "row" }}
              gap={{ xs: 2, md: 0 }}
              p={2}
              sx={{
                ...glassBoxStyles,
                borderRadius: 2,
              }}
            >
              <Typography fontWeight="500" color="text.disabled">
                Total Cost Estimate More Than 450 Pounds Of Fish
              </Typography>

              <Typography fontWeight="bold" color="text.primary">
                $ {totalCostMore450.toFixed(2)} - Delivery included
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
            <Typography fontWeight="bold" color="text.primary" mb={1}>
              $750 minimum
            </Typography>

            <Typography fontSize={14} color="text.disabled">
              Not all species available at all times
            </Typography>

            <Typography fontSize={12} color="text.disabled">
              Estimated Price is calculated using pond size, fish size and
              distance from Lonoke, Arkansas. A Representative will contact you
              to confirm the estimate prior to fish delivery.
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
                color: "secondary.main",
                "&:hover": { backgroundColor: "#text.disabled" },
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
                "&:hover": { backgroundColor: "secondary.main" },
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
