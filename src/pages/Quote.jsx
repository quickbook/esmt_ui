import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { ArrowLeft, CheckCircle, FileText, Mail } from "lucide-react";
import { glassBoxStyles } from "../utils/glassStyles";
import { mockEstimateOptionsApiData, pondConfigs } from "../api/mockApiData";
import { useSelector } from "react-redux";

export function Quote() {
  const navigate = useNavigate();
  const { data, reset } = useEstimateForm();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const pondOptions = useSelector(
    (state) => state.domain.pondOptions || { NEW: [], OLD: [] },
  );
  const newPondOptions = pondOptions.NEW || [];
  const oldPondOptions = pondOptions.OLD || [];

  const customer = data.customer;
  const pondInfo = data.pondInfo;
  const estimator = data.estimator;
  const availability = data.availability;
  const today = new Date();
  const validity = new Date(today.setDate(today.getDate() + 30));

  const apiData = mockEstimateOptionsApiData;
  const pondType =
    estimator.pondType || pondInfo.selectedOption || "trophy-bass";
  const config = pondConfigs[pondType] || pondConfigs["trophy-bass"];

  const grassCarp = estimator.grassCarp || {
    selected: false,
    quantity: 0,
    total: 0,
  };

  const selectedOptions = estimator.selectedOptions || [];

  const totalPrice =
    typeof estimator.totalPrice === "number"
      ? estimator.totalPrice
      : selectedOptions.reduce((sum, opt) => sum + (opt.price || 0), 0) +
        (grassCarp.total || 0);

  const handleEdit = () => {
    navigate("/estimate/customer-info");
  };

  const handleConfirm = () => {
    setSnackbarOpen(true);

    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      reset();
      navigate("/");
    }, 3000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  // Helper function to format column headers for display
  const formatColumnHeader = (col) => {
    const parts = col.split("-");
    const unit = parts[0];
    const fish = parts.slice(1).join(" ");
    return { unit, fish };
  };

  // Get stock quantities for each option
  const getStockQuantities = (opt) => {
    if (!opt.stock || !config) return [];

    return config.columns.map((col, colIdx) => {
      const { unit, fish } = formatColumnHeader(col);
      const quantity = opt.stock[colIdx] || 0;
      return { fish, unit, quantity };
    });
  };

  return (
    <Box sx={{ minHeight: "84vh", py: 4, px: 2 }}>
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
          {/* Header */}
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

          {/* Data Sections */}
          <Box sx={{ mb: 4 }}>
            {/* Quote header */}
            <Box
              sx={{
                mb: 2,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 2,
                backgroundColor: "rgba(68, 161, 148, 0.1)",
                border: "1px solid rgba(68, 161, 148, 0.3)",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Quote ID: {estimator.quoteId || `Q-${new Date().getTime()}`}
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                Date: {new Date().toLocaleDateString()}
              </Typography>
            </Box>

            {/* Customer Info */}
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
                      {customer.fullName || "—"}
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
                      {customer.email || "—"}
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
                      {customer.phone || "—"}
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
                      {customer.address || "—"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {/* Pond Info */}
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
                      {pondInfo.pondSize ? `${pondInfo.pondSize} acres` : "—"}
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
                      {pondInfo.distance ? `${pondInfo.distance} miles` : "—"}
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
                      {pondInfo.pondAccess || "—"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {/* Pond Selection */}
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
                      {pondInfo.pondType
                        ? pondInfo.pondType === "new"
                          ? "New Pond"
                          : "Existing Pond"
                        : "—"}
                    </Typography>
                  </Grid>
                  {pondInfo.hasFish && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="body2" color="text.disabled">
                        Existing Fish
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        fontWeight={500}
                      >
                        {pondInfo.selectedFish.join(", ")}
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
                      {pondInfo.pondType === "new"
                        ? newPondOptions.find(
                            (op) => op.value === pondInfo.selectedOption,
                          )?.label
                        : pondInfo.pondType === "old"
                          ? oldPondOptions.find(
                              (op) => op.value === pondInfo.selectedOption,
                            )?.label
                          : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {/* Pond Estimator Details */}

            {/* Pond Estimator Details */}
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
                {pondInfo.pondType === "new"
                  ? (estimator.pondTypeTitle || estimator.pondType || "Pond") +
                    " Estimator"
                  : pondInfo.selectedOption === "adult-fish"
                    ? "Adult Fish Estimator"
                    : pondInfo.selectedOption === "feed-bass"
                      ? "Feed Bass Estimator"
                      : pondInfo.selectedOption === "grass-carp"
                        ? "Grass Carp Estimator"
                        : pondInfo.selectedOption === "ala-carte"
                          ? "Ala Carte Estimator"
                          : "Pond Estimator"}
              </Typography>

              <Box sx={{ ...glassBoxStyles, p: 3, borderRadius: 2 }}>
                {/* New Pond Estimator Options (PondEstimator) */}
                {pondInfo.pondType === "new" &&
                  selectedOptions.length > 0 &&
                  selectedOptions.map((opt, idx) => {
                    const hasStockDetails =
                      opt.stockDetails && opt.stockDetails.length > 0;
                    const hasBreakdown =
                      opt.breakdown && opt.breakdown.length > 0;

                    return (
                      <Box key={idx}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                                <Grid size={{ xs: 6, sm: 4 }} key={i}>
                                  <Typography
                                    color="text.primary"
                                    variant="body2"
                                  >
                                    {item.fishName}:{" "}
                                    <strong>
                                      {item.quantity}{" "}
                                      {item.unit.toUpperCase() === "FISH"
                                        ? "Head"
                                        : item.unit.toUpperCase() === "POUNDS"
                                          ? "Pounds"
                                          : item.unit}
                                    </strong>
                                  </Typography>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        )}

                        {hasBreakdown && (
                          <Box sx={{ mb: 3, ml: 2 }}>
                            <Typography
                              color="text.secondary"
                              variant="subtitle2"
                              gutterBottom
                            >
                              Mature Population Breakdown:
                            </Typography>
                            <Grid container spacing={2}>
                              {opt.breakdown.map((item, i) => (
                                <Grid size={{ xs: 6, sm: 4 }} key={i}>
                                  <Typography
                                    color="text.primary"
                                    variant="body2"
                                  >
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
                          <Divider
                            sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }}
                          />
                        )}
                      </Box>
                    );
                  })}

                {/* Add-ons */}
                {estimator.addons && estimator.addons.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ color: "primary.light", mb: 2 }}
                    >
                      Add-ons
                    </Typography>
                    {estimator.addons.map((addon, idx) => (
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

                {/* Adult Fish Estimator */}
                {pondInfo.selectedOption === "adult-fish" &&
                  estimator.adultFishData && (
                    <Box>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#537D96" }}>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Fish Type
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Size
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Quantity (pounds)
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Price/lb
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Total
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {estimator.adultFishData.map(
                            (fish, idx) =>
                              fish.quantity > 0 && (
                                <TableRow key={idx}>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {fish.name}
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {fish.size}
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {fish.quantity} lbs
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {formatCurrency(fish.pricePerPound)}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      color: "primary.contrastText",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {formatCurrency(
                                      fish.quantity * fish.pricePerPound,
                                    )}
                                  </TableCell>
                                </TableRow>
                              ),
                          )}
                        </TableBody>
                      </Table>

                      {/* Cost Estimates */}
                      <Box mt={3} display="flex" flexDirection="column" gap={2}>
                        {estimator.totalCostLess450 > 0 && (
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            p={2}
                            sx={{ ...glassBoxStyles, borderRadius: 2 }}
                          >
                            <Typography color="text.disabled">
                              Less Than 450 Pounds
                            </Typography>
                            <Typography color="text.primary" fontWeight="bold">
                              {formatCurrency(estimator.totalCostLess450)}
                            </Typography>
                          </Box>
                        )}
                        {estimator.totalCostMore450 > 0 && (
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            p={2}
                            sx={{ ...glassBoxStyles, borderRadius: 2 }}
                          >
                            <Typography color="text.disabled">
                              More Than 450 Pounds
                            </Typography>
                            <Typography color="text.primary" fontWeight="bold">
                              {formatCurrency(estimator.totalCostMore450)}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}

                {/* Feed Bass Estimator */}
                {pondInfo.selectedOption === "feed-bass" &&
                  estimator.feedBassData && (
                    <Box>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#537D96" }}>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Fish Type
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Quantity
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Unit
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Price
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Total
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {estimator.feedBassData.map(
                            (fish, idx) =>
                              fish.quantity > 0 && (
                                <TableRow key={idx}>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {fish.name}
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {fish.quantity}
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {fish.unit === "FISH"
                                      ? "Head"
                                      : fish.unit === "POUNDS"
                                        ? "Pounds"
                                        : fish.unit}
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {formatCurrency(fish.price)}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      color: "primary.contrastText",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {formatCurrency(fish.quantity * fish.price)}
                                  </TableCell>
                                </TableRow>
                              ),
                          )}
                        </TableBody>
                      </Table>

                      {/* Cost Estimates */}
                      <Box mt={3} display="flex" flexDirection="column" gap={2}>
                        {estimator.totalCostLess12000 > 0 && (
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
                              {formatCurrency(estimator.totalCostLess12000)}
                            </Typography>
                          </Box>
                        )}
                        {estimator.totalCostMore12000 > 0 && (
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
                              {formatCurrency(estimator.totalCostMore12000)}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}

                {/* Grass Carp Estimator */}
                {pondInfo.selectedOption === "grass-carp" &&
                  estimator.grassCarpData && (
                    <Box>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#537D96" }}>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Size
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Quantity
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Unit
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Price/Fish
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Total
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {estimator.grassCarpData.map(
                            (fish, idx) =>
                              fish.quantity > 0 && (
                                <TableRow key={idx}>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {fish.name}
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {fish.quantity}
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {fish.unit === "FISH"
                                      ? "Head"
                                      : fish.unit === "POUNDS"
                                        ? "Pounds"
                                        : fish.unit}
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {formatCurrency(fish.price)}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      color: "primary.contrastText",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {formatCurrency(fish.quantity * fish.price)}
                                  </TableCell>
                                </TableRow>
                              ),
                          )}
                        </TableBody>
                      </Table>

                      {/* Cost Estimates */}
                      <Box mt={3} display="flex" flexDirection="column" gap={2}>
                        {estimator.totalCostLess1000 > 0 && (
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            p={2}
                            sx={{ ...glassBoxStyles, borderRadius: 2 }}
                          >
                            <Typography color="text.disabled">
                              Less than 1000 Fish
                            </Typography>
                            <Typography color="text.primary" fontWeight="bold">
                              {formatCurrency(estimator.totalCostLess1000)}
                            </Typography>
                          </Box>
                        )}
                        {estimator.totalCostMore1000 > 0 && (
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            p={2}
                            sx={{ ...glassBoxStyles, borderRadius: 2 }}
                          >
                            <Typography color="text.disabled">
                              More than 1000 Fish
                            </Typography>
                            <Typography color="text.primary" fontWeight="bold">
                              {formatCurrency(estimator.totalCostMore1000)}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}

                {/* Ala Carte Estimator */}
                {pondInfo.selectedOption === "ala-carte" &&
                  estimator.alaCarteData && (
                    <Box>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#537D96" }}>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Species
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Size
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Quantity
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Unit
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Price/Unit
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", fontWeight: "bold" }}
                            >
                              Total
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {estimator.alaCarteData.map(
                            (item, idx) =>
                              item.quantity > 0 && (
                                <TableRow key={idx}>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {item.name}
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {item.size}
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {item.quantity}
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {item.unit === "FISH"
                                      ? "Head"
                                      : item.unit === "POUNDS"
                                        ? "Pounds"
                                        : item.unit}
                                  </TableCell>
                                  <TableCell
                                    sx={{ color: "primary.contrastText" }}
                                  >
                                    {formatCurrency(item.pricePerUnit)}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      color: "primary.contrastText",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {formatCurrency(
                                      item.quantity * item.pricePerUnit,
                                    )}
                                  </TableCell>
                                </TableRow>
                              ),
                          )}
                        </TableBody>
                      </Table>

                      {/* Total Cost */}
                      <Box
                        mt={3}
                        display="flex"
                        justifyContent="space-between"
                        p={2}
                        sx={{ ...glassBoxStyles, borderRadius: 2 }}
                      >
                        <Typography color="text.disabled">
                          Total Fish Cost
                        </Typography>
                        <Typography color="text.primary" fontWeight="bold">
                          {formatCurrency(estimator.alaCarteTotal || 0)}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                {/* No data message */}
                {pondInfo.pondType === "old" &&
                  !estimator.adultFishData &&
                  !estimator.feedBassData &&
                  !estimator.grassCarpData &&
                  !estimator.alaCarteData && (
                    <Typography color="text.secondary" align="center">
                      No estimator data available
                    </Typography>
                  )}
              </Box>
            </Box>
            {/* Availability */}
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
                      {availability.availableDate
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
                      {availability.availableTime || "—"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {/* Note */}
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
                  {estimator.stockingDescription ||
                    "Estimated Price is calculated using pond size, fish size and distance from Lonoke, Arkansas. A Representative will contact you to confirm the estimate prior to fish delivery."}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Quote Total */}
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

          {/* Important Note */}
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

          {/* Info Cards */}
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

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Button
              onClick={handleEdit}
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
              onClick={handleConfirm}
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
        </Paper>
      </Box>
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
    </Box>
  );
}
