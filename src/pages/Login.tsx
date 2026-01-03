/**
 * Login Page
 * * The entry point of the application.
 * Displays a branded landing screen with a "Enter Demo" button.
 * Uses custom CSS animations for the entrance effect.
 */

import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <Box 
        sx={{ 
          maxWidth: 500,
          animation: 'fadeInScale 0.8s ease-out',
          '@keyframes fadeInScale': {
            '0%': {
              opacity: 0,
              transform: 'scale(0.95)',
            },
            '100%': {
              opacity: 1,
              transform: 'scale(1)',
            },
          },
        }}
      >
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 200,
                letterSpacing: '0.1em',
                mb: 2
              }}
            >
              APPLYHUB
            </Typography>
            <Box 
              sx={{ 
                width: 60, 
                height: 1, 
                bgcolor: 'text.primary',
                mx: 'auto',
                mb: 3
              }} 
            />
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ letterSpacing: '0.05em' }}
            >
              Grant Application Portal
            </Typography>
          </Box>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ maxWidth: 400, lineHeight: 1.8 }}
          >
            Empowering African startups and NGOs to find, apply, and manage fundraising efficiently.
          </Typography>

          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowRightAltIcon />}
            onClick={() => navigate("/dashboard")}
            sx={{
              px: 6,
              py: 2,
              bgcolor: 'text.primary',
              color: 'background.default',
              '&:hover': {
                bgcolor: 'text.primary',
                opacity: 0.8,
              }
            }}
          >
            Enter Demo
          </Button>

          <Typography variant="caption" color="text.secondary">
            Demo credentials pre-filled
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};