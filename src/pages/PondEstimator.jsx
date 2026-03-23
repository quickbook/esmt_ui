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
  Checkbox,
  Button,
  TextField,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { textFieldSx } from "../theme/theme";
import { useEstimateForm } from "../contexts/EstimateFormContext";

const pondConfigs = {
  "trophy-bass": {
    title: "Trophy Bass Pond Estimator",
    description:
      "Grow Bass over 10 pounds, Slow fishing long term growth. Best to Stock Bass in June for best Growth potential Stock others first.",
    stockDesc:
      "Bluegill, Redear and Minnows stocked in fall or spring and Bass stocked in June",
    columns: [
      "Head-Bluegill",
      "Head-Redear",
      "Head-Bass",
      "Pounds-Minnows",
      "Pounds-Shinners",
    ],
    breakdownHeaders: [
      {
        label: "5 to 6 inch Bluegill",
        type: "pounds",
        fishName: "Bluegill",
        unit: "pounds",
      },
      {
        label: "3 to 4 inch Bluegill",
        type: "head",
        fishName: "Bluegill",
        unit: "head",
      },
      {
        label: "1 to 3 inch Bluegill",
        type: "head",
        fishName: "Bluegill",
        unit: "head",
      },
      {
        label: "5 to 6 inch Redear",
        type: "pounds",
        fishName: "Redear",
        unit: "pounds",
      },
      {
        label: "3 to 4 inch Redear",
        type: "head",
        fishName: "Redear",
        unit: "head",
      },
      {
        label: "1 to 3 inch Redear",
        type: "head",
        fishName: "Redear",
        unit: "head",
      },
      { label: "Minnows", type: "pounds", fishName: "Minnows", unit: "pounds" },
      {
        label: "12 to 15 inch Bass",
        type: "pounds",
        fishName: "Bass",
        unit: "pounds",
      },
    ],
  },
  "catfish-pond": {
    title: "Catfish Pond Estimator",
    description:
      "Grow Catfish up to 5 pounds. Small ponds with low management. Can be stocked year round so long as not to hot for redear.",
    stockDesc: "All fish stocked at same time.",
    columns: ["Head-Redear", "Pounds-Minnows", "Head-Catfish"],
    breakdownHeaders: [
      {
        label: "5 to 6 inch Redear",
        type: "pounds",
        fishName: "Redear",
        unit: "pounds",
      },
      { label: "Minnows", type: "pounds", fishName: "Minnows", unit: "pounds" },
      {
        label: "12 to 15 inch Catfish",
        type: "pounds",
        fishName: "Catfish",
        unit: "pounds",
      },
    ],
  },
  "fishing-pond": {
    title: "Fishing Pond Estimator",
    description:
      "Grow quality bass, bream, crappie and catfish. Great for kids. All fish can be stocked at same time Crappie do best October to April.",
    stockDesc:
      "Crappie are not available May through September, Hybrid Crappie can be substituted for Black Crappie if they are available, Not all sizes of hybrid crappie are available at all times.",
    columns: [
      "Head-Bluegill",
      "Head-Redear",
      "Head-Bass",
      "Pounds-Minnows",
      "Head-Catfish",
      "Head-Crappie",
    ],
    breakdownHeaders: [
      {
        label: "5 to 6 inch Bluegill",
        type: "pounds",
        fishName: "Bluegill",
        unit: "pounds",
      },
      {
        label: "3 to 4 inch Bluegill",
        type: "head",
        fishName: "Bluegill",
        unit: "head",
      },
      {
        label: "1 to 3 inch Bluegill",
        type: "head",
        fishName: "Bluegill",
        unit: "head",
      },
      {
        label: "5 to 6 inch Redear",
        type: "pounds",
        fishName: "Redear",
        unit: "pounds",
      },
      {
        label: "3 to 4 inch Redear",
        type: "head",
        fishName: "Redear",
        unit: "head",
      },
      {
        label: "1 to 3 inch Redear",
        type: "head",
        fishName: "Redear",
        unit: "head",
      },
      { label: "Minnows", type: "pounds", fishName: "Minnows", unit: "pounds" },
      {
        label: "12 to 15 inch Bass",
        type: "pounds",
        fishName: "Bass",
        unit: "pounds",
      },
      {
        label: "12 to 15 inch Catfish",
        type: "pounds",
        fishName: "Catfish",
        unit: "pounds",
      },
      {
        label: "5 to 6 inch Crappie",
        type: "head",
        fishName: "Crappie",
        unit: "head",
      },
    ],
  },
  "hybrid-bream": {
    title: "Hybrid Bream Pond Estimator",
    description:
      "Grow Bream up to 1 pound. Small ponds with low management. 80 to 90% male reduced spawning reduces competition makes big bream.",
    stockDesc: "All fish stocked at same time.",
    columns: [
      "Head-Hybrid Bream",
      "Head-Redear",
      "Head-Bass",
      "Pounds-Minnows",
      "Head-Catfish",
    ],
    breakdownHeaders: [
      {
        label: "5 to 6 inch Hybrid",
        type: "pounds",
        fishName: "Hybrid Bream",
        unit: "pounds",
      },
      {
        label: "5 to 6 inch Redear",
        type: "pounds",
        fishName: "Redear",
        unit: "pounds",
      },
      { label: "Minnows", type: "pounds", fishName: "Minnows", unit: "pounds" },
      {
        label: "12 to 15 inch Bass",
        type: "pounds",
        fishName: "Bass",
        unit: "pounds",
      },
      {
        label: "12 to 15 inch Catfish",
        type: "pounds",
        fishName: "Catfish",
        unit: "pounds",
      },
    ],
  },
  "bass-pond": {
    title: "Bass Pond Estimator",
    description:
      "Grow Bass over 5 pounds. Will require regular bass harvest to maintain balance. Best to Stock Bass in June for best Growth potential Stock others first.",
    stockDesc:
      "Bluegill, Redear and Minnows stocked in fall or spring and Bass stocked in June",
    columns: ["Head-Bluegill", "Head-Redear", "Head-Bass", "Pounds-Minnows"],
    breakdownHeaders: [
      {
        label: "5 to 6 inch Bluegill",
        type: "pounds",
        fishName: "Bluegill",
        unit: "pounds",
      },
      {
        label: "3 to 4 inch Bluegill",
        type: "head",
        fishName: "Bluegill",
        unit: "head",
      },
      {
        label: "1 to 3 inch Bluegill",
        type: "head",
        fishName: "Bluegill",
        unit: "head",
      },
      {
        label: "5 to 6 inch Redear",
        type: "pounds",
        fishName: "Redear",
        unit: "pounds",
      },
      {
        label: "3 to 4 inch Redear",
        type: "head",
        fishName: "Redear",
        unit: "head",
      },
      {
        label: "1 to 3 inch Redear",
        type: "head",
        fishName: "Redear",
        unit: "head",
      },
      { label: "Minnows", type: "pounds", fishName: "Minnows", unit: "pounds" },
      {
        label: "12 to 15 inch Bass",
        type: "pounds",
        fishName: "Bass",
        unit: "pounds",
      },
    ],
  },
};

