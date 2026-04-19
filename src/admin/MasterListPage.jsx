import React, { useState } from "react";
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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { sizeOptions, unitOptions } from "./AdminDashboard";
import { menuItemSx, textFieldSx } from "../theme/theme";

const EMPTY_FORM = {
  fishType: "",
  sizeLabel: "1 to 3 inch",   // ✅ was mixing `size` and `sizeLabel`
  price: "",
  unitType: "price per fish",  // ✅ was mixing `unitText` and `unitType`
  displayOrder: 0,
  variant: "DEFAULT",
};

export default function MasterListPage({ masterListData, setMasterListData }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSize, setSelectedSize] = useState("ALL");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const updateForm = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // ── Filtering ──────────────────────────────────────────────────────────────

  const filtered = masterListData.filter((item) => {
    const matchCategory = selectedCategory === "ALL" || item.fishType === selectedCategory;
    const matchSize     = selectedSize === "ALL"     || item.sizeLabel === selectedSize; // ✅ was `item.size`
    const matchSearch   = item.fishType.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSize && matchSearch;
  });

  // ── CRUD handlers ──────────────────────────────────────────────────────────

  const handleOpenAdd = () => {
    setEditIndex(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  };

  const handleOpenEdit = (row, index) => {
    setForm(row);
    setEditIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setForm(EMPTY_FORM);
  };

  const handleSave = () => {
    const updated = [...masterListData];
    if (editIndex !== null) {
      updated[editIndex] = form;
    } else {
      updated.push(form);
    }
    setMasterListData(updated);
    handleClose();
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setMasterListData((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Box mt={3}>
      {/* ── Filters + Add button ── */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          width={{ xs: "100%", sm: "70%" }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search fish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={textFieldSx}
          />

          {/* Category filter */}
          <TextField
            select
            fullWidth
            size="small"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={textFieldSx}
          >
            <MenuItem sx={menuItemSx} value="ALL">All Fishes</MenuItem>
            {[...new Set(masterListData.map((i) => i.fishType))].map((cat) => (
              <MenuItem sx={menuItemSx} key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>

          {/* Size filter — uses sizeLabel ✅ */}
          <TextField
            select
            fullWidth
            size="small"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            sx={textFieldSx}
          >
            <MenuItem sx={menuItemSx} value="ALL">All Sizes</MenuItem>
            {[...new Set(masterListData.map((i) => i.sizeLabel))].map((size) => ( // ✅ was `i.size`
              <MenuItem sx={menuItemSx} key={size} value={size}>{size}</MenuItem>
            ))}
          </TextField>
        </Box>

        <Button
          variant="contained"
          sx={{ whiteSpace: "nowrap" }}
          onClick={handleOpenAdd}
        >
          Add Fish +
        </Button>
      </Box>

      {/* ── Table ── */}
      <Paper sx={{ mt: 3, overflowX: "auto" }}>
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
                No items match your search or filters. Try adjusting your criteria or add a new fish.
              </Typography>
            </Box>
          </Box>
        ) : (
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Fish Type</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Price ($)</TableCell>
                <TableCell>Display Order</TableCell>
                <TableCell>Variant</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.fishType}</TableCell>
                  <TableCell>{row.sizeLabel}</TableCell>    
                  <TableCell>{row.unitType}</TableCell>     
                  <TableCell>${Number(row.price || 0).toFixed(2)}</TableCell>
                  <TableCell>{row.displayOrder ?? i}</TableCell>
                  <TableCell>{row.variant}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenEdit(row, i)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(i)}>
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
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editIndex !== null ? "Edit Fish" : "Add Fish"}</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }}>

          {/* Fish name */}
          <TextField
            sx={textFieldSx}
            placeholder="Fish Name"
            value={form.fishType}
            onChange={updateForm("fishType")}
          />

          {/* Size — bound to sizeLabel ✅ (was `form.size`) */}
          <TextField
            sx={textFieldSx}
            select
            value={form.sizeLabel}
            onChange={updateForm("sizeLabel")}
          >
            <MenuItem sx={menuItemSx} disabled value="">Select a size</MenuItem>
            {sizeOptions.map((s) => (
              <MenuItem sx={menuItemSx} key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>

          {/* Unit — bound to unitType ✅ (was `form.unitText`) */}
          <TextField
            sx={textFieldSx}
            select
            value={form.unitType}
            onChange={updateForm("unitType")}
          >
            <MenuItem sx={menuItemSx} disabled value="">Select a unit</MenuItem>
            {unitOptions.map((u) => (
              <MenuItem sx={menuItemSx} key={u} value={u}>{u}</MenuItem>
            ))}
          </TextField>

          {/* Price */}
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
            placeholder="Price"
            value={form.price}
            onChange={updateForm("price")}
          />

          {/* Display order */}
          <TextField
            sx={textFieldSx}
            type="number"
            slotProps={{ input: { min: 0 } }}
            placeholder="Display Order"
            value={form.displayOrder}
            onChange={(e) => setForm((prev) => ({ ...prev, displayOrder: Number(e.target.value) }))}
          />

          {/* Variant */}
          <TextField
            sx={textFieldSx}
            select
            value={form.variant}
            onChange={updateForm("variant")}
          >
            <MenuItem sx={menuItemSx} value="DEFAULT">Default</MenuItem>
            <MenuItem sx={menuItemSx} value="PREMIUM">Premium</MenuItem>
            <MenuItem sx={menuItemSx} value="ECONOMY">Economy</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}