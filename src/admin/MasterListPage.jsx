import React, { useState, useMemo, use } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  InputAdornment,
  Typography,
  Chip,
  Stack,
  Switch,
  FormControlLabel,
  Alert,
} from "@mui/material";
import {
  Delete,
  Edit,
  Clear,
  FilterAlt,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { menuItemSx, textFieldSx } from "../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  createMasterListItem,
  deleteMasterListItem,
  updateMasterListItem,
  getMasterList,
} from "../redux/Slices/adminSlice";

const EMPTY_FORM = {
  fishTypeId: null,
  fishType: "select",
  fishSizeId: null,
  sizeLabel: "select",
  price: "",
  unitTypeId: null,
  unitType: "select",
  variant: "select",
};

export const variantOptions = [
  {
    code: "DEFAULT",
    name: "Standard",
    description: "Regular fish with normal growth.",
  },
  {
    code: "F1_FLORIDA",
    name: "F1 Florida",
    description: "Hybrid bass (Florida × Northern), fast growth.",
  },
  {
    code: "GIANT",
    name: "Giant",
    description: "Genetically larger-growing fish.",
  },
  {
    code: "PREMIUM",
    name: "Premium",
    description: "High-quality, selectively bred stock.",
  },
  {
    code: "TROPHY",
    name: "Trophy",
    description: "Grown for large size fishing (sport purpose).",
  },
];

