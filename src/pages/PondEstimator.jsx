import { useState, useEffect, use } from "react";
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
  Radio,
  TextField,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { glassBoxStyles } from "../utils/glassStyles";
import { textFieldSx } from "../theme/theme";
import { u } from "framer-motion/client";

const FIXED_OPTIONS = [
  { text: "Best to Stock Bass", color: "#ff9090" },
  { text: "in June for best", color: "#ffc383" },
  { text: "Growth potential", color: "#aaffa7" },
  { text: "Stock others first", color: "#87d5fc" },
];

const pondConfigs = {
  "trophy-bass": {
    title: "Trophy Bass Pond Estimator",
    description:
      "Grow Bass over 10 pounds, Slow fishing long term growth. Best to Stock Bass in June for best  Growth potential Stock others first.",
    stockDesc:
      "Bluegill, Redear and Minnows stocked in fall or spring and Bass stocked in June",
    columns: [
      "Head-Bluegill",
      "Head-Redear",
      "Head-Bass",
      "Pounds-Minnows",
      "Pounds-Shinners",
    ],

    // 🔵 BLUE SECTION (from your image)
    breakdownHeaders: [
      { label: "5 to 6 inch Bluegill", type: "pounds" },
      { label: "3 to 4 inch Bluegill", type: "head" },
      { label: "1 to 3 inch Bluegill", type: "head" },
      { label: "5 to 6 inch Redear", type: "pounds" },
      { label: "3 to 4 inch Redear", type: "head" },
      { label: "1 to 3 inch Redear", type: "head" },
      { label: "Minnows", type: "pounds" },
      { label: "12 to 15 inch Bass", type: "pounds" },
    ],
  },

  "catfish-pond": {
    title: "Catfish Pond Estimator",
    description:
      "Grow Catfish up to 5 pounds. Small ponds with low management. Can be stocked year round so long asnot to hot for redear.",
    stockDesc: "All fish stocked at same time.",
    columns: ["Head-Redear", "Pounds-Minnows", "Head-Catfish"],

    breakdownHeaders: [
      { label: "5 to 6 inch Redear", type: "pounds" },
      { label: "Minnows", type: "pounds" },
      { label: "12 to 15 inch Catfish", type: "pounds" },
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
      " Pounds-Minnows",
      "Head-Catfish",
      "Head-Crappie",
    ],

    breakdownHeaders: [
      { label: "5 to 6 inch Bluegill", type: "pounds" },
      { label: "3 to 4 inch Bluegill", type: "head" },
      { label: "1 to 3 inch Bluegill", type: "head" },
      { label: "5 to 6 inch Redear", type: "pounds" },
      { label: "3 to 4 inch Redear", type: "head" },
      { label: "1 to 3 inch Redear", type: "head" },
      { label: "Minnows", type: "pounds" },
      { label: "12 to 15 inch Bass", type: "pounds" },
      { label: "12 to 15 inch Catfish", type: "pounds" },
      { label: "5 to 6 inch Crappie", type: "head" },
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
      { label: "5 to 6 inch Hybrid", type: "pounds" },
      { label: "5 to 6 inch Redear", type: "pounds" },
      { label: "Minnows", type: "pounds" },
      { label: "12 to 15 inch Bass", type: "pounds" },
      { label: "12 to 15 inch Catfish", type: "pounds" },
    ],
  },

  "bass-pond": {
    title: "Bass Pond Estimator",
    description:
      "Grow Bass over 5 pounds. Will require regular bass harvest to maintain balance. Best to Stock Bass in June for best  Growth potential Stock others first.",
    stockDesc:
      "Bluegill, Redear and Minnows stocked in fall or spring and Bass stocked in June",
    columns: ["Head-Bluegill", "Head-Redear", "Head-Bass", "Pounds-Minnows"],

    breakdownHeaders: [
      { label: "5 to 6 inch Bluegill", type: "pounds" },
      { label: "3 to 4 inch Bluegill", type: "head" },
      { label: "1 to 3 inch Bluegill", type: "head" },
      { label: "5 to 6 inch Redear", type: "pounds" },
      { label: "3 to 4 inch Redear", type: "head" },
      { label: "1 to 3 inch Redear", type: "head" },
      { label: "Minnows", type: "pounds" },
      { label: "12 to 15 inch Bass", type: "pounds" },
    ],
  },
};

