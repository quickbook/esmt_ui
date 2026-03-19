import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper } from "../components/Stepper";
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
import { newPondOptions, oldPondOptions } from "./PondInfo";

export function Quote() {
  const navigate = useNavigate();
  const { data, reset } = useEstimateForm();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const customer = data.customer;
  const pondInfo = data.pondInfo;
  const estimator = data.estimator;
  const availability = data.availability;

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
                {estimator.pondTypeTitle || estimator.pondType || "Pond"}{" "}
                Estimator
              </Typography>

              <Box sx={{ ...glassBoxStyles, p: 3, borderRadius: 2 }}>
                {selectedOptions.length === 0 ? (
                  <Typography color="text.secondary" align="center">
                    No estimator options selected
                  </Typography>
                ) : (
                  selectedOptions.map((opt, idx) => {
                    // Check if we have stockDetails (for small, medium, large)
                    const hasStockDetails =
                      opt.stockDetails && opt.stockDetails.length > 0;
                    // Check if we have breakdown (for 1 year old)
                    const hasBreakdown =
                      opt.breakdown && opt.breakdown.length > 0;

                    return (
                      <Box key={idx}>
                        {/* Option Header with Package Price */}
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

                        {/* Stock Details - For small, medium, large options - Simple format like 1 year old */}
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
                                      {item.quantity} {item.unit}
                                    </strong>
                                  </Typography>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        )}

                        {/* Breakdown for 1 Year Old Population */}
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
                                      {item.quantity} {item.unit}
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
                  })
                )}

                {/* Grass Carp */}
                {grassCarp.selected && (
                  <>
                    <Divider
                      sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography color="text.primary" fontWeight={600}>
                          {grassCarp.description ||
                            "8 to 10 inch Triploid Grass Carp"}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          Quantity: {grassCarp.quantity}
                        </Typography>
                      </Box>
                      <Typography
                        color="primary.light"
                        fontWeight={700}
                        fontSize="1.2rem"
                      >
                        {formatCurrency(grassCarp.total || 0)}
                      </Typography>
                    </Box>
                  </>
                )}

                {/* Hybrid Choice */}
                {estimator.hybridChoice &&
                  (estimator.hybridChoice.regularHybrid ||
                    estimator.hybridChoice.specklebelly) && (
                    <>
                      <Divider
                        sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }}
                      />
                      <Box>
                        <Typography color="text.primary" fontWeight={600}>
                          Hybrid Bream Selection:
                        </Typography>
                        <Typography color="text.secondary">
                          {estimator.hybridChoice.regularHybrid &&
                            "✓ Regular Hybrid"}
                          {estimator.hybridChoice.specklebelly &&
                            "✓ Specklebelly"}
                        </Typography>
                      </Box>
                    </>
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
                value: "March 30, 2026",
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