export default function MasterListPage({
  masterListData,
  setMasterListData,
  setSnackbar,
}) {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSize, setSelectedSize] = useState("ALL");
  const [selectedVariant, setSelectedVariant] = useState("ALL");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [initialForm, setInitialForm] = useState(null);
  const [errors, setErrors] = useState({});

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteItemName, setDeleteItemName] = useState("");

  const fishTypeOptions = useSelector((state) => state.domain.fishSpecies);
  const sizeOptionsFromStore = useSelector((state) => state.domain.fishSizes);
  const unitOptionsFromStore = useSelector((state) => state.domain.unitTypes);

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  // ── Get unique filter options from data ──────────────────────────────────
  const uniqueFishTypes = useMemo(() => {
    return [
      ...new Map(
        masterListData.map((item) => [item.fishType, item.fishType]),
      ).values(),
    ];
  }, [masterListData]);

  const uniqueSizes = useMemo(() => {
    return [
      ...new Map(
        masterListData.map((item) => [item.sizeLabel, item.sizeLabel]),
      ).values(),
    ];
  }, [masterListData]);

  const uniqueVariants = useMemo(() => {
    return [
      ...new Map(
        masterListData.map((item) => [item.variant, item.variant]),
      ).values(),
    ];
  }, [masterListData]);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const filteredData = masterListData.filter((item) => {
      const matchCategory =
        selectedCategory === "ALL" || item.fishType === selectedCategory;
      const matchSize =
        selectedSize === "ALL" || item.sizeLabel === selectedSize;
      const matchVariant =
        selectedVariant === "ALL" || item.variant === selectedVariant;

      const matchSearch =
        search === "" ||
        item.fishType?.toLowerCase().includes(search.toLowerCase()) ||
        item.sizeLabel?.toLowerCase().includes(search.toLowerCase()) ||
        item.variant?.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSize && matchVariant && matchSearch;
    });

    // Sort by displayOrder (ascending)
    return filteredData.sort((a, b) => {
      const orderA = a.displayOrder !== undefined ? a.displayOrder : Infinity;
      const orderB = b.displayOrder !== undefined ? b.displayOrder : Infinity;
      return orderA - orderB;
    });
  }, [masterListData, selectedCategory, selectedSize, selectedVariant, search]);
  // ── Reset all filters ──────────────────────────────────────────────────────
  const handleResetFilters = () => {
    setSelectedCategory("ALL");
    setSelectedSize("ALL");
    setSelectedVariant("ALL");
    setSearch("");
  };

  // ── Check if any filters are active ────────────────────────────────────────
  const isFilterActive =
    selectedCategory !== "ALL" ||
    selectedSize !== "ALL" ||
    selectedVariant !== "ALL" ||
    search !== "";

  // ── Form validation ───────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors = {};

    if (!form.fishType || form.fishType === "select")
      newErrors.fishType = "Fish type is required";

    if (!form.sizeLabel || form.sizeLabel === "select")
      newErrors.sizeLabel = "Size is required";

    if (!form.unitType || form.unitType === "select")
      newErrors.unitType = "Unit is required";

    const priceValue = parseFloat(form.price);
    if (form.price === "" || form.price === undefined || form.price === null)
      newErrors.price = "Price is required";
    else if (isNaN(priceValue))
      newErrors.price = "Price must be a valid number";
    else if (priceValue < 0) newErrors.price = "Price cannot be negative";

    if (!form.variant || form.variant === "select")
      newErrors.variant = "Variant is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // ── CRUD handlers ──────────────────────────────────────────────────────────
  const handleOpenAdd = () => {
    setInitialForm(null);
    setEditIndex(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  };

  const getVariantName = (variantCode) => {
    return (
      variantOptions.find((v) => v.code === variantCode)?.name || variantCode
    );
  };

  const handleOpenEdit = (row, index) => {
    const RowWithCodes = {
      ...row,
      fishType: row.fishTypeId || row.fishType,
      unitType: row.unitTypeId || row.unitType,
      sizeLabel: row.fishSizeId || row.sizeLabel,
      variant: row.variant || "DEFAULT",
      active: row.active !== undefined ? row.active : true,
    };

    setForm(RowWithCodes);
    setInitialForm({
      ...row,
      active: row.active !== undefined ? row.active : true,
    });
    setEditIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setErrors({});
    setOpen(false);
    setEditIndex(null);
    setForm(EMPTY_FORM);
    setInitialForm(null);
  };

  // ── Dirty-check helper ───────────────────────────────────────────────────────
  const isFormDirty = () => {
    if (editIndex === null) return true; // always "dirty" for new items
    if (!initialForm) return true;

    const trackedFields = [
      "fishTypeId",
      "fishSizeId",
      "unitTypeId",
      "price",
      "variant",
      "active",
    ];

    return trackedFields.some(
      (field) => String(form[field] ?? "") !== String(initialForm[field] ?? ""),
    );
  };

  // ── Save Handler ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    // Validate required selects
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error",
      });
      return;
    }
    if (!isFormDirty()) {
      setSnackbar({ open: true, message: "No changes made", severity: "warning" });
      return;
    }

    // Validate price
    const priceValue = parseFloat(form.price);
    if (isNaN(priceValue) || priceValue < 0) {
      alert("Please enter a valid non-negative number for price");
      return;
    }

    if (editIndex !== null) {
      // ── Update existing item ──
      const payloadForUpdate = {
        id:
          masterListData.find((item) => item.id === editIndex)?.id ?? editIndex,
        fishTypeId: form.fishTypeId,
        fishSizeId: form.fishSizeId,
        unitTypeId: form.unitTypeId,
        price: priceValue,
        variant: form.variant,
        active: form.active ?? true,
      };

      try {
        const result = await dispatch(
          updateMasterListItem([payloadForUpdate]),
        ).unwrap();
        console.log("Updated item:", result);
        setSnackbar({
          open: true,
          message: "Fish updated successfully!",
          severity: "success",
        });
        handleClose();
        // Refresh master list after successful update
        dispatch(getMasterList());
      } catch (error) {
        console.error("Error updating item:", error);
        setSnackbar({
          open: true,
          message: error?.message || error || "Error updating item!",
          severity: "error",
        });
      }
    } else {
      // ── Create new item ──
      const payloadForCreate = {
        fishTypeId: form.fishTypeId,
        fishSizeId: form.fishSizeId,
        unitTypeId: form.unitTypeId,
        price: priceValue,
        variant: form.variant,
      };

      // try {
      //   const result = await dispatch(
      //     createMasterListItem(payloadForCreate),
      //   ).unwrap();
      //   console.log("Created item:", result);
      //   console.log("Create payload:", payloadForCreate);
      //   setSnackbar({
      //     open: true,
      //     message: "Fish added successfully!",
      //     severity: "success",
      //   });
      //   handleClose();
      //   // Refresh master list after successful create
      //   dispatch(getMasterList());
      // } catch (error) {
      //   console.error("Error adding item:", error);
      //   setSnackbar({
      //     open: true,
      //     message: error?.message || error || "Error adding new item!",
      //     severity: "error",
      //   });
      // }
      setSnackbar({
        open: true,
        message: "Add Fish function is disabled!",
        severity: "warning",
      });
    }
  };

  // ── Delete Handlers ─────────────────────────────────────────────────────────
  const handleDeleteClick = (item) => {
    // Store the item's actual ID (not array index) for the delete dispatch
    setDeleteIndex(item.id);
    setDeleteItemName(`${item.fishType} - ${item.sizeLabel}`);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteIndex === null) return;
    const payloadForDelete = { ids: [deleteIndex] };
    // try {
    //   await dispatch(deleteMasterListItem(payloadForDelete)).unwrap();
    //   setSnackbar({
    //     open: true,
    //     message: "Fish deleted successfully!",
    //     severity: "success",
    //   });
    //   // Refresh master list after successful delete
    //   dispatch(getMasterList());
    // } catch (error) {
    //   console.error("Error deleting item:", error);
    //   setSnackbar({
    //     open: true,
    //     message: error || error?.message || "Error deleting item!",
    //     severity: "error",
    //   });
    // } finally {
    //   setDeleteDialogOpen(false);
    //   setDeleteIndex(null);
    //   setDeleteItemName("");
    // }
    setSnackbar({
        open: true,
        message: "Delete Fish function is disabled!",
        severity: "warning",
      });
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeleteIndex(null);
    setDeleteItemName("");
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <Box mt={3}>
      {/* ── Filters Layout ── */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack spacing={2}>
          {/* Row 1: Search and Add Button */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            alignItems="center"
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search by fish type, size, or variant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={textFieldSx}
              InputProps={{
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearch("")}>
                      <Clear fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              onClick={handleOpenAdd}
              sx={{ whiteSpace: "nowrap", minWidth: "120px" }}
            >
              Add Fish +
            </Button>
          </Box>

          {/* Row 2: Filter Dropdowns and Clear Button */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
            alignItems="center"
          >
            <TextField
              select
              fullWidth
              size="small"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={textFieldSx}
            >
              <MenuItem sx={menuItemSx} value="ALL">
                All Fish Types
              </MenuItem>
              {uniqueFishTypes.map((cat) => (
                <MenuItem sx={menuItemSx} key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              size="small"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              sx={textFieldSx}
            >
              <MenuItem sx={menuItemSx} value="ALL">
                All Sizes
              </MenuItem>
              {uniqueSizes.map((size) => (
                <MenuItem sx={menuItemSx} key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              size="small"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              sx={textFieldSx}
            >
              <MenuItem sx={menuItemSx} value="ALL">
                All Variants
              </MenuItem>
              {uniqueVariants.map((variant) => (
                <MenuItem sx={menuItemSx} key={variant} value={variant}>
                  {getVariantName(variant) || variant}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="outlined"
              startIcon={<Clear />}
              onClick={handleResetFilters}
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
              {selectedCategory !== "ALL" && (
                <Chip
                  label={`Fish: ${selectedCategory}`}
                  onDelete={() => setSelectedCategory("ALL")}
                  size="small"
                />
              )}
              {selectedSize !== "ALL" && (
                <Chip
                  label={`Size: ${selectedSize}`}
                  onDelete={() => setSelectedSize("ALL")}
                  size="small"
                />
              )}
              {selectedVariant !== "ALL" && (
                <Chip
                  label={`Variant: ${selectedVariant}`}
                  onDelete={() => setSelectedVariant("ALL")}
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

      {/* ── Table ── */}
      <Paper sx={{ overflowX: "auto" }}>
        {filtered.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 6,
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No Fish Found
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {isFilterActive
                  ? "No items match your filters. Try clearing some filters or adjust your criteria."
                  : "No items in the master list. Click 'Add Fish' to get started."}
              </Typography>
              {isFilterActive && (
                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={handleResetFilters}
                  sx={{ mt: 2 }}
                >
                  Clear All Filters
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Fish Type</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Price ($)</TableCell>
                <TableCell>Variant</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((row, i) => (
                <TableRow
                  key={i}
                  hover
                  sx={{
                    backgroundColor:
                      row.isActive === false ? "action.hover" : "inherit",
                    opacity: row.isActive === false ? 0.7 : 1,
                  }}
                >
                  <TableCell>{row.displayOrder ?? i}</TableCell>
                  <TableCell>{row.fishType}</TableCell>
                  <TableCell>{row.sizeLabel}</TableCell>
                  <TableCell>{row.unitType}</TableCell>
                  <TableCell>${Number(row.price || 0).toFixed(2)}</TableCell>
                  <TableCell>
                    {getVariantName(row.variant) || "DEFAULT"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenEdit(row, row.id)}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(row, row.id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* ── Add / Edit modal ── */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "text.primary" }}>
          {editIndex !== null ? "Edit Fish" : "Add Fish"}
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: "16px !important",
          }}
        >
          <TextField
            sx={textFieldSx}
            select
            value={form.fishType}
            onChange={(e) => {
              updateForm("fishType", e.target.value);
              updateForm("fishTypeId", e.target.value);
            }}
            required
          >
            <MenuItem sx={menuItemSx} disabled value="select">
              Select a fish type
            </MenuItem>
            {fishTypeOptions.map((ft) => (
              <MenuItem sx={menuItemSx} key={ft.code} value={ft.id}>
                {ft.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={textFieldSx}
            select
            value={form.sizeLabel}
            onChange={(e) => {
              updateForm("sizeLabel", e.target.value);
              updateForm("fishSizeId", e.target.value);
            }}
            required
          >
            <MenuItem sx={menuItemSx} disabled value="select">
              Select a size
            </MenuItem>
            {sizeOptionsFromStore.map((s) => (
              <MenuItem sx={menuItemSx} key={s.code} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={textFieldSx}
            select
            value={form.unitType}
            onChange={(e) => {
              updateForm("unitType", e.target.value);
              updateForm("unitTypeId", e.target.value);
            }}
            required
          >
            <MenuItem sx={menuItemSx} disabled value="select">
              Select a unit
            </MenuItem>
            {unitOptionsFromStore.map((u) => (
              <MenuItem sx={menuItemSx} key={u.code} value={u.id}>
                {u.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={textFieldSx}
            type="number"
            slotProps={{
              input: {
                min: 0,
                startAdornment: (
                  <InputAdornment position="start">
                    <span style={{ color: "#000" }}>$</span>
                  </InputAdornment>
                ),
              },
            }}
            placeholder="0.00"
            value={form.price}
            onChange={(e) => updateForm("price", e.target.value)}
          />

          <TextField
            sx={textFieldSx}
            select
            value={form.variant}
            onChange={(e) => updateForm("variant", e.target.value)}
          >
            <MenuItem sx={menuItemSx} disabled value="select">
              Select
            </MenuItem>
            {variantOptions.map((v) => (
              <MenuItem
                title={v.description}
                sx={menuItemSx}
                key={v.code}
                value={v.code}
              >
                {v.name}
              </MenuItem>
            ))}
          </TextField>
          {/* Active Status Field - Improved Styling */}
          {editIndex !== null && (
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                borderRadius: 1,
                borderColor: "rgba(0, 0, 0, 0.23)",
                backgroundColor: "transparent",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "primary.main",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      color: "text.primary",
                    }}
                  >
                    Status
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.75rem",
                    }}
                  >
                    (Active/Inactive)
                  </Typography>
                </Box>

                <FormControlLabel
                  control={
                    <Switch
                      checked={form.active !== undefined ? form.active : true}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          active: e.target.checked,
                        }))
                      }
                      color="success"
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "primary.light",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "primary.light",
                          },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color:
                          form.active !== undefined && form.active
                            ? "primary.light"
                            : "error.main",
                      }}
                    >
                      {form.active !== undefined && form.active
                        ? "Active"
                        : "Inactive"}
                    </Typography>
                  }
                  labelPlacement="start"
                  sx={{
                    m: 0,
                    gap: 1.5,
                    "& .MuiFormControlLabel-label": {
                      order: 2,
                    },
                  }}
                />
              </Box>
            </Paper>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Delete Confirmation Dialog ── */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            bgcolor: "error.main",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Delete />
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This action cannot be undone!
          </Alert>
          <Typography>
            Are you sure you want to delete <strong>{deleteItemName}</strong>?
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            This item will be permanently removed from the master list.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button onClick={handleCancelDelete} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            autoFocus
          >
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
