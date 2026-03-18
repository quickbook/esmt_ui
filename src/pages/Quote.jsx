import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper } from "../components/Stepper";
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

export const selectedOptionsdata = {
  pondType: "trophy-bass",

  selectedOptions: [
    {
      label: "Small Fish Option",
      size: "1-3 inch",
      price: 220,
      stock: {
        "Head-Bluegill": 400,
        "Head-Redear": 120,
        "Head-Bass": 30,
        "Pounds-Minnows": 12,
        "Pounds-Shinners": 7,
      },
    },
    {
      label: "Medium Fish Option",
      size: "3-4 inch",
      price: 380,
      stock: {
        "Head-Bluegill": 800,
        "Head-Redear": 300,
        "Head-Bass": 75,
        "Pounds-Minnows": 15,
        "Pounds-Shinners": 8,
      },
    },
    {
      label: "1 Year Old Population",
      size: "1 inch to Catchable",
      price: 525,
      breakdown: {
        "Pounds - 5 to 6 inch Bluegill": 50,
        "Head - 3 to 4 inch Bluegill": 300,
        "Head - 1 to 3 inch Bluegill": 800,
        "Pounds - 5 to 6 inch Redear": 30,
        "Head - 3 to 4 inch Redear": 200,
        "Head - 1 to 3 inch Redear": 500,
        "Pounds - Minnows": 100,
        "Pounds - 12 to 15 inch Bass": 40,
      },
    },
  ],

  grassCarp: {
    selected: true,
    quantity: 5,
    pricePerUnit: 5.75,
    total: 28.75,
  },

  hybridChoice: null,

  totalPrice: 1228.75,
};
export function Quote() {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const data = selectedOptionsdata; // This would come from form state or API in a real app
  const apiData = mockEstimateOptionsApiData; // This would be fetched from an API in a real app
  const config = pondConfigs["trophy-bass"]; // This would be determined based on user selection in a real app

  // Mock selected options (these would come from form state in a real app)

  const handleEdit = () => {
    navigate("/estimate/customer-info");
  };

  const handleConfirm = () => {
    
    setSnackbarOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

          {/* Mock Data Sections */}
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
                      John Smith
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
                      john@email.com
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
                      123-456-7890
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
                      123 Main St, Lonoke, AR
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
                      1.5 acres
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
                      2.0 miles
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
                      Good solid road/driveway
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
                      New Pond
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.disabled">
                      Selected Option
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      Trophy Bass Pond
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* Trophy Pond Estimator */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "primary.light", mb: 2 }}
              >
                Trophy Bass Pond Estimator
              </Typography>
              <Box sx={{ ...glassBoxStyles, p: 2, borderRadius: 2 }}>
                {/* <Box sx={{ overflowX: "auto" }}>
                  <Table size="small" sx={{ border: "1px solid #ddd", minWidth: 600 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "rgba(68,161,148,0.1)" }}>
                      <TableCell>Option</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell align="center">Fish per Acre</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow >
                      <TableCell>Small Fish Option</TableCell>
                      <TableCell>1 to 3 inch fish</TableCell>
                      <TableCell align="center">500</TableCell>
                      <TableCell align="center">750</TableCell>
                      <TableCell align="center">$ 285.00</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell>Medium Fish Option</TableCell>
                      <TableCell>3 to 4 inch fish</TableCell>
                      <TableCell align="center">300</TableCell>
                      <TableCell align="center">450</TableCell>
                      <TableCell align="center">$ 427.50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Large Fish Option</TableCell>
                      <TableCell>4 to 5 inch fish</TableCell>
                      <TableCell align="center">200</TableCell>
                      <TableCell align="center">300</TableCell>
                      <TableCell align="center">$ 375.00</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell>1 Year Old Population</TableCell>
                      <TableCell>5 to 6 inch Bluegill</TableCell>
                      <TableCell align="center">50 lbs</TableCell>
                      <TableCell align="center">75 lbs</TableCell>
                      <TableCell align="center">$ 600.00</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell>Giant Fish Option</TableCell>
                      <TableCell>10 to 13 inch Bass</TableCell>
                      <TableCell align="center">20 lbs</TableCell>
                      <TableCell align="center">30 lbs</TableCell>
                      <TableCell align="center">$ 300.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                </Box> */}
                {/* OPTIONS */}
                {data.selectedOptions.map((opt, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      mb: 3,
                      p: 2,
                      border: "1px solid #ddd",
                      borderRadius: 2,
                    }}
                  >
                    {/* Title */}
                    <Box display="flex" justifyContent="space-between">
                      <Typography color="text.primary" fontWeight={500}>
                        {opt.label} ({opt.size})
                      </Typography>
                      <Typography
                        fontSize={"1.2rem"}
                        color="text.primary"
                        fontWeight={600}
                      >
                        ${opt.price}
                      </Typography>
                    </Box>

                    {/* STOCK DATA */}
                    {opt.stock && (
                      <Box mt={1}>
                        {Object.entries(opt.stock).map(([key, val]) => (
                          <Typography
                            color="text.primary"
                            key={key}
                            fontSize="0.875rem"
                          >
                            {key}:{" "}
                            <strong style={{ fontSize: "1rem" }}>{val}</strong>
                          </Typography>
                        ))}
                      </Box>
                    )}

                    {/* BREAKDOWN DATA */}
                    {opt.breakdown && (
                      <Box mt={1}>
                        {Object.entries(opt.breakdown).map(([key, val]) => (
                          <Typography
                            color="text.primary"
                            key={key}
                            fontSize="0.875rem"
                          >
                            {key}:{" "}
                            <strong style={{ fontSize: "1rem" }}>{val}</strong>
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}

                {/* GRASS CARP */}
                {data.grassCarp.selected && (
                  <Box
                    sx={{
                      mb: 3,
                      p: 2,
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="text.primary">
                      8 to 10 inch Grass Carp:{" "}
                      <strong style={{ fontSize: "1rem" }}>
                        {data.grassCarp.quantity}
                      </strong>
                    </Typography>
                    <Typography
                      fontSize={"1.2rem"}
                      color="text.primary"
                      fontWeight={500}
                    >
                      ${data.grassCarp.total}
                    </Typography>
                  </Box>
                )}

                {/* HYBRID OPTION */}
                {data.hybridChoice && (
                  <Typography color="text.primary" fontSize="0.85rem" mb={2}>
                    {data.hybridChoice.regularHybrid &&
                      "Regular Hybrid Selected"}
                    {data.hybridChoice.specklebelly && "Specklebelly Selected"}
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
                      March 20, 2026
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
                      2:00 PM
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
                  Estimated Price is calculated using pond size, fish size and
              distance from Lonoke, Arkansas. A Representative will contact you to confirm the estimate
              prior to fish delivery.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Quote Breakdown Card */}
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
            {/* Line Items
            <Box
              sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}
            >
              {[
                { label: "Base Pond Price", amount: "$ 2000.00" },
                { label: "Add-On Services", amount: "$ 600.00" },
                { label: "Access Adjustment", amount: "$ 399.00" },
              ].map((item) => (
                <Box key={item.label}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      pb: 2,
                    }}
                  >
                    <Typography fontWeight={500} sx={{ color: "primary.light" }}>
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body1" color="text.primary"
                      fontWeight={600}
                      sx={{ color: "primary.light", fontSize: "1.125rem" }}
                    >
                      {item.amount}
                    </Typography>
                  </Box>
                  <Divider sx={{ borderColor: "grey.300" }} />
                </Box>
              ))}
            </Box> */}

            {/* Total Row */}
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
                {`$ ${data.totalPrice.toFixed(2)}`}
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
                This is an estimated quote. Final pricing will be confirmed prior to delivery during our follow up call with you. Our team will contact you
                within 24 hours to discuss details.
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
