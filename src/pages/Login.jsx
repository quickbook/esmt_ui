import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Waves, Mail, Lock } from "lucide-react";
import { textFieldSx } from "../theme/theme";
import { loginUser } from "../redux/Slices/loginSlice";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const { status } = useSelector((state) => state.login);
  const isLoading = status === 'loading';

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        if (!value.trim()) error = "Username is required";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (field, value) => {
    if (field === "username") setUsername(value);
    else if (field === "password") setPassword(value);
    
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    const usernameError = validateField("username", username);
    const passwordError = validateField("password", password);

    if (usernameError) newErrors.username = usernameError;
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const resultAction = await dispatch(
        loginUser({ username, password })
      ).unwrap();

      setSnackbar({
        open: true,
        message: resultAction?.message || "Login successful",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/estimate/customer-info");
      }, 1200);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err || "Login failed. Please check your credentials.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "84vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 448 }}>
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
              Login
            </Typography>
            <Typography
              textAlign="center"
              sx={{ color: "rgba(255,255,255,0.9)", fontSize: "0.875rem" }}
            >
              Your Professional Pond Service
            </Typography>
          </Box>

          {/* Login Form */}
          <Box component="form" onSubmit={handleLogin} sx={{ p: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => handleChange("username", e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} color="#9CA3AF" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={textFieldSx}
              />

              <TextField
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => handleChange("password", e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={20} color="#9CA3AF" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={textFieldSx}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        color: "grey.400",
                        "&.Mui-checked": { color: "#44A194" },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.disabled">
                      Remember me
                    </Typography>
                  }
                />
                <Link
                  href="#"
                  underline="hover"
                  variant="body2"
                  sx={{
                    color: "#44A194",
                    "&:hover": { color: "#EC8F8D" },
                    transition: "color 0.2s",
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!username.trim() || !password || isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: "1rem",
                  background: "linear-gradient(to right, #44A194, #537D96)",
                  boxShadow: "none",
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(to right, #44A194, #537D96)",
                    boxShadow: "0 8px 24px rgba(68,161,148,0.4)",
                    transform: "scale(1.02)",
                  },
                  transition: "all 0.2s",
                  "&:disabled": {
                    opacity: 0.6,
                    cursor: "not-allowed",
                  },
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    <span>Logging in...</span>
                  </Box>
                ) : (
                  "Login"
                )}
              </Button>
            </Box>

            <Typography
              variant="body2"
              textAlign="center"
              color="text.disabled"
              mt={3}
            >
              Don't have an account?{" "}
              <Link
                onClick={() => navigate("/estimate/signup")}
                underline="hover"
                fontWeight={600}
                sx={{
                  color: "#44A194",
                  "&:hover": { color: "#EC8F8D" },
                  transition: "color 0.2s",
                  cursor: "pointer",
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>

        <Typography
          variant="body2"
          textAlign="center"
          color="text.disabled"
          mt={4}
        >
          © 2026 Fish Guru. All rights reserved.
        </Typography>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
