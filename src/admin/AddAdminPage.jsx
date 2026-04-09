import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { User, Mail, Phone, Lock } from "lucide-react";

import { textFieldSx } from "../theme/theme";

export default function AddAdminPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const fields = [
    {
      key: "fullName",
      placeholder: "Enter full name",
      type: "text",
      icon: <User size={18} />,
    },
    {
      key: "email",
      placeholder: "Enter email",
      type: "email",
      icon: <Mail size={18} />,
    },
    {
      key: "phone",
      placeholder: "Enter phone",
      type: "tel",
      icon: <Phone size={18} />,
    },
    {
      key: "password",
      placeholder: "Create password",
      type: "password",
      icon: <Lock size={18} />,
    },
    {
      key: "confirmPassword",
      placeholder: "Confirm password",
      type: "password",
      icon: <Lock size={18} />,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("New Admin:", formData);
  };

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Paper
          sx={{
            borderRadius: 4,
            backdropFilter: "blur(16px)",
            backgroundColor: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(to right, #44A194, #537D96)",
              p: 2,
              textAlign: "center",
              color: "white",
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Add Admin
            </Typography>
            <Typography fontSize="0.85rem">
              Create a new admin account
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              {fields.map(({ key, placeholder, type, icon }) => (
                <TextField
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  fullWidth
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">{icon}</InputAdornment>
                      ),
                    },
                  }}
                  sx={textFieldSx}
                />
              ))}

              {/* Terms Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    size="small"
                    sx={{
                      color: "grey.400",
                      alignSelf: "flex-start",
                      pt: 0,
                      "&.Mui-checked": { color: "#44A194" },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" color="text.disabled">
                    I agree to the{" "}
                    <Link
                      href="#"
                      underline="hover"
                      sx={{
                        color: "#44A194",
                        "&:hover": { color: "#EC8F8D" },
                        transition: "color 0.2s",
                      }}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      underline="hover"
                      sx={{
                        color: "#44A194",
                        "&:hover": { color: "#EC8F8D" },
                        transition: "color 0.2s",
                      }}
                    >
                      Privacy Policy
                    </Link>
                  </Typography>
                }
                sx={{ alignItems: "flex-start", mx: 0 }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "linear-gradient(to right, #44A194, #537D96)",
                }}
              >
                Create Admin
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}