/**
 * GrantRequestStep Component
 * * Step 3 (Final) of the application form.
 * Captures grant specifics: Title, Amount, Description, Focus Area, Documents.
 * * Usage:
 * Rendered conditionally within <ApplyForm /> based on activeStep.
 */

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  MenuItem,
  InputAdornment,
  Button,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { FormSection } from "./FormSection";
import { FormField } from "./FormField";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export const GrantRequestStep = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const descValue = watch("projectDescription") || "";
  const fileName = watch("fileName");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue("fileName", e.target.files[0].name);
    }
  };

  const focusAreas = [
    "Education",
    "Healthcare",
    "Technology",
    "Agriculture",
    "Climate",
    "Financial Inclusion",
  ];

  return (
    <FormSection
      title="Grant Request Details"
      subtitle="Tell us about your project"
    >
      <Controller
        name="projectTitle"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormField
            {...field}
            label="Project Title"
            placeholder="A descriptive title for your project"
            error={!!errors.projectTitle}
            helperText={errors.projectTitle?.message as string}
            fullWidth
          />
        )}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "140px 1fr" },
          gap: 3,
        }}
      >
        <Controller
          name="currency"
          control={control}
          defaultValue="USD"
          render={({ field }) => (
            <FormField
              {...field}
              select
              label="Currency"
              error={!!errors.currency}
              helperText={errors.currency?.message as string}
              fullWidth
            >
              {["USD", "EUR", "NGN", "KES", "GHS", "ZAR"].map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </FormField>
          )}
        />
        <Controller
          name="grantAmount"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormField
              {...field}
              type="number"
              label="Amount Requested"
              placeholder="50000"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              error={!!errors.grantAmount}
              helperText={errors.grantAmount?.message as string}
              fullWidth
            />
          )}
        />
      </Box>

      <Controller
        name="projectDescription"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormField
            {...field}
            multiline
            rows={5}
            label="Project Description"
            placeholder="Describe your project goals, impact, and implementation plan..."
            error={!!errors.projectDescription}
            helperText={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span>{errors.projectDescription?.message as string}</span>
                <span>{descValue.length}/1000</span>
              </Box>
            }
            fullWidth
          />
        )}
      />

      <Controller
        name="duration"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormField
            {...field}
            select
            label="Project Duration"
            error={!!errors.duration}
            helperText={errors.duration?.message as string}
            fullWidth
          >
            <MenuItem value="">Select duration</MenuItem>
            {[
              "3 months",
              "6 months",
              "12 months",
              "18 months",
              "24 months",
            ].map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </FormField>
        )}
      />

      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            mb: 2,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Focus Areas — Select at least one
        </Typography>
        <Controller
          name="focusArea"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {focusAreas.map((area) => (
                <Chip
                  key={area}
                  label={area}
                  onClick={() => {
                    if (field.value.includes(area)) {
                      field.onChange(
                        field.value.filter((val: string) => val !== area)
                      );
                    } else {
                      field.onChange([...field.value, area]);
                    }
                  }}
                  variant={field.value.includes(area) ? "filled" : "outlined"}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    borderColor: field.value.includes(area)
                      ? "text.primary"
                      : "divider",
                    bgcolor: field.value.includes(area)
                      ? "text.primary"
                      : "transparent",
                    color: field.value.includes(area)
                      ? "background.default"
                      : "text.primary",
                    "&:hover": {
                      borderColor: "text.primary",
                      transform: "translateY(-2px)",
                    },
                  }}
                />
              ))}
            </Stack>
          )}
        />
        {errors.focusArea && (
          <Typography
            variant="caption"
            color="error"
            sx={{ mt: 1, display: "block" }}
          >
            {errors.focusArea?.message as string}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          p: 4,
          textAlign: "center",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "text.primary",
            bgcolor: "action.hover",
          },
        }}
      >
        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
          sx={{ mb: fileName ? 2 : 0 }}
        >
          Upload Supporting Document
          <input
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </Button>
        {fileName && (
          <Box>
            <Chip
              label={fileName}
              onDelete={() => setValue("fileName", "")}
              sx={{ mt: 2 }}
            />
          </Box>
        )}
        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 2 }}
          color="text.secondary"
        >
          PDF, DOC, DOCX — Max 10MB
        </Typography>
      </Box>
    </FormSection>
  );
};
