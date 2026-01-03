import { Box, Typography, Button, Paper, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../components/dashboard/StatCard';
import { ActivityItem } from '../components/dashboard/ActivityItem';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 2,
            fontWeight: 300,
            letterSpacing: '-0.02em',
            animation: 'fadeIn 0.8s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          Welcome Back
        </Typography>
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center"
          sx={{ 
            animation: 'fadeIn 0.8s ease-out 0.2s both',
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: '0.05em' }}>
            Track and manage your applications
          </Typography>
          <Button 
            variant="contained"
            endIcon={<ArrowRightAltIcon />}
            onClick={() => navigate('/apply')}
            sx={{
              bgcolor: 'text.primary',
              color: 'background.default',
              '&:hover': {
                bgcolor: 'text.primary',
                opacity: 0.8,
              }
            }}
          >
            New Application
          </Button>
        </Stack>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 8 }}>
        <Grid item xs={12} md={4}>
          <StatCard label="Total Applications" value={3} delay={0.1} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Pending Review" value={1} delay={0.2} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Approved" value={2} delay={0.3} />
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Paper sx={{ p: 4 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1,
            fontWeight: 300,
            letterSpacing: '0.05em'
          }}
        >
          Recent Activity
        </Typography>
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ display: 'block', mb: 3 }}
        >
          Your latest submissions
        </Typography>
        
        <Box>
          <ActivityItem 
            title="Tech Education Grant - Q1 2025"
            date="2 days ago"
            status="Pending"
            delay={0.1}
          />
          <ActivityItem 
            title="Community Health Initiative"
            date="1 week ago"
            status="Approved"
            delay={0.2}
          />
          <ActivityItem 
            title="Agricultural Development Program"
            date="2 weeks ago"
            status="Approved"
            delay={0.3}
          />
        </Box>
      </Paper>
    </Box>
  );
};