import React from "react";
import { Paper, Typography, Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, width: "100%", maxWidth: 400, textAlign: "center" }}
      >
        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
          ApplyHub
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Grant Application Portal
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField label="Email" defaultValue="demo@applyhub.org" disabled />
          <TextField
            label="Password"
            type="password"
            defaultValue="password"
            disabled
          />
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/dashboard")}
          >
            Login as Demo User
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
