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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { sizeOptions, unitOptions } from "./AdminDashboard";
import { menuItemSx, textFieldSx } from "../theme/theme";

export default function MasterListPage({ masterListData, setMasterListData }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSize, setSelectedSize] = useState("ALL");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    fishType: "",
    size: "1 to 3 inch",
    price: "",
    unitText: "price per fish",
    displayOrder: 0,
    variant: "DEFAULT",
  });

  const displayItems = (data) => {
    console.log("Updated Master List:", data);
  };

  const filtered = masterListData.filter((item) => {
    const matchCategory =
      selectedCategory === "ALL" || item.fishType === selectedCategory;

    const matchSize = selectedSize === "ALL" || item.size === selectedSize;

    const matchSearch = item.fishType
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSize && matchSearch;
  });

  const handleSave = () => {
    let updated = [...masterListData];

    if (editIndex !== null) {
      updated[editIndex] = form;
    } else {
      updated.push(form);
    }

    setMasterListData(updated);
    displayItems(updated);

    setOpen(false);
    setEditIndex(null);

    setForm({
      fishType: "",
      size: "",
      price: "",
      unitText: "price per fish",
      displayOrder: 0,
      variant: "DEFAULT",
    });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updated = masterListData.filter((_, i) => i !== index);
      setMasterListData(updated);
      displayItems(updated);
    }
  };

  return (
    <Box mt={3}>
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

          <TextField
            select
            fullWidth
            size="small"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={textFieldSx}
          >
            <MenuItem sx={{ ...menuItemSx }} value="ALL">
              All Fishes
            </MenuItem>
            {[...new Set(masterListData.map((i) => i.fishType))].map((cat) => (
              <MenuItem sx={{ ...menuItemSx }} key={cat} value={cat}>
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
            <MenuItem sx={{ ...menuItemSx }} value="ALL">
              All Sizes
            </MenuItem>

            {[...new Set(masterListData.map((i) => i.size))].map((size) => (
              <MenuItem sx={{ ...menuItemSx }} key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Button
          variant="contained"
          fullWidth={{ xs: true, sm: false }}
          sx={{ whiteSpace: "nowrap" }}
          onClick={() => {
            setEditIndex(null);
            setForm({
              fishType: "",
              size: "1 to 3 inch",
              price: "",
              unitText: "price per fish",
              displayOrder: 0,
              variant: "DEFAULT",
            });
            setOpen(true);
          }}
        >
          Add Fish +
        </Button>
      </Box>

      <Paper sx={{ mt: 3, overflowX: "auto" }}>
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
                <TableCell>{row.size}</TableCell>
                <TableCell>{row.unitText}</TableCell>
                <TableCell>${Number(row.price || 0).toFixed(2)}</TableCell>
                <TableCell>{row.displayOrder || i}</TableCell>
                <TableCell>{row.variant}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setForm(row);
                      setEditIndex(i);
                      setOpen(true);
                    }}
                  >
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
      </Paper>

      {/* MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>
          {editIndex !== null ? "Edit Fish" : "Add Fish"}
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            sx={{ ...textFieldSx }}
            placeholder="Fish Name"
            value={form.fishType}
            onChange={(e) => setForm({ ...form, fishType: e.target.value })}
          />

          <TextField
            sx={{ ...textFieldSx }}
            select
            value={form.size || ""}
            onChange={(e) => setForm({ ...form, size: e.target.value })}
          >
            <MenuItem sx={{ ...menuItemSx }} disabled value="">
              Select a size
            </MenuItem>
            {sizeOptions.map((s) => (
              <MenuItem sx={{ ...menuItemSx }} key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={{ ...textFieldSx }}
            select
            placeholder="Unit"
            value={form.unitText}
            onChange={(e) => setForm({ ...form, unitText: e.target.value })}
          >
            <MenuItem sx={{ ...menuItemSx }} disabled value="">
              Select a unit
            </MenuItem>
            {unitOptions.map((u) => (
              <MenuItem sx={{ ...menuItemSx }} key={u} value={u}>
                {u}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={{ ...textFieldSx }}
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
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <TextField
            sx={{ ...textFieldSx }}
            type="number"
            slotProps={{ input: { min: 0 } }}
            placeholder="Display Order"
            value={form.displayOrder}
            onChange={(e) =>
              setForm({ ...form, displayOrder: Number(e.target.value) })
            }
          />

          <TextField
            sx={{ ...textFieldSx }}
            select
            placeholder="Variant"
            value={form.variant}
            onChange={(e) => setForm({ ...form, variant: e.target.value })}
          >
            <MenuItem sx={{ ...menuItemSx }} value="DEFAULT">
              Default
            </MenuItem>
            <MenuItem sx={{ ...menuItemSx }} value="PREMIUM">
              Premium
            </MenuItem>
            <MenuItem sx={{ ...menuItemSx }} value="ECONOMY">
              Economy
            </MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
