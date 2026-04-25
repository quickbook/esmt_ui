import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  Typography,
  Chip,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import {
  Clear,
  Visibility,
  Close,
  FilterAlt,
  Search,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { Quote } from "../pages/Quote";
import { menuItemSx, textFieldSx } from "../theme/theme";
import { mockQuotes, ESTIMATOR_LABELS } from "../api/mockQuotes";

// ─── helpers ─────────────────────────────────────────────────────────────────
const fmt = (n) =>
  typeof n === "number"
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : "—";

const pondTypeColor = (type) =>
  type === "NEW"
    ? {
        bgcolor: "rgba(68,161,148,0.15)",
        color: "primary.light",
        border: "1px solid rgba(68,161,148,0.4)",
      }
    : {
        bgcolor: "rgba(255,193,7,0.12)",
        color: "#FFC107",
        border: "1px solid rgba(255,193,7,0.35)",
      };

const selectSx = {
  ...textFieldSx,
  minWidth: 160,
  "& .MuiSelect-select": { py: "8.5px" },
};

// Date filter options
const DATE_OPTIONS = [
  { value: "latest", label: "Latest → Oldest" },
  { value: "oldest", label: "Oldest → Latest" },
  { value: "today", label: "Today" },
  { value: "this_month", label: "This Month" },
];

// ─── component ───────────────────────────────────────────────────────────────
export default function OrderDetailsPage({ setSnackbar }) {
  const { id } = useParams() || {};

  // ── filter state ────────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [pondTypeFilter, setPondTypeFilter] = useState("ALL");
  const [estimatorFilter, setEstimatorFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("latest");

  // ── dialog ──────────────────────────────────────────────────────────────────
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);

  // pre-select by URL param
  useEffect(() => {
    if (id) {
      const found = mockQuotes.find((q) => q.quoteId === id);
      if (found) {
        setSelectedQuote(found);
        setViewOpen(true);
      }
    }
  }, [id]);

  // ── unique filter options ───────────────────────────────────────────────────
  const pondTypes = useMemo(
    () => [
      ...new Set(mockQuotes.map((q) => q.pondInfo?.pondType).filter(Boolean)),
    ],
    [],
  );

  const estimatorTypes = useMemo(
    () => [...new Set(mockQuotes.map((q) => q.estimatorType).filter(Boolean))],
    [],
  );

  // ── filtered + sorted rows ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const now = new Date();
    const todayStr = now.toDateString();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    let rows = mockQuotes.filter((item) => {
      const matchPond =
        pondTypeFilter === "ALL" || item.pondInfo?.pondType === pondTypeFilter;
      const matchEst =
        estimatorFilter === "ALL" || item.estimatorType === estimatorFilter;
      const matchSearch =
        q === "" ||
        item.quoteId?.toLowerCase().includes(q) ||
        item.customer?.fullName?.toLowerCase().includes(q) ||
        item.customer?.email?.toLowerCase().includes(q);

      // date range filter
      let matchDate = true;
      if (dateFilter === "today" && item.createdAt) {
        matchDate = new Date(item.createdAt).toDateString() === todayStr;
      } else if (dateFilter === "this_month" && item.createdAt) {
        const d = new Date(item.createdAt);
        matchDate = d.getMonth() === thisMonth && d.getFullYear() === thisYear;
      }

      return matchPond && matchEst && matchSearch && matchDate;
    });

    // sort
    rows = [...rows].sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt) : 0;
      const db = b.createdAt ? new Date(b.createdAt) : 0;
      return dateFilter === "oldest" ? da - db : db - da;
    });

    return rows;
  }, [search, pondTypeFilter, estimatorFilter, dateFilter]);

  const isFilterActive =
    search !== "" ||
    pondTypeFilter !== "ALL" ||
    estimatorFilter !== "ALL" ||
    dateFilter !== "latest";

  const handleReset = () => {
    setSearch("");
    setPondTypeFilter("ALL");
    setEstimatorFilter("ALL");
    setDateFilter("latest");
  };

  const handleView = (quote) => {
    setSelectedQuote(quote);
    setViewOpen(true);
  };
  const handleCloseView = () => {
    setViewOpen(false);
    setSelectedQuote(null);
  };

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ mt: 2 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack spacing={2}>
          {/* Row 1: Search */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            alignItems="center"
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search Quote ID, name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={textFieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" sx={{ color: "secondary.main"}} />
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearch("")}>
                      <Clear fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Result count */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: "nowrap", minWidth: "120px" }}
            >
              {filtered.length} order{filtered.length !== 1 ? "s" : ""}
            </Typography>
          </Box>

          {/* Row 2: Filter Dropdowns and Clear Button */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
            alignItems="center"
          >
            {/* Pond Type */}
            <TextField
              select
              fullWidth
              size="small"
              value={pondTypeFilter}
              onChange={(e) => setPondTypeFilter(e.target.value)}
              sx={textFieldSx}
            >
              <MenuItem sx={menuItemSx} value="ALL">
                All Pond Types
              </MenuItem>
              {pondTypes.map((pt) => (
                <MenuItem sx={menuItemSx} key={pt} value={pt}>
                  {pt === "NEW" ? "New Pond" : "Existing Pond"}
                </MenuItem>
              ))}
            </TextField>

            {/* Estimator */}
            <TextField
              select
              fullWidth
              size="small"
              value={estimatorFilter}
              onChange={(e) => setEstimatorFilter(e.target.value)}
              sx={textFieldSx}
            >
              <MenuItem sx={menuItemSx} value="ALL">
                All Estimators
              </MenuItem>
              {estimatorTypes.map((et) => (
                <MenuItem sx={menuItemSx} key={et} value={et}>
                  {ESTIMATOR_LABELS[et] || et}
                </MenuItem>
              ))}
            </TextField>

            {/* Date */}
            <TextField
              select
              fullWidth
              size="small"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              sx={textFieldSx}
            >
              {DATE_OPTIONS.map((opt) => (
                <MenuItem sx={menuItemSx} key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Clear button */}
            <Button
              variant="outlined"
              startIcon={<Clear />}
              onClick={handleReset}
              disabled={!isFilterActive}
              sx={{
                whiteSpace: "nowrap",
                minWidth: "120px",
                height: "40px",
              }}
            >
              Clear
            </Button>
          </Box>

          {/* Active filters chips */}
          {isFilterActive && (
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
              {pondTypeFilter !== "ALL" && (
                <Chip
                  label={`Pond Type: ${pondTypeFilter === "NEW" ? "New Pond" : "Existing Pond"}`}
                  onDelete={() => setPondTypeFilter("ALL")}
                  size="small"
                />
              )}
              {estimatorFilter !== "ALL" && (
                <Chip
                  label={`Estimator: ${ESTIMATOR_LABELS[estimatorFilter] || estimatorFilter}`}
                  onDelete={() => setEstimatorFilter("ALL")}
                  size="small"
                />
              )}
              {dateFilter !== "ALL" && (
                <Chip
                  label={`Date: ${DATE_OPTIONS.find((opt) => opt.value === dateFilter)?.label || dateFilter}`}
                  onDelete={() => setDateFilter("ALL")}
                  size="small"
                />
              )}
              {search && (
                <Chip
                  label={`Search: ${search}`}
                  onDelete={() => setSearch("")}
                  size="small"
                />
              )}
            </Box>
          )}
        </Stack>
      </Paper>

      {/* ══ TABLE ═════════════════════════════════════════════════════════════ */}
      <Paper
        sx={{
          borderRadius: 0.5,
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)",
          overflowX: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                "Quote ID",
                "Name",
                "Email",
                "Pond Type",
                "Estimator",
                "Total Price",
                "Date",
                "View",
              ].map((h) => (
                <TableCell
                  key={h}
                  sx={{
                    fontWeight: 700,
                    bgcolor: "rgba(68,161,148,0.18)",
                    color: "text.primary",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                  sx={{ py: 5, color: "text.secondary" }}
                >
                  No orders match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row) => (
                <TableRow
                  key={row.quoteId}
                  hover
                  sx={{
                    "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Quote ID */}
                  <TableCell
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.8rem",
                      color: "primary.light",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.quoteId}
                  </TableCell>

                  {/* Name */}
                  <TableCell sx={{ fontWeight: 500, whiteSpace: "nowrap" }}>
                    {row.customer?.fullName || "—"}
                  </TableCell>

                  {/* Email */}
                  <TableCell
                    sx={{ color: "text.secondary", fontSize: "0.82rem" }}
                  >
                    {row.customer?.email || "—"}
                  </TableCell>

                  {/* Pond Type */}
                  <TableCell>
                    <Chip
                      label={
                        row.pondInfo?.pondType === "NEW"
                          ? "New Pond"
                          : "Existing Pond"
                      }
                      size="small"
                      sx={{
                        ...pondTypeColor(row.pondInfo?.pondType),
                        fontWeight: 600,
                        fontSize: "0.72rem",
                      }}
                    />
                  </TableCell>

                  {/* Estimator */}
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <Chip
                      label={
                        ESTIMATOR_LABELS[row.estimatorType] ||
                        row.estimatorType ||
                        "—"
                      }
                      size="small"
                      sx={{
                        bgcolor: "rgba(83,125,150,0.18)",
                        color: "#7EC8E3",
                        border: "1px solid rgba(83,125,150,0.4)",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    />
                  </TableCell>

                  {/* Total Price */}
                  <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                    {fmt(row.estimator?.totalPrice)}
                  </TableCell>

                  {/* Date */}
                  <TableCell
                    sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
                  >
                    {row.createdAt
                      ? new Date(row.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </TableCell>

                  {/* Action */}
                  <TableCell>
                    <IconButton
                      size="small"
                      variant="outlined"
                      onClick={() => handleView(row)}
                      sx={{
                        textTransform: "none",
                        borderColor: "rgba(68,161,148,0.5)",
                        color: "#44A194",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        py: 0.4,
                        "&:hover": {
                          bgcolor: "rgba(68,161,148,0.12)",
                          borderColor: "#44A194",
                        },
                      }}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ══ QUOTE DETAIL DIALOG ═══════════════════════════════════════════════ */}
      <Dialog
        open={viewOpen}
        onClose={handleCloseView}
        maxWidth="lg"
        fullWidth
        scroll="paper"
        PaperProps={{
          sx: {
            bgcolor: "background.default",
            backgroundImage: "none",
            borderRadius: 3,
            border: "1px solid rgba(68,161,148,0.3)",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "rgba(68,161,148,0.15)",
            borderBottom: "1px solid rgba(68,161,148,0.25)",
            py: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography fontWeight={700} sx={{ color: "primary.light" }}>
              Quote Detail — {selectedQuote?.quoteId}
            </Typography>
            {selectedQuote?.estimatorType && (
              <Chip
                label={
                  ESTIMATOR_LABELS[selectedQuote.estimatorType] ||
                  selectedQuote.estimatorType
                }
                size="small"
                sx={{
                  bgcolor: "rgba(68,161,148,0.2)",
                  color: "#44A194",
                  border: "1px solid rgba(68,161,148,0.4)",
                  fontWeight: 700,
                }}
              />
            )}
          </Box>
          <IconButton onClick={handleCloseView} size="small">
            <Close sx={{ color: "text.primary" }} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {selectedQuote && <Quote adminQuoteData={selectedQuote} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
