import React from 'react';
import { Paper, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => navigate('/apply')}
        >
          New Application
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h6">Total Grants</Typography>
              <Typography variant="h3">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <Typography variant="h6">Pending Review</Typography>
              <Typography variant="h3">1</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography variant="h6">Approved</Typography>
              <Typography variant="h3">2</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>Recent Applications</Typography>
        <Typography variant="body2" color="textSecondary">No recent activity to display for this session.</Typography>
      </Paper>
    </Box>
  );
};F