//import { Check } from "lucide-react";
import { Box, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

const steps = [
  "Customer Info",
  "Pond Info",
  "Pond Type",
  "Estimator",
  "Availability",
  "Quote",
];

export function Stepper({ currentStep }) {
  return (
    <Box sx={{ mb: 10 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          borderRadius: 3,
          p: 1,
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {/* Step Circle + Label */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: { xs: 64, md: 120 },
                flexShrink: 0,
              }}
            >
              {/* Circle */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "2px solid",
                  transition: "all 0.3s",
                  ...(index < currentStep
                    ? {
                        bgcolor: "#44A194",
                        borderColor: "#44A194",
                        color: "white",
                      }
                    : index === currentStep
                      ? {
                          bgcolor: "white",
                          borderColor: "#44A194",
                          color: "#44A194",
                        }
                      : {
                          bgcolor: "white",
                          borderColor: "grey.300",
                          color: "grey.400",
                        }),
                }}
              >
                {index < currentStep ? (
                  <Check sx={{ fontSize: 20 }} />
                ) : (
                  <Typography component="span" sx={{ fontWeight: 600 }}>
                    {index + 1}
                  </Typography>
                )}
              </Box>

              {/* Label */}
              <Typography
                sx={{
                  mt: 1,
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                  textAlign: "center",
                  ...(index <= currentStep
                    ? { color: "#537D96", fontWeight: 500 }
                    : { color: "grey.400" }),
                }}
              >
                {step}
              </Typography>
            </Box>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  height: "2px",
                  flex: 1,
                  mx: 1,
                  alignSelf: "center",
                  bgcolor: index < currentStep ? "#44A194" : "grey.300",
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
