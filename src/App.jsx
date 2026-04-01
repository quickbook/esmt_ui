import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import theme from "./theme/theme";
import Router from "./components/Router";
import { EstimateFormProvider } from "./contexts/EstimateFormContext";
import DataLoader from "./components/DataLoader";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DataLoader>
        <Box
          sx={{
            minHeight: "100vh",
            width: "100%",
            backgroundImage: "url(/bg2.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            position: "relative",
            zIndex: 0,

            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              pointerEvents: "none",
              zIndex: 0,
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <EstimateFormProvider>
              <Router />
            </EstimateFormProvider>
          </Box>
        </Box>
      </DataLoader>
    </ThemeProvider>
  );
}

export default App;
