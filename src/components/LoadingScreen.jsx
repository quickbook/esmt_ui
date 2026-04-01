import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingScreen() {
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
      <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <CircularProgress
          size={80}
          sx={{
            color: '#1976d2',
            marginBottom: 3,
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
          Loading Application
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem',
          }}
        >
          Please wait while we prepare your data...
        </Typography>
      </Box>
    </Box>
  );
}
