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
  TextField,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { textFieldSx } from "../theme/theme";
import { useEstimateForm } from "../contexts/EstimateFormContext";
import { useSelector } from "react-redux";

export function PondEstimator() {
  const navigate = useNavigate();
  const { type } = useParams();
  const { data, updateSection } = useEstimateForm();
  const pondEstimateData = useSelector((state) => state.pondEstimate.data);
  const [selectedOptions, setSelectedOptions] = useState(
    data.estimator.selectedOptionCodes || [],
  );
  const [apiData, setApiData] = useState(pondEstimateData || null);
  const [addons, setAddons] = useState(() => {
    const source = data.estimator.addons?.length
      ? data.estimator.addons
      : (pondEstimateData?.addons || []).map((addon) => ({
          code: addon.addonCode || addon.code,
          name: addon.fishName || addon.name || "Unknown Add-on",
          quantity: addon.quantity || 1,
          unitPrice: addon.unitPrice || addon.price || 0,
          selected: addon.selected || false,
          eligibleStates: addon.eligibleStates || [],
          total: (addon.quantity || 1) * (addon.unitPrice || addon.price || 0),
        }));
    return source;
  });
  const [regularHybrid, setRegularHybrid] = useState(
    data.estimator.hybridChoice?.regularHybrid || false,
  );
  const [specklebelly, setSpecklebelly] = useState(
    data.estimator.hybridChoice?.specklebelly || false,
  );

  useEffect(() => {
    setSelectedOptions(data.estimator.selectedOptionCodes || []);
    setRegularHybrid(data.estimator.hybridChoice?.regularHybrid || false);
    setSpecklebelly(data.estimator.hybridChoice?.specklebelly || false);

    if (data.estimator.addons?.length) {
      setAddons(
        data.estimator.addons.map((addon) => ({
          code: addon.code || addon.addonCode,
          name: addon.name || addon.fishName || "Unknown Add-on",
          quantity: addon.quantity || 1,
          unitPrice: addon.unitPrice || addon.price || 0,
          selected: true,
          eligibleStates: addon.eligibleStates || [],
          total: (addon.quantity || 1) * (addon.unitPrice || addon.price || 0),
        })),
      );
    } else if (pondEstimateData?.addons?.length) {
      setAddons(
        pondEstimateData.addons.map((addon) => ({
          code: addon.addonCode || addon.code,
          name: addon.fishName || addon.name || "Unknown Add-on",
          quantity: addon.quantity || 1,
          unitPrice: addon.unitPrice || addon.price || 0,
          selected: addon.selected || false,
          eligibleStates: addon.eligibleStates || [],
          total: (addon.quantity || 1) * (addon.unitPrice || addon.price || 0),
        })),
      );
    }
  }, [data.estimator, pondEstimateData]);

  const handleToggle = (pkg, index) => {
    setSelectedOptions((prev) => {
      const exists = prev.includes(pkg.packageCode);

      const nextCodes = exists
        ? prev.filter((c) => c !== pkg.packageCode)
        : [...prev, pkg.packageCode];

      // 👇 Maintain indices for backward compatibility
      const nextIndices = apiData?.packages
        .map((p, i) => (nextCodes.includes(p.packageCode) ? i : null))
        .filter((i) => i !== null);

      updateSection("estimator", {
        selectedOptionCodes: nextCodes,
        selectedOptionIndices: nextIndices,
      });

      return nextCodes;
    });
  };

  const handleAddonToggle = (code) => {
    setAddons((prev) =>
      prev.map((addon) =>
        addon.code === code
          ? {
              ...addon,
              selected: !addon.selected,
              total: (addon.quantity || 0) * (addon.unitPrice || 0),
            }
          : addon,
      ),
    );
  };

  const handleAddonQtyChange = (code, qty) => {
    const safeQty = Number(qty) <= 0 ? 0 : Number(qty);
    setAddons((prev) =>
      prev.map((addon) =>
        addon.code === code
          ? {
              ...addon,
              quantity: safeQty,
              total: safeQty * (addon.unitPrice || 0),
            }
          : addon,
      ),
    );
  };

  const handleBack = () => {
    navigate("/estimate/pond-info");
  };

  const handleNext = () => {
    const selectedOptionDetails = selectedOptions.map((code) => {
      const pkg = apiData?.packages.find((p) => p.packageCode === code);
      const isYear1 = pkg.packageCode === "YEAR1";

      if (isYear1) {
        const breakdown = pkg.fishItems.map((item) => ({
          fishName: item.fishType,
          size: item.size,
          unit: item.unitType,
          quantity: item.quantity,
        }));

        return {
          label: pkg.packageName,
          price: pkg.estimatedPrice,
          pondType: type,
          isMaturePopulation: true,
          breakdown,
          calculatedTotal: pkg.estimatedPrice,
        };
      }

      const stockDetails = pkg.fishItems.map((item) => ({
        fishName: item.fishType,
        unit: item.unitType.toLowerCase(),
        quantity: item.quantity,
        size: item.size,
      }));

      return {
        label: pkg.packageName,
        price: pkg.estimatedPrice,
        size:
          pkg.fishItems?.[0]?.size ||
          (pkg.packageCode === "SMALL"
            ? "1 to 3 inch"
            : pkg.packageCode === "MEDIUM"
              ? "3 to 4 inch"
              : pkg.packageCode === "LARGE"
                ? "4 to 5 inch"
                : pkg.packageCode === "YEAR1"
                  ? "1 inch to Catchable"
                  : "—"),
        pondType: type,
        stockDetails,
        calculatedTotal: pkg.estimatedPrice,
      };
    });

    const selectedAddons = addons
      .filter((item) => item.selected)
      .map((item) => ({
        ...item,
        total: (item.quantity || 0) * (item.unitPrice || 0),
      }));

    const addonTotal = selectedAddons.reduce(
      (sum, item) => sum + (item.total || 0),
      0,
    );

    const optionsTotal = selectedOptionDetails.reduce(
      (sum, opt) => sum + opt.calculatedTotal,
      0,
    );

    updateSection("estimator", {
      pondType: type,
      pondTypeTitle: apiData?.title,
      selectedOptionIndices: selectedOptions,
      selectedOptions: selectedOptionDetails,
      addons: selectedAddons,
      totalPrice: optionsTotal + addonTotal,
      stockingDescription:  apiData.description+" "+apiData?.infoNotes?.join(", "),
    });

    navigate("/estimate/availability");
  };

  const year1Package = apiData?.packages.find((p) => p.packageCode === "YEAR1");
  const tableColumns = apiData?.packages?.[0]?.fishItems || [];

  // useEffect(() => {
  //   if (!type) return;

  //   const fetchData = async () => {
  //     try {
  //       // 🔴 Replace this with real API call
  //       const response = pondEstimateData;

  //       setApiData(response);

  //       // if no context stored option yet, seed it from API addon
  //       // no-op for initial addon sync; existing addon initialization handled in addons state.
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchData();
  // }, [type, data.estimator.grassCarp]);

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
                {apiData?.title}
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
                Note: {apiData?.description}
              </Typography>
              <Typography
                fontSize="0.875rem"
                color="primary.contrastText"
                mb={2}
              >
                Select the option that best fits your budget. A representative
                will contact you to confirm the estimate and discuss stocking
                options prior to delivery.
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
                    {tableColumns.map((item, i) => (
                      <TableCell key={i} align="center">
                        {item.unitType === "FISH" ? "Head" : "Pounds"}
                        <br />
                        {item.fishType}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {apiData?.packages.map((pkg, i) => {
                    const isYear1 = pkg.packageCode === "YEAR1";
                    return (
                      <TableRow
                        key={i}
                        sx={{
                          backgroundColor: selectedOptions.includes(
                            pkg.packageCode,
                          )
                            ? "rgba(43, 161, 146, 0.25)"
                            : "rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <TableCell>{pkg.packageName}</TableCell>
                        <TableCell>
                          {pkg.packageCode === "YEAR1"
                            ? "1 inch to Catchable"
                            : pkg.fishItems?.[0]?.size ||
                              (pkg.packageCode === "SMALL"
                                ? "1 to 3 inch"
                                : pkg.packageCode === "MEDIUM"
                                  ? "3 to 4 inch"
                                  : pkg.packageCode === "LARGE"
                                    ? "4 to 5 inch"
                                    : "—")}
                        </TableCell>
                        <TableCell>${pkg.estimatedPrice}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={selectedOptions.includes(pkg.packageCode)}
                            onChange={() => handleToggle(pkg, i)}
                          />
                        </TableCell>
                        {tableColumns.map((colItem, idx) => {
                          const match = pkg.fishItems?.find(
                            (f) => f.fishType === colItem.fishType,
                          );

                          return (
                            <TableCell key={idx} align="center">
                              {!isYear1 ? match?.quantity || 0 : ""}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <Table
                sx={{
                  background: selectedOptions.includes("YEAR1")
                    ? "rgba(43, 161, 146, 0.25)"
                    : "rgba(0, 0, 0, 0.2)",
                }}
              >
                <TableHead>
                  <TableRow>
                    {year1Package?.fishItems.map((item, i) => (
                      <TableCell key={i} align="center">
                        {/* Unit */}
                        {item.unitType === "FISH" ? "Head" : "Pounds"}
                        <br />

                        {/* Fish Name */}
                        {item.fishType}
                        <br />

                        {/* Size */}
                        <span style={{ fontSize: "0.75rem" }}>{item.size}</span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    {year1Package?.fishItems.map((item, i) => (
                      <TableCell key={i} align="center">
                        {item.quantity}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>

            {addons && addons.length > 0 && (
              <Box
                mt={4}
                p={3}
                border="1px solid"
                borderRadius={2}
                bgcolor="rgba(0, 0, 0, 0.2)"
              >
                <Typography fontWeight="bold" sx={{ color: "text.primary" }}>
                  Optional Add-ons
                </Typography>

                {addons.map((addon) => (
                  <Box
                    key={addon.code}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection={{ xs: "column", md: "row" }}
                    gap={2}
                    mt={2}
                    px={1}
                    py={2}
                    bgcolor={
                      addon.selected
                        ? "rgba(43, 161, 146, 0.25)"
                        : "transparent"
                    }
                    borderRadius={1}
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{ color: "text.primary" }}
                      fontSize="0.875rem"
                    >
                      ADD {addon.name}
                    </Typography>

                    <TextField
                      type="number"
                      size="small"
                      value={addon.quantity}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        handleAddonQtyChange(
                          addon.code,
                          Number.isNaN(value) ? 0 : value,
                        );
                      }}
                      sx={{ ...textFieldSx, width: { xs: 60, md: 80 } }}
                      inputProps={{ min: 0 }}
                    />

                    <Typography fontSize={16} color="text.primary" width={80}>
                      {addon.unitPrice
                        ? `$${((addon.quantity || 0) * addon.unitPrice).toFixed(2)}`
                        : "$0.00"}
                    </Typography>

                    <Checkbox
                      sx={{ color: "text.primary" }}
                      checked={addon.selected}
                      onChange={() => handleAddonToggle(addon.code)}
                    />

                    {addon.eligibleStates?.length > 0 && (
                      <Typography
                        fontSize={13}
                        color="text.secondary"
                        textTransform="uppercase"
                      >
                        {addon.eligibleStates.join(", ")} only
                      </Typography>
                    )}
                  </Box>
                ))}

                {apiData?.title === "Hybrid Bream Pond Estimator" && (
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
            )}

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
                {apiData?.minimumOrderAmount} minimum
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "text.primary" }}>
                {apiData?.infoNotes.map((i, k) => (
                  <span key={k}>
                    {i}
                    <br />
                  </span>
                ))}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "text.primary" }}>
                {apiData?.disclaimerNotes.map((i, k) => (
                  <span key={k}>
                    {i}
                    <br />
                  </span>
                ))}
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
