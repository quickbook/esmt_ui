import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Checkbox,
  Button,
} from "@mui/material";
import { glassBoxStyles } from "../utils/glassStyles";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { Stepper } from "../components/Stepper";

const FIXED_OPTIONS = [
  {
    text: "Best to Stock Bass",
    fishOption: "Small Fish Option",
    size: "1 to 3 inch fish",
    type: "small",
    color: "#fecaca",
  },
  {
    text: "in June for best",
    fishOption: "Medium Fish Option",
    size: "3 to 4 inch fish",
    type: "medium",
    color: "#fef08a",
  },
  {
    text: "Growth potential",
    fishOption: "Large Fish Option",
    size: "4 to 5 inch fish",
    type: "large",
    color: "#fdba74",
  },
  {
    text: "Stock others first",
    fishOption: "1 Year Old Population Option",
    size: "5 to 6 inch Bluegill in pounds",
    type: "year",
    color: "#bbf7d0",
  },
  {
    text: "",
    fishOption: "Giant Fish Option",
    size: "10 to 13 inch Bass in pounds",
    type: "giant",
    color: "#bfdbfe",
  },
];

const pondConfigs = {
  "trophy-bass": {
    title: "Trophy Bass Pond Estimator",
    description: "Grow Bass over 10 pounds. Slow fishing. Long term investment",
  },
  "bass-pond": {
    title: "Bass Pond Estimator",
    description: "Bass to Stock Bass. In line for best Growth potential",
  },
  "fishing-pond": {
    title: "Fishing Pond Estimator",
    description: "Medium Fish Option. 4 to 6 inch bass fish",
  },
  "catfish-pond": {
    title: "Catfish Pond Estimator",
    description: "Stock catfish for your pond",
  },
  "hybrid-bream": {
    title: "Hybrid Bream Pond Estimator",
    description: "Large Hybrid Bream. Medium fishing potential",
  },
};

