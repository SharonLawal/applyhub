/**
 * OrgDetailsStep Component
 * * Step 2 of the application form.
 * Captures organization metadata: Name, Type, Year Founded, Employees, etc.
 * * Usage:
 * Rendered conditionally within <ApplyForm /> based on activeStep.
 */

import { useFormContext, Controller } from "react-hook-form";
import { Box, MenuItem } from "@mui/material";
import { FormSection } from "./FormSection";
import { FormField } from "./FormField";

export const OrgDetailsStep = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const descValue = watch("orgDescription") || "";

  return (
    <FormSection
      title="Organization Details"
      subtitle="Tell us about your organization"
    >
      <Controller
        name="orgName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormField
            {...field}
            label="Organization Name"
            placeholder="Your organization's name"
            error={!!errors.orgName}
            helperText={errors.orgName?.message as string}
            fullWidth
          />
        )}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <Controller
          name="orgType"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormField
              {...field}
              select
              label="Organization Type"
              error={!!errors.orgType}
              helperText={errors.orgType?.message as string}
              fullWidth
            >
              <MenuItem value="">Select type</MenuItem>
              {["Startup", "NGO", "Social Enterprise", "Non-Profit"].map(
                (t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                )
              )}
            </FormField>
          )}
        />
        <Controller
          name="employees"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormField
              {...field}
              type="number"
              label="Number of Employees"
              error={!!errors.employees}
              helperText={errors.employees?.message as string}
              fullWidth
            />
          )}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <Controller
          name="yearFounded"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormField
              {...field}
              type="number"
              label="Year Founded"
              placeholder="2020"
              error={!!errors.yearFounded}
              helperText={errors.yearFounded?.message as string}
              fullWidth
            />
          )}
        />
        <Controller
          name="regNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormField
              {...field}
              label="Registration Number"
              placeholder="Optional"
              fullWidth
            />
          )}
        />
      </Box>

      <Controller
        name="website"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormField
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
          <FormField
            {...field}
            multiline
            rows={4}
            label="Organization Description"
            placeholder="Describe your organization's mission and activities..."
            error={!!errors.orgDescription}
            helperText={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span>{errors.orgDescription?.message as string}</span>
                <span>{descValue.length}/500</span>
              </Box>
            }
            fullWidth
          />
        )}
      />
    </FormSection>
  );
};