// Generate API data based on pond type (keeping UI values same)
const generateApiData = (pondType) => {
  const config = pondConfigs[pondType];

  // Same UI values as before
  const baseOptions = [
    { label: "Small Fish Option", size: "1-3 inch", price: 120 },
    { label: "Medium Fish Option", size: "3-4 inch", price: 220 },
    { label: "Large Fish Option", size: "4-5 inch", price: 350 },
    { label: "1 Year Old Population", size: "1 inch to Catchable", price: 500 },
  ];

  // Generate stock values (same as before for UI)
  const generateStockValues = (optionIndex) => {
    const stocks = [
      [100, 50, 25, 200, 120, 80],
      [200, 100, 50, 300, 80, 40],
      [300, 150, 75, 400, 90, 45],
    ];
    return stocks[optionIndex] || stocks[0];
  };

  // Generate breakdown values with fish names and units (for data structure)
  const generateBreakdownValues = () => {
    const values = [50, 100, 200, 30, 60, 120, 500, 25, 20, 10, 40];

    return config.breakdownHeaders.map((header, index) => ({
      fishName: header.fishName,
      size: header.label,
      unit: header.unit,
      quantity: values[index] || Math.floor(Math.random() * 100 + 50),
      total: 0, // Will be calculated
    }));
  };

  return {
    options: baseOptions,
    stock: [0, 1, 2, 3].map((i) => generateStockValues(i)),
    breakdownValues: generateBreakdownValues(),
    grassCarpPrice: 5.75,
    notes: ["$750 minimum"],
  };
};

