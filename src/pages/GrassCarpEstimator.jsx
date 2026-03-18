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

export function GrassCarpEstimator() {
  const navigate = useNavigate();
  const [fishData, setFishData] = useState([
    {
      name: "8 to 10 inch Triploid Grass Carp",
      unit: "Fish",
      recommendation:
        "Recommended 5 per acre for management of vegetation and 10 per acre for complete removal of vegetation. Smaller fish eat filamentous algae but can be eaten by big bass",
      quantity: 0,
      price: 5.75,
    },
    {
      name: "12 inch Triploid Grass Carp",
      unit: "Fish",
      recommendation:
        "12 inch fish will survive being introduced to ponds with big bass",
      quantity: 0,
      price: 7.25,
    },
  ]);

  const [totalCostLess1000, setTotalCostLess1000] = useState(0);
  const [totalCostMore1000, setTotalCostMore1000] = useState(0);

  useEffect(() => {
    const totalFish = fishData.reduce((sum, fish) => sum + fish.quantity, 0);
    const totalCost = fishData.reduce(
      (sum, fish) => sum + fish.quantity * fish.price,
      0,
    );

    if (totalFish < 1000) {
      setTotalCostLess1000(totalCost);
      setTotalCostMore1000(0);
    } else {
      setTotalCostLess1000(0);
      setTotalCostMore1000(totalCost);
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
      <Container maxWidth={{ xs: "sm", md: "md" }}>
        <Paper
          sx={{
            p: { xs: 2, md: "1rem 2rem" },
            borderRadius: 3,
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            color: "primary.contrastText",
          }}
        >
          <Box textAlign="center" mb={2}>
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
              Grass Carp Estimator
            </Typography>
          </Box>

          {/* Title */}
          {/* <Typography
            variant="h4"
            fontWeight="bold"
            color="primary.contrastText"
            mb={1}
          >
            Grass Carp Estimator
          </Typography> */}

          <Typography color="primary.contrastText" mb={4}>
            Enter the Quantity of Fish You Desire to Purchase To Eat Your Weeds
          </Typography>

          {/* Table */}
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#537D96" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Size
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
              flexDirection={{xs:'column', md:'row'}}
              gap={{xs:2,md:0}}
              p={2}
              sx={{
                ...glassBoxStyles,
                borderRadius: 2,
              }}
            >
              <Typography fontWeight="500" color="text.disabled">
                Total Cost Estimate Less than 1000 Fish
              </Typography>

              <Typography fontWeight="bold" color="text.primary">
                $ {totalCostLess1000.toFixed(2)} - Delivery included
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection={{xs:'column', md:'row'}}
              gap={{xs:2,md:0}}
              p={2}
              sx={{
                ...glassBoxStyles,
                borderRadius: 2,
              }}
            >
              <Typography fontWeight="500" color="text.disabled">
                Total Cost Estimate More than 1000 Fish
              </Typography>

              <Typography fontWeight="bold" color="text.primary">
                $ {totalCostMore1000.toFixed(2)} - Delivery included
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

            <Typography fontSize={12} color="text.disabled">
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