export function PondEstimator() {
  const navigate = useNavigate();
  const { type } = useParams();
  const config = pondConfigs[type];

  const [formData, setFormData] = useState({}); // this will hold all the data we want to pass to the next page
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [grassCarpSelected, setGrassCarpSelected] = useState(false);
  const [grassCarpQty, setGrassCarpQty] = useState(1);
  const [regularHybrid, setRegularHybrid] = useState(false);
  const [specklebelly, setSpecklebelly] = useState(false);

  const handleToggle = (i) => {
    setSelectedOptions((prev) =>
      prev.includes(i) ? prev.filter((idx) => idx !== i) : [...prev, i],
    );
  };

  const handleBack = () => {
    navigate("/estimate/pond-info");
  };

  const handleNext = () => {
    const selectedOptionDetails = selectedOptions.map((i) => ({
      ...apiData.options[i],
      stock: apiData.stock[i],
    }));

    const finalData = {
      pondType: type,
      selectedOptions: selectedOptionDetails,
      grassCarp: {
        selected: grassCarpSelected,
        quantity: grassCarpQty,
        total: apiData.grassCarpPrice * grassCarpQty,
      },
      hybridChoice:
        config.title === "Hybrid Bream Pond Estimator"
          ? {
              regularHybrid,
              specklebelly,
            }
          : null,
      breakdown: apiData.breakdownValues,
    };

    setFormData(finalData);

    console.log("FINAL FORM DATA 👉", finalData);

    navigate("/estimate/availability");
  };

  // 🔥 MOCK API (replace later)
  useEffect(() => {
    const random = () => Math.floor(Math.random() * 500);
    setApiData({
      options: [
        { label: "Small Fish Option", size: "1-3 inch", price: 120 },
        { label: "Medium Fish Option", size: "3-4 inch", price: 220 },
        { label: "Large Fish Option", size: "4-5 inch", price: 350 },
        {
          label: "1 Year Old Population",
          size: "1 inch to Catchable",
          price: 500,
        },
      ],
      stock: [
        [100, 50, 25, 200, 120],
        [200, 100, 50, 300, 80],
        [300, 150, 75, 400, 90],
      ],
      breakdownValues: [50, 100, 200, 30, 60, 120, 500, 25],
      grassCarpPrice: 5.75,
      notes: ["$750 minimum"],
    });
  }, [type]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!apiData) return null;

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
          padding: { xs: 0, sm: "0" },
          //my: { xs: 1, md: 2 },
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
        >
          <Paper
            sx={{
              padding: { xs: 1, sm: 4 },
              borderRadius: 1,
            }}
          >
            <Box textAlign="center" mb={4} mt={2}>
              {/* Header */}
              <Typography
                textAlign="center"
                sx={{
                  fontWeight: 600,
                  color: "primary.contrastText",
                }}
              >
                Page 3 / 5
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  color: "primary.light",
                  fontWeight: 500,
                }}
              >
                {config.title}
              </Typography>
            </Box>

            {/* Progress */}
            <LinearProgress
              variant="determinate"
              value={60}
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

            {/* Note and Description */}
            <Box>
              <Typography
                //fontSize="1.125rem"
                fontWeight="bold"
                color="primary.contrastText"
                mb={2}
              >
                Note: {config.description}
              </Typography>
              <Typography
                fontSize="0.875rem"
                color="primary.contrastText"
                mb={2}
              >
                Select the option that best describes your pond. A
                representative will contact you to confirm the estimate and
                discuss stocking options prior to delivery.
              </Typography>
            </Box>

            {/* TABLE */}
            <Box sx={{ overflowX: "auto", width: "100%" }} mb={4}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "rgba(255,255,255,0.2)" }}>
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
                        sx={{ background: FIXED_OPTIONS[i].color }}
                      >
                        <TableCell sx={{ color: "text.dark" }}>
                          {opt.label}
                        </TableCell>
                        <TableCell sx={{ color: "text.dark" }}>
                          {opt.size}
                        </TableCell>
                        <TableCell sx={{ color: "text.dark" }}>
                          ${opt.price}
                        </TableCell>
                        <TableCell sx={{ color: "text.dark" }}>
                          <Checkbox
                            sx={{ color: "text.dark" }}
                            checked={selectedOptions.includes(i)}
                            onChange={() => handleToggle(i)}
                          />
                        </TableCell>

                        {/* STOCK VALUES */}
                        {config.columns.map((_, idx) => (
                          <TableCell
                            key={idx}
                            align="center"
                            sx={{ color: "text.dark" }}
                          >
                            {!isFourthRow ? apiData.stock[i][idx] : ""}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* 🔵 BLUE SECTION */}
              <Table sx={{ background: FIXED_OPTIONS[3].color}}>
                <TableHead>
                  <TableRow>
                    {config.breakdownHeaders.map((h, i) => (
                      <TableCell
                        key={i}
                        align="center"
                        sx={{ color: "text.dark" }}
                      >
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
                      <TableCell
                        key={i}
                        align="center"
                        sx={{ color: "text.dark" }}
                      >
                        {apiData.breakdownValues[i] || 0}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>

            {/* Grass Carp */}
            <Box mt={4} p={2}>
              <Typography fontWeight="bold" sx={{ color: "text.primary" }}>
                ADD 8 to 10 inch TRIPLOID GRASS CARP
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                flexDirection={{ xs: "column", md: "row" }}
                gap={2}
                mt={2}
              >
                <TextField
                  type="number"
                  size="small"
                  value={grassCarpQty}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0) {
                      setGrassCarpQty(value);
                    }
                  }}
                  sx={{ ...textFieldSx }}
                />

                <Typography sx={{ color: "text.primary" }}>
                  $ {apiData.grassCarpPrice * grassCarpQty}
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
            </Box>
            {/* Additional Info for hybrid bream */}
            {config.title === "Hybrid Bream Pond Estimator" && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  border: "1px solid #e0e0e0",
                }}
              >
                {/* Info Text */}
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "text.secondary",
                    mb: 1.5,
                  }}
                >
                  Specklebelly can be substituted for regular hybrid bream.
                </Typography>

                {/* Options */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={regularHybrid}
                        onChange={(e) => {
                          setRegularHybrid(e.target.checked);
                          if (e.target.checked) setSpecklebelly(false); // optional mutual exclusivity
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
                          setSpecklebelly(e.target.checked);
                          if (e.target.checked) setRegularHybrid(false);
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

            {/* Notes */}
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

            {/* NAV */}
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

              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next <ArrowRightIcon />
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
