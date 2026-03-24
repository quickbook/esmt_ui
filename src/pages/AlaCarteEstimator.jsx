import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Grid,
} from "@mui/material";
import { glassBoxStyles } from "../utils/glassStyles";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useEstimateForm } from "../contexts/EstimateFormContext";

export function AlaCarteEstimator() {
  const navigate = useNavigate();
  const { updateSection } = useEstimateForm();

  // Group fish data into two columns
  const leftColumnCategories = [
    "Bluegill",
    "Redear",
    "Black Crappie",
    "Hybrid Crappie",
    "Minnows & Shiners",
    "Hybrid Bream",
    "Catfish",
  ];

  const rightColumnCategories = [
    "Northern Bass",
    "Florida Bass",
    "F1 Hybrid Bass",
    "Grass Carp",
    "Specklebelly Bream",
  ];

  const fishCategories = {
    Bluegill: [
      { size: "1-3 inch", unit: "fish", price: 0.1 },
      { size: "3-4 inch", unit: "fish", price: 0.22 },
      { size: "4-5 inch", unit: "fish", price: 0.65 },
      { size: "5-6 inch", unit: "pounds", price: 8 },
    ],
    Redear: [
      { size: "1-3 inch", unit: "fish", price: 0.15 },
      { size: "3-4 inch", unit: "fish", price: 0.32 },
      { size: "4-5 inch", unit: "fish", price: 0.8 },
      { size: "5-6 inch", unit: "pounds", price: 9 },
    ],
    "Black Crappie": [
      { size: "1-3 inch", unit: "fish", price: 0.34 },
      { size: "3-4 inch", unit: "fish", price: 0.43 },
      { size: "4-5 inch", unit: "fish", price: 0.75 },
      { size: "5-6 inch", unit: "pounds", price: 9 },
    ],
    "Hybrid Crappie": [
      { size: "1-3 inch", unit: "fish", price: 0.39 },
      { size: "3-4 inch", unit: "fish", price: 0.65 },
      { size: "4-5 inch", unit: "fish", price: 1.1 },
    ],
    "Hybrid Bream": [
      { size: "1-3 inch", unit: "fish", price: 0.1 },
      { size: "3-4 inch", unit: "fish", price: 0.22 },
      { size: "4-5 inch", unit: "fish", price: 0.65 },
      { size: "5-6 inch", unit: "pounds", price: 8 },
    ],
    "Catfish": [
      { size: "3-5 inch", unit: "fish", price: 0.13 },
      { size: "5-7 inch", unit: "fish", price: 0.3 },
      { size: "7-9 inch", unit: "fish", price: 0.6 },
      { size: "1 pound plus", unit: "pounds", price: 1.75 },
    ],
    "Northern Bass": [
      { size: "1-3 inch", unit: "fish", price: 0.38 },
      { size: "3-4 inch", unit: "fish", price: 0.95 },
      { size: "4-5 inch", unit: "fish", price: 1.25 },
      { size: "5-7 inch", unit: "fish", price: 2.15 },
      { size: "7-9 inch", unit: "fish", price: 3.15 },
      { size: "10-12 inch", unit: "pounds", price: 12.5 },
      { size: "12-15 inch", unit: "pounds", price: 10 },
    ],
    "Florida Bass": [
      { size: "1-3 inch", unit: "fish", price: 0.5 },
      { size: "3-4 inch", unit: "fish", price: 1.05 },
      { size: "4-5 inch", unit: "fish", price: 1.9 },
      { size: "5-7 inch", unit: "fish", price: 2.75 },
      { size: "7-9 inch", unit: "fish", price: 3.8 },
    ],
    "F1 Hybrid Bass": [
      { size: "1-3 inch", unit: "fish", price: 0.5 },
      { size: "3-4 inch", unit: "fish", price: 1.05 },
      { size: "4-5 inch", unit: "fish", price: 1.9 },
      { size: "5-7 inch", unit: "fish", price: 2.75 },
      { size: "7-9 inch", unit: "fish", price: 3.8 },
    ],
    "Minnows & Shiners": [
      { size: "1-3 inch", unit: "pounds", name: "Minnows", price: 6.5 },
      { size: "3-5 inch", unit: "pounds", name: "Shiners", price: 7 },
    ],
    "Grass Carp": [
      { size: "8-10 inch", unit: "fish", price: 5.75 },
      { size: "12 inch", unit: "fish", price: 7.25 },
    ],
    "Specklebelly Bream": [
      { size: "1-3 inch", unit: "fish", price: 0.1 },
      { size: "3-4 inch", unit: "fish", price: 0.22 },
      { size: "4-5 inch", unit: "fish", price: 0.65 },
      { size: "5-6 inch", unit: "pounds", price: 8 },
    ],
  };

  // Initialize quantities
  const [quantities, setQuantities] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const initialQuantities = {};
    Object.keys(fishCategories).forEach((category) => {
      fishCategories[category].forEach((item, idx) => {
        const key = `${category}_${item.size}_${idx}`;
        initialQuantities[key] = 0;
      });
    });
    setQuantities(initialQuantities);
  }, []);

  useEffect(() => {
    let total = 0;
    Object.keys(fishCategories).forEach((category) => {
      fishCategories[category].forEach((item, idx) => {
        const key = `${category}_${item.size}_${idx}`;
        const quantity = quantities[key] || 0;
        total += quantity * item.price;
      });
    });
    setTotalCost(total);
  }, [quantities]);

  const handleQuantityChange = (category, item, idx, value) => {
    const key = `${category}_${item.size}_${idx}`;
    setQuantities((prev) => ({
      ...prev,
      [key]: parseFloat(value) || 0,
    }));
  };

  const handleNext = () => {
    const alaCarteData = [];
    Object.keys(fishCategories).forEach((category) => {
      fishCategories[category].forEach((item, idx) => {
        const key = `${category}_${item.size}_${idx}`;
        const quantity = quantities[key] || 0;
        if (quantity > 0) {
          alaCarteData.push({
            category: category,
            name: item.name || category,
            size: item.size,
            unit: item.unit,
            quantity: quantity,
            pricePerUnit: item.price,
            total: quantity * item.price,
          });
        }
      });
    });

    updateSection("estimator", {
      pondType: "ala-carte",
      alaCarteData: alaCarteData,
      alaCarteTotal: totalCost,
      totalPrice: totalCost,
    });
    navigate("/estimate/availability");
  };

  const handleBack = () => {
    navigate("/estimate/pond-info");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderCategoryTable = (category, i) => (
    <Box key={i} mb={3}>
      <Typography
        fontWeight="bold"
        sx={{ color: "primary.light", mb: 1, fontSize: "0.9rem" }}
      >
        {category}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#537D96" }}>
            <TableCell sx={{ color: "white", fontSize: "0.75rem", py: 0.5 }}>
              Size
            </TableCell>
            <TableCell sx={{ color: "white", fontSize: "0.75rem", py: 0.5 }}>
              Unit
            </TableCell>
            <TableCell sx={{ color: "white", fontSize: "0.75rem", py: 0.5 }}>
              Price
            </TableCell>
            <TableCell align="center" sx={{ color: "white", fontSize: "0.75rem", py: 0.5 }}>
              Qty
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fishCategories[category].map((item, idx) => {
            const key = `${category}_${item.size}_${idx}`;
            return (
              <TableRow key={idx}>
                <TableCell
                  sx={{
                    fontSize: "0.75rem",
                    py: 0.5,
                    color: "primary.contrastText",
                  }}
                >
                  {item.size}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.75rem",
                    py: 0.5,
                    color: "primary.contrastText",
                    textTransform: "capitalize",
                  }}
                >
                  {item.unit}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "0.75rem",
                    py: 0.5,
                    color: "primary.contrastText",
                  }}
                >
                  ${item.price.toFixed(2)}
                </TableCell>
                <TableCell align="center" sx={{ py: 0.5 }}>
                  <TextField
                    type="number"
                    size="small"
                    value={quantities[key] || ""}
                    onChange={(e) =>
                      handleQuantityChange(category, item, idx, e.target.value)
                    }
                    placeholder="0"
                    inputProps={{
                      min: 0,
                      step: 1,
                      style: { fontSize: "0.75rem", padding: "4px" },
                    }}
                    sx={{
                      width: {xs:70, md: 100},
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "84vh", py: 4, px: { xs: 0, md: "2rem" } }}>
      <Container maxWidth="xl">
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
          <Box textAlign="center" mb={3}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 600,
                color: "primary.contrastText",
              }}
            >
              Page 3 / 5
            </Typography>
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

          <Typography color="primary.contrastText" mb={2} fontSize="0.9rem">
            Enter the Quantity of Fish You Wish To Purchase
          </Typography>

          {/* Two Column Layout */}
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                {leftColumnCategories.map((category, i) =>
                  renderCategoryTable(category, i),
                )}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                {rightColumnCategories.map((category, i) =>
                  renderCategoryTable(category, i),
                )}
              </Box>
            </Grid>
          </Grid>

          {/* Total Cost Box */}
          <Box
            mt={3}
            p={2}
            sx={{
              ...glassBoxStyles,
              border: "2px solid #44A194",
            }}
          >
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight="bold" color="primary.contrastText">
                Fish Cost Estimate
              </Typography>
              <Typography
                fontSize={{ xs: 20, md: 24 }}
                fontWeight="bold"
                color="primary.contrastText"
              >
                $ {totalCost.toFixed(2)} - Delivery Included
              </Typography>
            </Box>
            <Typography
              textAlign="center"
              fontSize="0.9rem"
              color="primary.contrastText"
              fontWeight={600}
              mt={1}
            >
              $750 minimum
            </Typography>
          </Box>

          {/* Info Box */}
          <Box
            mt={2}
            p={2}
            sx={{
              ...glassBoxStyles,
              border: "1px solid rgba(236,143,141,0.3)",
              textAlign: "center",
            }}
          >
            <Typography fontSize={11} color="primary.contrastText">
              Estimated Price includes delivery. A representative will contact
              you to confirm the estimate prior to fish delivery.
            </Typography>
          </Box>

          {/* Buttons */}
          <Box display="flex" justifyContent="space-between" mt={3}>
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
