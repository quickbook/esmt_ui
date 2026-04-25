import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEstimateForm } from "../contexts/EstimateFormContext";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import { ArrowLeft, CheckCircle, FileText, Mail } from "lucide-react";
import { glassBoxStyles } from "../utils/glassStyles";
import { useSelector, useDispatch } from "react-redux";
import { clearPondEstimateData } from "../redux/Slices/pondEstimateSlice";
import { mockQuotes, ESTIMATOR_LABELS } from "../api/mockQuotes";

// ─── helpers ─────────────────────────────────────────────────────────────────
const formatCurrency = (amount) =>
  typeof amount === "number" ? `$${amount.toFixed(2)}` : "—";

// Codes that use PondEstimator (new pond packages flow)
const POND_ESTIMATOR_TYPES = new Set([
  "FISH_TROPHY_BASS",
  "FISH_QUALITY_BASS_BREAM",
  "FISH_VARIETY_SPECIES",
  "FISH_CATFISH",
  "FISH_BIG_BREAM_SMALL_POND",
]);

// ─────────────────────────────────────────────────────────────────────────────
// NEW POND — PondEstimator section
// Renders exactly like the original Quote page: package label + size header,
// stock-detail grid (or breakdown grid for YEAR1), add-ons list.
// ─────────────────────────────────────────────────────────────────────────────
function PondEstimatorSection({ estimator, pondInfo, formatCurrency }) {
  const selectedOptions = estimator.selectedOptions || [];
  const addons = estimator.addons || [];

  return (
    <Box sx={{ ...glassBoxStyles, p: 3, borderRadius: 2 }}>
      {/* ── packages ── */}
      {selectedOptions.length > 0 ? (
        selectedOptions.map((opt, idx) => {
          const hasStockDetails =
            opt.stockDetails && opt.stockDetails.length > 0;
          const hasBreakdown = opt.breakdown && opt.breakdown.length > 0;

          return (
            <Box key={idx}>
              {/* Package header row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { sm: "center" },
                  flexDirection: { xs: "column", sm: "row" },
                  mb: 2,
                  pb: 1,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Box>
                  <Typography
                    color="text.primary"
                    fontWeight={600}
                    fontSize="1.1rem"
                  >
                    {opt.label}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Size: {opt.size}
                  </Typography>
                </Box>
                <Typography
                  color="primary.light"
                  fontWeight={700}
                  fontSize="1.2rem"
                >
                  {formatCurrency(opt.price || 0)}
                </Typography>
              </Box>

              {/* stockDetails — regular packages (SMALL / MEDIUM / LARGE) */}
              {hasStockDetails && (
                <Box sx={{ mb: 3, ml: 2 }}>
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                    gutterBottom
                  >
                    Stock Quantities:
                  </Typography>
                  <Grid container spacing={2}>
                    {opt.stockDetails.map((item, i) => (
                      <Grid size={{ xs: 12, sm: 4 }} key={i}>
                        <Typography color="text.primary" variant="body2">
                          {item.fishName}:{" "}
                          <strong>
                            {item.quantity}{" "}
                            {item.unit?.toUpperCase() === "FISH"
                              ? "Head"
                              : item.unit?.toUpperCase() === "POUNDS"
                                ? "Pounds"
                                : item.unit}
                          </strong>
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* breakdown — YEAR1 mature-population package */}
              {hasBreakdown && (
                <Box sx={{ mb: 3, ml: 2 }}>
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                    gutterBottom
                  >
                    Stock Quantities:
                  </Typography>
                  <Grid container spacing={2}>
                    {opt.breakdown.map((item, i) => (
                      <Grid size={{ xs: 6, sm: 4 }} key={i}>
                        <Typography color="text.primary" variant="body2">
                          {item.fishName}:{" "}
                          <strong>
                            {item.quantity}{" "}
                            {item.unit === "FISH"
                              ? "Head"
                              : item.unit === "POUNDS"
                                ? "Pounds"
                                : item.unit}
                          </strong>
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {idx < selectedOptions.length - 1 && (
                <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />
              )}
            </Box>
          );
        })
      ) : (
        <Typography color="text.secondary" align="center">
          No packages selected.
        </Typography>
      )}

      {/* ── add-ons ── */}
      {addons.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ color: "primary.light", mb: 2 }}
          >
            Add-ons
          </Typography>
          {addons.map((addon, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                mb: 1,
                p: 2,
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
              }}
            >
              <Typography color="text.primary" fontWeight={600}>
                {addon.name}
              </Typography>
              <Typography color="text.primary" fontWeight={500}>
                Quantity: {addon.quantity}
              </Typography>
              <Typography color="text.primary" fontWeight={700}>
                Total: {formatCurrency(addon.total)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* ── grass carp add-on ── */}
      {estimator.grassCarp?.selected && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            mt: 2,
            p: 2,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
          }}
        >
          <Typography color="text.primary" fontWeight={600}>
            Grass Carp
          </Typography>
          <Typography color="text.primary" fontWeight={500}>
            Quantity: {estimator.grassCarp.quantity}
          </Typography>
          <Typography color="text.primary" fontWeight={700}>
            Total: {formatCurrency(estimator.grassCarp.total)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OLD POND estimator sections — identical table/box format as original Quote
// ─────────────────────────────────────────────────────────────────────────────

function AdultFishSection({ estimator }) {
  const { adultFishData = [], totalCostLess450, totalCostMore450 } = estimator;
  return (
    <Box sx={{ ...glassBoxStyles, p: 3, borderRadius: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#537D96" }}>
            {[
              "Fish Type",
              "Size",
              "Quantity (pounds)",
              "Price/lb",
              "Total",
            ].map((h) => (
              <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {adultFishData
            .filter((f) => f.quantity > 0)
            .map((fish, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {fish.name}
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {fish.size}
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {fish.quantity} lbs
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {formatCurrency(fish.pricePerPound)}
                </TableCell>
                <TableCell
                  sx={{ color: "primary.contrastText", fontWeight: "bold" }}
                >
                  {formatCurrency(fish.quantity * fish.pricePerPound)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box mt={3} display="flex" flexDirection="column" gap={2}>
        {totalCostLess450 > 0 && (
          <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            sx={{ ...glassBoxStyles, borderRadius: 2 }}
          >
            <Typography color="text.disabled">Less Than 450 Pounds</Typography>
            <Typography color="text.primary" fontWeight="bold">
              {formatCurrency(totalCostLess450)}
            </Typography>
          </Box>
        )}
        {totalCostMore450 > 0 && (
          <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            sx={{ ...glassBoxStyles, borderRadius: 2 }}
          >
            <Typography color="text.disabled">More Than 450 Pounds</Typography>
            <Typography color="text.primary" fontWeight="bold">
              {formatCurrency(totalCostMore450)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function FeedBassSection({ estimator }) {
  const {
    feedBassData = [],
    totalCostLess12000,
    totalCostMore12000,
  } = estimator;
  return (
    <Box sx={{ ...glassBoxStyles, p: 3, borderRadius: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#537D96" }}>
            {["Fish Type", "Quantity", "Unit", "Price", "Total"].map((h) => (
              <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {feedBassData
            .filter((f) => f.quantity > 0)
            .map((fish, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {fish.name}
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {fish.quantity}
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {fish.unit === "FISH"
                    ? "Head"
                    : fish.unit === "POUNDS"
                      ? "Pounds"
                      : fish.unit}
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {formatCurrency(fish.price)}
                </TableCell>
                <TableCell
                  sx={{ color: "primary.contrastText", fontWeight: "bold" }}
                >
                  {formatCurrency(fish.quantity * fish.price)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box mt={3} display="flex" flexDirection="column" gap={2}>
        {totalCostLess12000 > 0 && (
          <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            sx={{ ...glassBoxStyles, borderRadius: 2 }}
          >
            <Typography color="text.disabled">
              Less than 12,000 bream or 600 lbs minnows/shiners
            </Typography>
            <Typography color="text.primary" fontWeight="bold">
              {formatCurrency(totalCostLess12000)}
            </Typography>
          </Box>
        )}
        {totalCostMore12000 > 0 && (
          <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            sx={{ ...glassBoxStyles, borderRadius: 2 }}
          >
            <Typography color="text.disabled">
              More than 12,000 bream or 600 lbs minnows/shiners
            </Typography>
            <Typography color="text.primary" fontWeight="bold">
              {formatCurrency(totalCostMore12000)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function GrassCarpSection({ estimator }) {
  const {
    grassCarpData = [],
    totalCostLess1000,
    totalCostMore1000,
  } = estimator;
  return (
    <Box sx={{ ...glassBoxStyles, p: 3, borderRadius: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#537D96" }}>
            {["Size", "Quantity", "Unit", "Price/Fish", "Total"].map((h) => (
              <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {grassCarpData
            .filter((f) => f.quantity > 0)
            .map((fish, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {fish.name}
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {fish.quantity}
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {fish.unit === "FISH"
                    ? "Head"
                    : fish.unit === "POUNDS"
                      ? "Pounds"
                      : fish.unit}
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {formatCurrency(fish.price)}
                </TableCell>
                <TableCell
                  sx={{ color: "primary.contrastText", fontWeight: "bold" }}
                >
                  {formatCurrency(fish.quantity * fish.price)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box mt={3} display="flex" flexDirection="column" gap={2}>
        {totalCostLess1000 > 0 && (
          <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            sx={{ ...glassBoxStyles, borderRadius: 2 }}
          >
            <Typography color="text.disabled">Less than 1000 Fish</Typography>
            <Typography color="text.primary" fontWeight="bold">
              {formatCurrency(totalCostLess1000)}
            </Typography>
          </Box>
        )}
        {totalCostMore1000 > 0 && (
          <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            sx={{ ...glassBoxStyles, borderRadius: 2 }}
          >
            <Typography color="text.disabled">More than 1000 Fish</Typography>
            <Typography color="text.primary" fontWeight="bold">
              {formatCurrency(totalCostMore1000)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function AlaCarteSection({ estimator }) {
  const { alaCarteData = [], alaCarteTotal } = estimator;
  return (
    <Box sx={{ ...glassBoxStyles, p: 3, borderRadius: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#537D96" }}>
            {["Species", "Size", "Quantity", "Unit", "Price/Unit", "Total"].map(
              (h) => (
                <TableCell key={h} sx={{ color: "white", fontWeight: "bold" }}>
                  {h}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {alaCarteData
            .filter((i) => i.quantity > 0)
            .map((item, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {item.name}
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {item.size}
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {item.quantity}
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {item.unit === "FISH"
                    ? "Head"
                    : item.unit === "POUNDS"
                      ? "Pounds"
                      : item.unit}
                </TableCell>
                <TableCell sx={{ color: "primary.contrastText" }}>
                  {formatCurrency(item.pricePerUnit)}
                </TableCell>
                <TableCell
                  sx={{ color: "primary.contrastText", fontWeight: "bold" }}
                >
                  {formatCurrency(item.quantity * item.pricePerUnit)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box
        mt={3}
        display="flex"
        justifyContent="space-between"
        p={2}
        sx={{ ...glassBoxStyles, borderRadius: 2 }}
      >
        <Typography color="text.disabled">Total Fish Cost</Typography>
        <Typography color="text.primary" fontWeight="bold">
          {formatCurrency(alaCarteTotal || 0)}
        </Typography>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Estimator section title resolver (matches original Quote logic exactly)
// ─────────────────────────────────────────────────────────────────────────────
function getEstimatorTitle(pondInfo, estimator) {
  const pondType = pondInfo?.pondType; // "NEW" | "OLD" | "new" | "old"
  const selectedOpt = pondInfo?.selectedOption; // e.g. "ADD_CATCHABLE_FISH"
  const estimatorType = estimator?.pondType; // stored in estimator for admin view

  const isNew = pondType === "NEW" || pondType === "new";

  if (isNew) {
    return estimator?.pondTypeTitle || estimator?.pondType || "Pond Estimator";
  }

  // OLD pond — derive label from selectedOption or estimatorType
  const code = selectedOpt || estimatorType;
  switch (code) {
    case "ADD_CATCHABLE_FISH":
      return "Adult Fish Estimator";
    case "FEED_POND_BASS":
      return "Feed Bass Estimator";
    case "STOCK_GRASS_CARP":
      return "Grass Carp Estimator";
    case "CUSTOM_STOCKING":
      return "Ala Carte Estimator";
    default:
      return "Pond Estimator";
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Dispatcher — picks the right estimator section
// ─────────────────────────────────────────────────────────────────────────────
function EstimatorSection({ estimator, pondInfo }) {
  // Resolve the type from either pondInfo.selectedOption (context flow)
  // or estimator.pondType (admin/mock flow)
  const code = pondInfo?.selectedOption || estimator?.pondType;

  if (POND_ESTIMATOR_TYPES.has(code)) {
    return (
      <PondEstimatorSection
        estimator={estimator}
        pondInfo={pondInfo}
        formatCurrency={formatCurrency}
      />
    );
  }
  if (code === "CUSTOM_STOCKING") {
    return <AlaCarteSection estimator={estimator} />;
  }
  if (code === "ADD_CATCHABLE_FISH") {
    return <AdultFishSection estimator={estimator} />;
  }
  if (code === "FEED_POND_BASS") {
    return <FeedBassSection estimator={estimator} />;
  }
  if (code === "STOCK_GRASS_CARP") {
    return <GrassCarpSection estimator={estimator} />;
  }

  // fallback for any unknown type — show whatever is in selectedOptions
  return (
    <Box sx={{ ...glassBoxStyles, p: 3, borderRadius: 2 }}>
      <Typography color="text.secondary" align="center">
        No estimator data available.
      </Typography>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Quote component
// Props:
//   adminQuoteData  – full quote object passed from OrderDetailsPage dialog.
//                     When present it overrides context data entirely.
//                     When absent, Quote uses context (normal customer flow).
// ─────────────────────────────────────────────────────────────────────────────
export function Quote({ adminQuoteData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams() || {};
  const { data: contextData, reset } = useEstimateForm();

  const hearAboutOptions = useSelector(
    (state) => state.domain.leadSources || [],
  );
  const pondAccessOptions = useSelector(
    (state) => state.domain.pondAccess || [],
  );
  const fishSpeciesOptions = useSelector(
    (state) => state.domain.fishSpecies || [],
  );
  const pondOptions = useSelector(
    (state) => state.domain.pondOptions || { NEW: [], OLD: [] },
  );
  const newPondOptions = pondOptions.NEW || [];
  const oldPondOptions = pondOptions.OLD || [];

  const [resolvedData, setResolvedData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // ── resolve data source ────────────────────────────────────────────────────
  useEffect(() => {
    if (adminQuoteData) {
      setResolvedData(adminQuoteData);
    } else if (id) {
      const found = mockQuotes.find((q) => q.quoteId === id);
      setResolvedData(found || null);
    } else {
      setResolvedData(contextData);
    }
  }, [adminQuoteData, id, contextData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!resolvedData) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="text.secondary">Quote not found.</Typography>
      </Box>
    );
  }

  const { customer, pondInfo, estimator, availability } = resolvedData;

  const isAdminView = Boolean(adminQuoteData || id);

  const today = new Date();
  const validity = new Date(new Date().setDate(today.getDate() + 30));

  const grassCarp = estimator?.grassCarp || {
    selected: false,
    quantity: 0,
    total: 0,
  };
  const selectedOptions = estimator?.selectedOptions || [];
  const totalPrice =
    typeof estimator?.totalPrice === "number"
      ? estimator.totalPrice
      : selectedOptions.reduce((sum, opt) => sum + (opt.price || 0), 0) +
        (grassCarp.total || 0);

  const estimatorTitle = getEstimatorTitle(pondInfo, estimator);

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: isAdminView ? "unset" : "84vh", py: 4, px: 2 }}>
      <Box sx={{ maxWidth: { xs: "100%", sm: 1200 }, mx: "auto" }}>
        <Paper
          sx={{
            borderRadius: 3,
            p: { xs: 3, md: 5 },
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          }}
        >
          {/* ── Header ── */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                bgcolor: "rgba(68,161,148,0.5)",
                borderRadius: "50%",
                mb: 2,
              }}
            >
              <CheckCircle size={40} />
            </Box>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: "primary.light", mb: 0.5 }}
            >
              Quote Summary
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Review your pond service estimate below
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            {/* ── Quote ID bar ── */}
            <Box
              sx={{
                mb: 2,
                p: 2,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
                borderRadius: 2,
                backgroundColor: "rgba(68, 161, 148, 0.1)",
                border: "1px solid rgba(68, 161, 148, 0.3)",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {/* Quote ID: {estimator?.quoteId || `Q-${new Date().getTime()}`} */}
                Quote ID: {estimator?.quoteId || `Q-New`}
              </Typography>
              {/* estimator chip — visible in admin view */}
              {isAdminView && (
                <Chip
                  label={
                    ESTIMATOR_LABELS[estimator?.pondType] || estimatorTitle
                  }
                  size="small"
                  sx={{
                    bgcolor: "rgba(68,161,148,0.2)",
                    color: "#44A194",
                    border: "1px solid rgba(68,161,148,0.4)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                  }}
                />
              )}
              <Typography variant="subtitle1" fontWeight={600}>
                Date:{" "}
                {resolvedData.createdAt
                  ? new Date(resolvedData.createdAt).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </Typography>
            </Box>

            {/* ── Customer Info ── */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "primary.light", mb: 2 }}
              >
                Customer Information
              </Typography>
              <Box sx={{ ...glassBoxStyles, p: 2, borderRadius: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.disabled">
                      Full Name
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {customer?.fullName || "—"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.disabled">
                      Email
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {customer?.email || "—"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.disabled">
                      Email to send a written quote
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {customer?.quoteEmail || "—"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.disabled">
                      Phone
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {customer?.phone || "—"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.disabled">
                      Address
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {customer?.address || "—"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.disabled">
                      How did you hear about us?
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {hearAboutOptions.find(
                        (o) => o.id === customer?.hearAbout,
                      )?.name || "—"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* ── Pond Info ── */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "primary.light", mb: 2 }}
              >
                Pond Information
              </Typography>
              <Box sx={{ ...glassBoxStyles, p: 2, borderRadius: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="body2" color="text.disabled">
                      Pond Size
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {pondInfo?.pondSize ? `${pondInfo.pondSize} acres` : "—"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="body2" color="text.disabled">
                      Distance from Lonoke
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {pondInfo?.distance ? `${pondInfo.distance} miles` : "—"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="body2" color="text.disabled">
                      Pond Access
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {pondAccessOptions.find(
                        (o) => o.id === pondInfo?.pondAccess,
                      )?.name || "—"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* ── Pond Selection ── */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "primary.light", mb: 2 }}
              >
                Pond Selection
              </Typography>
              <Box sx={{ ...glassBoxStyles, p: 2, borderRadius: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.disabled">
                      Pond Type
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {pondInfo?.pondType
                        ? pondInfo.pondType === "new" ||
                          pondInfo.pondType === "NEW"
                          ? "New Pond"
                          : "Old Pond"
                        : "—"}
                    </Typography>
                  </Grid>
                  {pondInfo?.hasFish && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="body2" color="text.disabled">
                        Existing Fish
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        fontWeight={500}
                      >
                        {fishSpeciesOptions
                          .filter((o) =>
                            pondInfo.selectedFish?.includes(o.code),
                          )
                          .map((o) => o.name)
                          .join(", ") || "None"}
                      </Typography>
                    </Grid>
                  )}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.disabled">
                      Selected Option
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {pondInfo?.pondType === "new" ||
                      pondInfo?.pondType === "NEW"
                        ? newPondOptions.find(
                            (op) => op.code === pondInfo.selectedOption,
                          )?.name ||
                          estimator?.pondTypeTitle ||
                          "—"
                        : oldPondOptions.find(
                            (op) => op.code === pondInfo?.selectedOption,
                          )?.name ||
                          ESTIMATOR_LABELS[estimator?.pondType] ||
                          "—"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* ── Estimator Details ── */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                  color: "primary.light",
                  mb: 2,
                  textTransform: "capitalize",
                }}
              >
                {estimatorTitle}
              </Typography>

              <EstimatorSection estimator={estimator} pondInfo={pondInfo} />
            </Box>

            {/* ── Availability ── */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "primary.light", mb: 2 }}
              >
                Availability
              </Typography>
              <Box sx={{ ...glassBoxStyles, p: 2, borderRadius: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.disabled">
                      Preferred Date
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {availability?.availableDate
                        ? new Date(
                            availability.availableDate,
                          ).toLocaleDateString(undefined, {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.disabled">
                      Preferred Time
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      {availability?.availableTime || "—"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* ── Additional Notes ── */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "primary.light", mb: 2 }}
              >
                Additional Notes
              </Typography>
              <Box sx={{ ...glassBoxStyles, p: 2, borderRadius: 2 }}>
                <Typography variant="body1" color="text.primary">
                  {estimator?.stockingDescription ||
                    "Estimated Price is calculated using pond size, fish size and distance from Lonoke, Arkansas. A Representative will contact you to confirm the estimate prior to fish delivery."}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ── Quote Total ── */}
          <Box
            sx={{
              backdropFilter: "blur(16px) saturate(180%)",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              border: "2px solid #44A194",
              borderRadius: 3,
              mb: 4,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#44A194",
                px: 4,
                py: 2.5,
              }}
            >
              <Typography
                fontWeight={700}
                sx={{ color: "white", fontSize: "1.125rem" }}
              >
                Estimated Total
              </Typography>
              <Typography
                fontWeight={700}
                sx={{ color: "white", fontSize: "1.875rem" }}
              >
                {formatCurrency(totalPrice)}
              </Typography>
            </Box>
          </Box>

          {/* ── Important Note ── */}
          <Box
            sx={{
              bgcolor: "rgba(236,143,141,0.1)",
              border: "1px solid rgba(236,143,141,0.3)",
              borderRadius: 2,
              p: 2.5,
              mb: 4,
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
            }}
          >
            <FileText
              size={20}
              color="#EC8F8D"
              style={{ marginTop: 2, flexShrink: 0 }}
            />
            <Box>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ color: "primary.light", mb: 0.5 }}
              >
                Important Note:
              </Typography>
              <Typography variant="body2" sx={{ color: "primary.light" }}>
                This is an estimated quote. Final pricing will be confirmed
                prior to delivery during our follow up call with you. Our team
                will contact you within 24 hours to discuss details.
              </Typography>
            </Box>
          </Box>

          {/* ── Info Cards ── */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              {
                icon: <Mail size={24} color="#44A194" />,
                label: "Email Confirmation",
                value: "Quote sent to your email",
              },
              {
                icon: <CheckCircle size={24} color="#44A194" />,
                label: "Valid Until",
                value: validity.toLocaleDateString(),
              },
            ].map((card) => (
              <Grid size={{ xs: 12, sm: 6 }} key={card.label}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 2,
                    ...glassBoxStyles,
                    borderRadius: 2,
                  }}
                >
                  {card.icon}
                  <Box>
                    <Typography variant="caption" color="text.disabled">
                      {card.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{ color: "primary.light" }}
                    >
                      {card.value}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* ── Navigation buttons — hidden in admin view ── */}
          {!isAdminView && (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Button
                onClick={() => navigate("/estimate/customer-info")}
                startIcon={<ArrowLeft size={20} />}
                sx={{
                  px: 3,
                  py: 1.5,
                  bgcolor: "grey.200",
                  color: "secondary.main",
                  fontWeight: 500,
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "grey.300", boxShadow: "none" },
                }}
              >
                Edit Details
              </Button>
              <Button
                onClick={() => {
                  setSnackbarOpen(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setTimeout(() => {
                    reset();
                    dispatch(clearPondEstimateData());
                    navigate("/");
                  }, 3000);
                }}
                startIcon={<CheckCircle size={20} />}
                sx={{
                  px: 4,
                  py: 1.5,
                  background: "linear-gradient(to right, #44A194, #599b92)",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    background:
                      "linear-gradient(to right, #44A194, primary.light)",
                    boxShadow: "0 8px 24px rgba(68,161,148,0.4)",
                    transform: "scale(1.02)",
                  },
                  transition: "all 0.2s",
                }}
              >
                Confirm Quote
              </Button>
            </Box>
          )}
        </Paper>
      </Box>

      {!isAdminView && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Quote confirmed! We'll contact you shortly.
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
