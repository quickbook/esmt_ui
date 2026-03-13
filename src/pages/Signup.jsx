import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Button,
  Link,
} from "@mui/material";
import { Waves, User, Mail, Phone, Lock } from "lucide-react";
import { textFieldSx } from "../theme/theme";

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const fields = [
    {
      label: "Full Name",
      key: "fullName",
      type: "text",
      placeholder: "Enter your full name",
      icon: <User size={20} color="#9CA3AF" />,
    },
    {
      label: "Email Address",
      key: "email",
      type: "email",
      placeholder: "Enter your email",
      icon: <Mail size={20} color="#9CA3AF" />,
    },
    {
      label: "Phone Number",
      key: "phone",
      type: "tel",
      placeholder: "Enter your phone number",
      icon: <Phone size={20} color="#9CA3AF" />,
    },
    {
      label: "Password",
      key: "password",
      type: "password",
      placeholder: "Create a password",
      icon: <Lock size={20} color="#9CA3AF" />,
    },
    {
      label: "Confirm Password",
      key: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      icon: <Lock size={20} color="#9CA3AF" />,
    },
  ];

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Navigate to customer info page after signup
    navigate("/customer-info");
  };

  return (
    <Box
      sx={{
        minHeight: "84vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 480 }}>
        <Paper
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(to right, #44A194, #537D96)",
              p: 2,
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  p: 2,
                  borderRadius: "50%",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                }}
              >
                <Waves size={24} />
              </Box>
            </Box>
            <Typography
              variant="h4"
              fontWeight={700}
              textAlign="center"
              mb={0.5}
            >
              Create Account
            </Typography>
            <Typography
              textAlign="center"
              sx={{ color: "rgba(255,255,255,0.9)", fontSize: "0.875rem" }}
            >
              Your Professional Pond Service
            </Typography>
          </Box>

          {/* Signup Form */}
          <Box component="form" onSubmit={handleSignup} sx={{ p: 4 }}>
            {/* <Typography
              variant="h5"
              fontWeight={600}
              textAlign="center"
              sx={{ color: "#537D96", mb: 3 }}
            >
              Create Account
            </Typography> */}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Dynamic Fields */}
              {fields.map(({ label, key, type, placeholder, icon }) => (
                <TextField
                  key={key}
                  //label={label}
                  type={type}
                  placeholder={placeholder}
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  required
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          {icon}
                        </InputAdornment>
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

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: "1rem",
                  background: "linear-gradient(to right, #44A194, #537D96)",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    background: "linear-gradient(to right, #44A194, #537D96)",
                    boxShadow: "0 8px 24px rgba(68,161,148,0.4)",
                    transform: "scale(1.02)",
                  },
                  transition: "all 0.2s",
                }}
              >
                Create Account
              </Button>
            </Box>

            {/* Sign in link */}
            <Typography
              variant="body2"
              textAlign="center"
              color="text.disabled"
              mt={3}
            >
              Already have an account?{" "}
              <Link
                onClick={() => navigate("/login")}
                underline="hover"
                fontWeight={600}
                sx={{
                  color: "#44A194",
                  "&:hover": { color: "#EC8F8D" },
                  transition: "color 0.2s",
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>

        {/* Footer */}
        <Typography
          variant="body2"
          textAlign="center"
          color="text.disabled"
          mt={4}
        >
          © 2026 Fish Guru. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
