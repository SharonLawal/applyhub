import React from 'react';
import { Box, Container, IconButton, Typography, Stack } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import { useColorMode } from '../context/ThemeContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const { mode, toggleColorMode } = useColorMode();

  const handleLogout = () => navigate('/');

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      transition: 'background-color 0.3s ease',
    }}>
      <Box 
        component="header" 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          py: 2.5,
          position: 'sticky',
          top: 0,
          bgcolor: 'background.default',
          zIndex: 1000,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 300,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                '&:hover': { opacity: 0.7 }
              }}
              onClick={() => navigate(isLoginPage ? '/' : '/dashboard')}
            >
              APPLYHUB
            </Typography>
            
            <Stack direction="row" spacing={1}>
              <IconButton 
                onClick={toggleColorMode} 
                sx={{ 
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'rotate(180deg)' }
                }}
              >
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              
              {!isLoginPage && (
                <IconButton 
                  onClick={handleLogout}
                  sx={{ 
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateX(4px)' }
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {children}
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          borderTop: 1, 
          borderColor: 'divider',
          py: 3,
          mt: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ letterSpacing: '0.05em' }}
          >
            © 2025 APPLYHUB — EMPOWERING CHANGE
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};