export function PondEstimator() {
  const navigate = useNavigate();
  const { type } = useParams();
  const config = type ? pondConfigs[type] : null;

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [grassCarpSelected, setGrassCarpSelected] = useState(false);
  const [grassCarpQty, setGrassCarpQty] = useState(0);
  const [grassCarpPrice, setGrassCarpPrice] = useState(5.75);
  const [totalCost, setTotalCost] = useState(0);

  const getPrice = (type, field) => {
    const prices = {
      small: { bluegill: 0.1, redear: 0.15, bass: 0.38 },
      medium: { bluegill: 0.22, redear: 0.32, bass: 0.95 },
      large: { bluegill: 0.65, redear: 0.8, bass: 1.25 },
      year: { bluegill: 8, redear: 9, bass: 10 },
      giant: { bluegill: 8, redear: 9, bass: 10 },
    };

    if (field === "minnows") return 6.5;
    if (field === "shiners") return 7;

    return prices[type]?.[field] || 0;
  };

  const calculateRowCost = (optionKey, optionType) => {
    const q = quantities[optionKey] || {};
    let total = 0;

    ["bluegill", "redear", "bass", "minnows", "shiners"].forEach((field) => {
      total += (q[field] || 0) * getPrice(optionType, field);
    });

    return total;
  };

  useEffect(() => {
    let total = 0;

    selectedOptions.forEach((key) => {
      const option = FIXED_OPTIONS.find(
        (o, i) => `${o.fishOption}-${i}` === key,
      );

      if (option) {
        total += calculateRowCost(key, option.type);
      }
    });

    if (grassCarpSelected) {
      total += grassCarpQty * grassCarpPrice;
    }

    setTotalCost(total);
  }, [quantities, selectedOptions, grassCarpSelected, grassCarpQty]);

  const handleQuantityChange = (optionKey, field, value) => {
    setQuantities((prev) => ({
      ...prev,
      [optionKey]: {
        ...(prev[optionKey] || {}),
        [field]: Number(value) || 0,
      },
    }));
  };

  const handleOptionToggle = (optionKey) => {
    setSelectedOptions((prev) =>
      prev.includes(optionKey)
        ? prev.filter((k) => k !== optionKey)
        : [...prev, optionKey],
    );
  };

  if (!config) {
    return (
      <Box
        sx={{
          minHeight: "84vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...glassBoxStyles,
        }}
      >
        <Box textAlign="center">
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary.contrastText"
          ></Typography>

          <Button
            variant="contained"
            sx={{ mt: 3, background: "#44A194" }}
            onClick={() => navigate("/pond-selection")}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "84vh", py: 6 }}>
      <Container maxWidth={{ xs: "sm", md: "lg" }}>
        <Paper
          sx={{
            p: 4,
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
              {config.title}
            </Typography>
          </Box>

          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary.contrastText"
          >
            {config.title}
          </Typography>

          <Typography fontSize={14} mb={3} color="primary.contrastText">
            {config.description}
          </Typography>

          <Box sx={{ overflowX: "auto" }}>
            <Table size="small" sx={{ border: "1px solid #ddd", minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Option</TableCell>
                <TableCell>Size</TableCell>
                <TableCell align="center">Estimated Price</TableCell>
                <TableCell align="center">Select</TableCell>
                <TableCell align="center">Bluegill</TableCell>
                <TableCell align="center">Redear</TableCell>
                <TableCell align="center">Bass</TableCell>
                <TableCell align="center">Minnows</TableCell>
                <TableCell align="center">Shiners</TableCell>
              </TableRow>
            </TableHead>

            <TableBody sx={{ color: "primary.dark" }}>
              {FIXED_OPTIONS.map((option, index) => {
                const optionKey = `${option.fishOption}-${index}`;
                const selected = selectedOptions.includes(optionKey);

                return (
                  <TableRow
                    key={index}
                    sx={{
                      background: option.color,
                      "& .MuiTableCell-root": {
                        color: "primary.dark",
                      },
                    }}
                  >
                    <TableCell>{option.text}</TableCell>
                    <TableCell>{option.fishOption}</TableCell>
                    <TableCell>{option.size}</TableCell>

                    <TableCell align="center">
                      {selected
                        ? `$${calculateRowCost(optionKey, option.type).toFixed(
                            2,
                          )}`
                        : ""}
                    </TableCell>

                    <TableCell align="center">
                      <Checkbox
                        checked={selected}
                        onChange={() => handleOptionToggle(optionKey)}
                      />
                    </TableCell>

                    {["bluegill", "redear", "bass", "minnows", "shiners"].map(
                      (field) => (
                        <TableCell key={field}>
                          <TextField
                            size="small"
                            type="number"
                            disabled={!selected}
                            sx={{
                              "& .MuiInputBase-input": {
                                color: "primary.dark",
                                fontWeight: 600,
                              },
                              backgroundColor: selected ? "#FFF7CC" : "transparent",
                              borderRadius: 1,
                            }}
                            value={
                              selected
                                ? quantities[optionKey]?.[field] || ""
                                : ""
                            }
                            onChange={(e) =>
                              handleQuantityChange(
                                optionKey,
                                field,
                                e.target.value,
                              )
                            }
                          />
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          </Box>

          <Box mt={4} p={2} border="2px solid #44A194" borderRadius={2}>
            <Typography fontWeight="bold" color="primary.contrastText">
              Fish Cost Estimate
            </Typography>
            <Typography fontSize={24} color="#44A194">
              ${totalCost.toFixed(2)}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button
              startIcon={<ArrowLeftIcon />}
              onClick={() => navigate("/pond-selection")}
            >
              Back
            </Button>

            <Button
              variant="contained"
              endIcon={<ArrowRightIcon />}
              sx={{ background: "#44A194" }}
              onClick={() => navigate("/availability")}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