export function PondEstimator() {
  const navigate = useNavigate();
  const { type } = useParams();
  const config = pondConfigs[type];
  const { data, updateSection } = useEstimateForm();

  const [selectedOptions, setSelectedOptions] = useState(
    data.estimator.selectedOptionIndices || [],
  );
  const [apiData, setApiData] = useState(null);
  const [grassCarpSelected, setGrassCarpSelected] = useState(
    data.estimator.grassCarp?.selected || false,
  );
  const [grassCarpQty, setGrassCarpQty] = useState(
    data.estimator.grassCarp?.quantity || 1,
  );
  const [regularHybrid, setRegularHybrid] = useState(
    data.estimator.hybridChoice?.regularHybrid || false,
  );
  const [specklebelly, setSpecklebelly] = useState(
    data.estimator.hybridChoice?.specklebelly || false,
  );

  useEffect(() => {
    setSelectedOptions(data.estimator.selectedOptionIndices || []);
    setGrassCarpSelected(data.estimator.grassCarp?.selected || false);
    setGrassCarpQty(data.estimator.grassCarp?.quantity || 1);
    setRegularHybrid(data.estimator.hybridChoice?.regularHybrid || false);
    setSpecklebelly(data.estimator.hybridChoice?.specklebelly || false);
  }, [data.estimator]);

  const handleToggle = (i) => {
    setSelectedOptions((prev) => {
      const next = prev.includes(i)
        ? prev.filter((idx) => idx !== i)
        : [...prev, i];
      updateSection("estimator", { selectedOptionIndices: next });
      return next;
    });
  };

  const handleBack = () => {
    navigate("/estimate/pond-info");
  };

  const handleNext = () => {
    // Create detailed selected options with fish information
    const selectedOptionDetails = selectedOptions.map((i) => {
      const option = apiData.options[i];

      // For the 4th option (1 Year Old Population), include detailed breakdown
      if (i === 3) {
        const breakdownWithTotals = apiData.breakdownValues.map((item) => ({
          ...item,
          total:
            item.unit === "pounds"
              ? item.quantity * 5.75 // Price per pound
              : item.quantity * 2.5, // Price per head
        }));

        return {
          ...option,
          pondType: type,
          isMaturePopulation: true,
          breakdown: breakdownWithTotals,
          // Use the package price, not the sum of breakdown
          calculatedTotal: option.price,
        };
      }

      // For regular options, create stock details with fish names
      const stockColumns = config.columns;
      const stockDetails = stockColumns.map((col, idx) => {
        const [unit, fishName] = col.split("-");
        const quantity = apiData.stock[i]?.[idx] || 0;

        return {
          fishName: fishName,
          unit: unit.toLowerCase(),
          quantity: quantity,
          size: option.size,
          // Don't calculate price here, just show quantities
        };
      });

      return {
        ...option,
        pondType: type,
        stockDetails: stockDetails,
        // Use the package price from API, not calculated from quantities
        calculatedTotal: option.price,
      };
    });

    const grassCarpTotal = grassCarpSelected
      ? apiData.grassCarpPrice * grassCarpQty
      : 0;

    // Calculate total price from all selections using the package prices
    const optionsTotal = selectedOptionDetails.reduce(
      (sum, option) => sum + (option.calculatedTotal || option.price || 0),
      0,
    );

    const finalData = {
      pondType: type,
      pondTypeTitle: config.title,
      selectedOptionIndices: selectedOptions,
      selectedOptions: selectedOptionDetails,
      grassCarp: {
        selected: grassCarpSelected,
        quantity: grassCarpQty,
        pricePerFish: apiData.grassCarpPrice,
        total: grassCarpTotal,
        description: "8 to 10 inch TRIPLOID GRASS CARP",
      },
      hybridChoice:
        config.title === "Hybrid Bream Pond Estimator"
          ? {
              regularHybrid,
              specklebelly,
              selected: regularHybrid
                ? "regular"
                : specklebelly
                  ? "specklebelly"
                  : "none",
            }
          : null,
      breakdown: selectedOptions.includes(3) ? apiData.breakdownValues : [],
      totalPrice: optionsTotal + grassCarpTotal,
      stockingDescription: config.stockDesc,
    };

    updateSection("estimator", finalData);
    navigate("/estimate/availability");
  };

  // Generate API data based on pond type
  useEffect(() => {
    if (type) {
      const data = generateApiData(type);
      setApiData(data);
    }
  }, [type]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!apiData || !config) return null;

  return (
    <Box
      sx={{
        minHeight: "84vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 3,
      }}
    >
      <Container sx={{ padding: { xs: 0, sm: "0 1rem" } }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4, ease: "easeOut", type: "tween" }}
        >
          <Paper sx={{ padding: { xs: 1, sm: "1rem 4rem" }, borderRadius: 1 }}>
            <Box textAlign="center" mb={4} mt={2}>
              <Typography
                sx={{
                  fontSize: "0.875rem",
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
                  color: "primary.light",
                  fontWeight: 500,
                }}
              >
                {config.title}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={60}
              sx={{
                mb: 5,
                height: 6,
                borderRadius: 4,
                backgroundColor: "#e5e7eb",
                "& .MuiLinearProgress-bar": { backgroundColor: "#44A194" },
              }}
            />

            <Box>
              <Typography fontWeight="bold" color="primary.contrastText" mb={2}>
                Note: {config.description}
              </Typography>
              <Typography
                fontSize="0.875rem"
                color="primary.contrastText"
                mb={2}
              >
                Select the option that best fits your budget. A
                representative will contact you to confirm the estimate and
                discuss stocking options prior to delivery.
              </Typography>
            </Box>

            <Box
              sx={{
                overflowX: "auto",
                width: "100%",
                borderRadius: 2,
                border: "1px solid",
              }}
              mb={4}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#537D9660" }}>
                    <TableCell>Option</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>
                      Select
                      <br />
                      Preferred
                      <br />
                      Option
                    </TableCell>
                    {config.columns.map((c) => (
                      <TableCell key={c}>
                        {c.split("-").map((s, i) => (
                          <div key={i + s}>{s}</div>
                        ))}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {apiData.options.map((opt, i) => {
                    const isFourthRow = i === 3;
                    return (
                      <TableRow
                        key={i}
                        sx={{
                          backgroundColor: selectedOptions.includes(i)
                            ? "rgba(43, 161, 146, 0.25)"
                            : "rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <TableCell>{opt.label}</TableCell>
                        <TableCell>{opt.size}</TableCell>
                        <TableCell>${opt.price}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={selectedOptions.includes(i)}
                            onChange={() => handleToggle(i)}
                          />
                        </TableCell>
                        {config.columns.map((_, idx) => (
                          <TableCell key={idx}>
                            {!isFourthRow ? apiData.stock[i][idx] : ""}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <Table
                sx={{
                  background: selectedOptions.includes(3)
                    ? "rgba(43, 161, 146, 0.25)"
                    : "rgba(0, 0, 0, 0.2)",
                }}
              >
                <TableHead>
                  <TableRow>
                    {config.breakdownHeaders.map((h, i) => (
                      <TableCell key={i} align="center">
                        {h.type === "pounds" ? "Pounds" : "Head"}
                        <br />
                        {h.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {config.breakdownHeaders.map((_, i) => (
                      <TableCell key={i} align="center">
                        {apiData.breakdownValues[i]?.quantity || 0}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>

            <Box mt={4} p={3} border={"1px solid"} borderRadius={2} bgcolor={"rgba(0, 0, 0, 0.2)"}>
              <Typography fontWeight="bold" sx={{ color: "text.primary" }}>
                Optional Add-ons
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexDirection={{ xs: "column", md: "row" }}
                gap={2}
                mt={2}
                px={1}
                py={2}
                bgcolor={
                  grassCarpSelected ? "rgba(43, 161, 146, 0.25)" : "transparent"
                }
              >
                <Typography
                  fontWeight="bold"
                  sx={{ color: "text.primary" }}
                  fontSize={"0.875rem"}
                >
                  ADD 8 to 10 inch TRIPLOID GRASS CARP
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  value={grassCarpQty}
                  onChange={(e) => {
                    const value = e.target.value;
                    const nextQty = Number(value) < 0 ? 0 : value;
                    setGrassCarpQty(nextQty);
                  }}
                  sx={{ ...textFieldSx, width: { xs: 60, md: 80 } }}
                />
                <Typography fontSize={16} color="text.primary" width={60}>
                  ${ (apiData.grassCarpPrice * grassCarpQty).toFixed(2) }
                </Typography>
                <Checkbox
                  sx={{ color: "text.primary" }}
                  checked={grassCarpSelected}
                  onChange={(e) => setGrassCarpSelected(e.target.checked)}
                />
                <Typography fontSize={13} color="text.secondary">
                  ARKANSAS, MISSOURI, MISSISSIPPI, OKLAHOMA, TENNESSEE ONLY
                </Typography>
              </Box>

              {config.title === "Hybrid Bream Pond Estimator" && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "text.secondary",
                      mb: 1.5,
                    }}
                  >
                    Specklebelly can be substituted for regular hybrid bream.
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={regularHybrid}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setRegularHybrid(checked);
                            if (checked) setSpecklebelly(false);
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{ fontSize: "0.8rem", color: "text.primary" }}
                        >
                          Customer wants regular hybrids
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={specklebelly}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSpecklebelly(checked);
                            if (checked) setRegularHybrid(false);
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{ fontSize: "0.8rem", color: "text.primary" }}
                        >
                          Customer wants specklebelly
                        </Typography>
                      }
                    />
                  </Box>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                my: 4,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                $750 minimum
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "text.primary" }}>
                {config.stockDesc}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "text.primary" }}>
                Estimated Price is calculated using pond size, fish size and
                distance from Lonoke, Arkansas.
                <br />A Representative will contact you to confirm the estimate
                prior to fish delivery.
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={4}>
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
              <Button variant="contained" onClick={handleNext}>
                Next <ArrowRightIcon />
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
