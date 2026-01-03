/**
 * FormSteps Module
 * * Contains the individual step components for the multi-step Grant Application Form.
 * * Exports:
 * - PersonalInfoStep: Step 1 - Captures personal identity (Name, Email, Role).
 * - OrgDetailsStep: Step 2 - Captures organization metadata (Name, Type, Year).
 * - GrantRequestStep: Step 3 - Captures project details, funding needs, and file uploads.
 * * * Usage:
 * These components are designed to be used within the <ApplyForm /> parent component.
 * They rely on `useFormContext` from `react-hook-form`, so they MUST be wrapped 
 * inside a <FormProvider>.
 * * @example
 * <FormProvider {...methods}>
 * {activeStep === 0 && <PersonalInfoStep />}
 * {activeStep === 1 && <OrgDetailsStep />}
 * {activeStep === 2 && <GrantRequestStep />}
 * </FormProvider>
 */

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  FormHelperText,
  InputAdornment,
  Button,
  Box,
  Typography,
  Paper,
  Chip,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { africanCountries } from "../utils/schemas";

export const PersonalInfoStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Paper
        sx={{ p: 2, bgcolor: "primary.light", color: "primary.contrastText" }}
        elevation={0}
      >
        <Typography variant="h6" fontWeight="bold">
          Personal Information
        </Typography>
        <Typography variant="body2">Tell us about yourself</Typography>
      </Paper>

      <Controller
        name="fullName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Full Name"
            placeholder="Enter your full name"
            error={!!errors.fullName}
            helperText={errors.fullName?.message as string}
            fullWidth
          />
        )}
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email Address"
              placeholder="your.email@example.com"
              error={!!errors.email}
              helperText={errors.email?.message as string}
              fullWidth
              sx={{ flex: 1, minWidth: "250px" }}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              placeholder="+234 123 456 7890"
              error={!!errors.phone}
              helperText={errors.phone?.message as string}
              fullWidth
              sx={{ flex: 1, minWidth: "250px" }}
            />
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Country"
              error={!!errors.country}
              helperText={errors.country?.message as string}
              fullWidth
              sx={{ flex: 1, minWidth: "250px" }}
            >
              <MenuItem value="">Select a country</MenuItem>
              {africanCountries.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="role"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Your Role"
              error={!!errors.role}
              helperText={errors.role?.message as string}
              fullWidth
              sx={{ flex: 1, minWidth: "250px" }}
            >
              <MenuItem value="">Select your role</MenuItem>
              {[
                "Founder",
                "Executive Director",
                "Program Manager",
                "Other",
              ].map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>
    </Box>
  );
};

export const OrgDetailsStep = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const descValue = watch("orgDescription") || "";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Paper
        sx={{ p: 2, bgcolor: "primary.light", color: "primary.contrastText" }}
        elevation={0}
      >
        <Typography variant="h6" fontWeight="bold">
          Organization Details
        </Typography>
        <Typography variant="body2">Tell us about your organization</Typography>
      </Paper>

      <Controller
        name="orgName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Organization Name"
            placeholder="Your organization's name"
            error={!!errors.orgName}
            helperText={errors.orgName?.message as string}
            fullWidth
          />
        )}
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Controller
          name="orgType"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Organization Type"
              error={!!errors.orgType}
              helperText={errors.orgType?.message as string}
              fullWidth
              sx={{ flex: 1, minWidth: "250px" }}
            >
              <MenuItem value="">Select type</MenuItem>
              {["Startup", "NGO", "Social Enterprise", "Non-Profit"].map(
                (t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                )
              )}
            </TextField>
          )}
        />
        <Controller
          name="employees"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Number of Employees"
              error={!!errors.employees}
              helperText={errors.employees?.message as string}
              fullWidth
              sx={{ flex: 1, minWidth: "250px" }}
            />
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Controller
          name="yearFounded"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Year Founded"
              placeholder="2020"
              error={!!errors.yearFounded}
              helperText={errors.yearFounded?.message as string}
              fullWidth
              sx={{ flex: 1, minWidth: "200px" }}
            />
          )}
        />
        <Controller
          name="regNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Registration Number"
              placeholder="Optional"
              fullWidth
              sx={{ flex: 1, minWidth: "200px" }}
            />
          )}
        />
      </Box>

      <Controller
        name="website"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Website"
            placeholder="https://yourorganization.org (optional)"
            error={!!errors.website}
            helperText={errors.website?.message as string}
            fullWidth
          />
        )}
      />

      <Controller
        name="orgDescription"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            rows={4}
            label="Organization Description"
            placeholder="Describe your organization's mission and activities..."
            error={!!errors.orgDescription}
            helperText={
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <span>{errors.orgDescription?.message as string}</span>
                <span>{descValue.length}/500</span>
              </Box>
            }
            fullWidth
          />
        )}
      />
    </Box>
  );
};

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Paper
        sx={{ p: 2, bgcolor: "primary.light", color: "primary.contrastText" }}
        elevation={0}
      >
        <Typography variant="h6" fontWeight="bold">
          Grant Request Details
        </Typography>
        <Typography variant="body2">Tell us about your project</Typography>
      </Paper>

      <Alert severity="info" sx={{ borderRadius: 2 }}>
        Please provide detailed information about your project and funding needs
      </Alert>

      <Controller
        name="projectTitle"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Project Title"
            placeholder="A descriptive title for your project"
            error={!!errors.projectTitle}
            helperText={errors.projectTitle?.message as string}
            fullWidth
          />
        )}
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Controller
          name="currency"
          control={control}
          defaultValue="USD"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Currency"
              sx={{ width: 140 }}
              error={!!errors.currency}
              helperText={errors.currency?.message as string}
            >
              {["USD", "EUR", "NGN", "KES", "GHS", "ZAR"].map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="grantAmount"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
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
              sx={{ flex: 1 }}
            />
          )}
        />
      </Box>

      <Controller
        name="projectDescription"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            rows={5}
            label="Project Description"
            placeholder="Describe your project goals, impact, and implementation plan..."
            error={!!errors.projectDescription}
            helperText={
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
          <TextField
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
          </TextField>
        )}
      />

      <FormControl error={!!errors.focusArea} component="fieldset">
        <FormLabel component="legend" sx={{ mb: 1, fontWeight: "bold" }}>
          Focus Areas (Select at least one)
        </FormLabel>
        <Controller
          name="focusArea"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[
                "Education",
                "Healthcare",
                "Technology",
                "Agriculture",
                "Climate",
                "Financial Inclusion",
              ].map((area) => (
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
                  color={field.value.includes(area) ? "primary" : "default"}
                  variant={field.value.includes(area) ? "filled" : "outlined"}
                  sx={{ cursor: "pointer" }}
                />
              ))}
            </Box>
          )}
        />
        <FormHelperText>{errors.focusArea?.message as string}</FormHelperText>
      </FormControl>

      <Paper
        variant="outlined"
        sx={{ p: 3, textAlign: "center", borderStyle: "dashed" }}
      >
        <Button
          component="label"
          variant="outlined"
          size="large"
          startIcon={<CloudUploadIcon />}
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
          <Chip
            label={fileName}
            color="success"
            onDelete={() => setValue("fileName", "")}
          />
        )}
        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 1 }}
          color="text.secondary"
        >
          Accepted formats: PDF, DOC, DOCX (Max 10MB)
        </Typography>
      </Paper>
    </Box>
  );
};
