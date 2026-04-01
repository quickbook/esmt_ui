import { Box, Button, Typography, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ErrorScreen({ errors, onRetry }) {
  const errorList = Object.entries(errors)
    .filter(([key, value]) => value !== null)
    .map(([key, value]) => value);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundImage: 'url(/bg2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        zIndex: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          pointerEvents: 'none',
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 500 }}>
        <ErrorOutlineIcon
          sx={{
            fontSize: 80,
            color: '#d32f2f',
            marginBottom: 2,
          }}
        />

        <Typography
          variant="h5"
          sx={{
            color: '#fff',
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          Oops! Something Went Wrong
        </Typography>

        <Paper
          sx={{
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            borderLeft: '4px solid #d32f2f',
            padding: 2,
            marginBottom: 3,
            color: '#fff',
          }}
        >
          <Typography variant="body2" sx={{ textAlign: 'left' }}>
            <strong>Error Details:</strong>
          </Typography>
          {errorList.length > 0 ? (
            <Box sx={{ marginTop: 1 }}>
              {errorList.map((error, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginTop: 0.5,
                  }}
                >
                  • {error}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.9)',
                marginTop: 0.5,
              }}
            >
              Failed to load application data. Please try again.
            </Typography>
          )}
        </Paper>

        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: 3,
          }}
        >
          Don't worry! This is usually a temporary issue. Click the button below to retry.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={onRetry}
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            padding: '10px 40px',
            fontSize: '1rem',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Try Again
        </Button>
      </Box>
    </Box>
  );
}
