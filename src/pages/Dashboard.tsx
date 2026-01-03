import { Paper, Typography, Button, Box, Card, CardContent, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const getCardStyle = (lightColor: string, darkColor: string) => ({
    bgcolor: theme.palette.mode === 'light' ? lightColor : darkColor,
    color: theme.palette.mode === 'light' ? 'inherit' : '#fff'
  });

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

      {/* Classic Grid Container */}
      <Grid container spacing={3}>
        {/* Classic Grid Item syntax */}
        <Grid item xs={12} md={4}>
          <Card sx={getCardStyle('#e3f2fd', '#0d47a1')}>
            <CardContent>
              <Typography variant="h6">Total Grants</Typography>
              <Typography variant="h3">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={getCardStyle('#fff3e0', '#e65100')}>
            <CardContent>
              <Typography variant="h6">Pending Review</Typography>
              <Typography variant="h3">1</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={getCardStyle('#e8f5e9', '#1b5e20')}>
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
};