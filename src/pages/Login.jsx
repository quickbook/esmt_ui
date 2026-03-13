import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { Waves, Mail, Lock } from "lucide-react";
import { Visibility } from "@mui/icons-material";
import { textFieldSx } from "../theme/theme";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/customer-info");
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
            {/* <Typography
              variant="h5"
              fontWeight={600}
              textAlign="center"
              sx={{ color: "#537D96", mb: 3 }}
            >
              Welcome Back
            </Typography> */}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {/* Email */}
              <TextField
                type="email"
                //label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

              {/* Password */}
              <TextField
                type="password"
                //label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

              {/* Remember me + Forgot password */}
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
                  boxShadow: "none",
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(to right, #44A194, #537D96)",
                    boxShadow: "0 8px 24px rgba(68,161,148,0.4)",
                    transform: "scale(1.02)",
                  },
                  transition: "all 0.2s",
                }}
              >
                Sign In
              </Button>
            </Box>

            {/* Sign up link */}
            <Typography
              variant="body2"
              textAlign="center"
              color="text.disabled"
              mt={3}
            >
              Don't have an account?{" "}
              <Link
                onClick={() => navigate("/signup")}
                underline="hover"
                fontWeight={600}
                sx={{
                  color: "#44A194",
                  "&:hover": { color: "#EC8F8D" },
                  transition: "color 0.2s",
                }}
              >
                Sign up
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
