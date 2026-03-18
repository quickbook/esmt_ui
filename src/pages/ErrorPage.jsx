import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { glassBoxStyles } from "../utils/glassStyles";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/estimate/");
  };

  return (
    <Box
      sx={{
        minHeight: "84vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md" sx={{ ...glassBoxStyles, padding: { xs: "4rem 2rem", sm: 4, lg: "4rem 6rem" } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            color="primary.contrastText"
            mb={4}
            textAlign="center"
            sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
          >
            Error 404 &nbsp; Page Not Found !
          </Typography>
          <Typography color="primary.contrastText" mt={1} textAlign="center" mb={4}>
            Sorry, the page you are looking for does not exist. Please check the URL or return to the homepage.
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                background: "#44A194",
                "&:hover": { background: "#537D96" },
                padding: { xs: "10px 24px", sm: "12px 36px", md: "12px 48px" },
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                borderRadius: 4,
                mt: 2,
              }}
            >
                Go to Homepage
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ErrorPage;
