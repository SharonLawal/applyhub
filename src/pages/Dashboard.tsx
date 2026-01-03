import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StatCard } from "../components/dashboard/StatCard";
import { ActivityItem } from "../components/dashboard/ActivityItem";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useApplications } from "../context/ApplicationContext";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { stats, applications } = useApplications(); 

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          mb: 6,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ mb: 1, color: "text.primary" }}>
            Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back to your grant dashboard
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowRightAltIcon />}
          onClick={() => navigate("/apply")}
          sx={{ px: 4 }}
        >
          New Application
        </Button>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Total Applications"
            value={stats.total}
            delay={0.1}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Pending Review" value={stats.pending} delay={0.2} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            label="Approved Grants"
            value={stats.approved}
            ZS
            delay={0.3}
          />
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Recent Activity
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {applications.length > 0 ? (
            applications.map((app, index) => (
              <ActivityItem
                key={app.id}
                title={app.projectName}
                date={app.date}
                status={app.status}
                delay={0.1 * index}
              />
            ))
          ) : (
            <Typography
              color="text.secondary"
              sx={{ py: 4, textAlign: "center" }}
            >
              No applications yet. Start by creating one!
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
