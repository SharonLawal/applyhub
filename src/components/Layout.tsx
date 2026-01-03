import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {!isLoginPage && (
        <AppBar position="static">
          <Toolbar>
            <AssignmentIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              ApplyHub
            </Typography>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      )}
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
};