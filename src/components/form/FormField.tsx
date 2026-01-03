import React from "react";
import { TextField, Box, Typography, Zoom } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const FormField: React.FC<TextFieldProps> = (props) => {
  const { error, helperText, sx, ...other } = props;

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <TextField
        {...other}
        error={!!error}
        helperText={error ? null : helperText}
        sx={{
          "& .MuiOutlinedInput-root": {
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&.Mui-error": {
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? "#fff5f5"
                  : "rgba(239, 68, 68, 0.1)",
            },
          },
          ...sx,
        }}
      />

      <Box sx={{ minHeight: "24px", mt: 0.5, px: 1 }}>
        {error ? (
          <Zoom in={Boolean(error)} timeout={300}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "error.main",
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 18 }} />
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{ lineHeight: 1.2 }}
              >
                {helperText}
              </Typography>
            </Box>
          </Zoom>
        ) : null}
      </Box>
    </Box>
  );
};
