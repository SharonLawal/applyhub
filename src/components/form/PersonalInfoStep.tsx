/**
 * PersonalInfoStep Component
 * * Step 1 of the application form.
 * Captures user identity details: Name, Email, Phone, Country, Role.
 * * Usage:
 * Rendered conditionally within <ApplyForm /> based on activeStep.
 */

import { useFormContext, Controller } from "react-hook-form";
import { Box, MenuItem } from "@mui/material";
import { FormSection } from "./FormSection";
import { FormField } from "./FormField";
import { africanCountries } from "../../utils/schemas";

export const PersonalInfoStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormSection title="Personal Information" subtitle="Tell us about yourself">
      <Controller
        name="fullName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormField
            {...field}
            label="Full Name"
            placeholder="Enter your full name"
            error={!!errors.fullName}
            helperText={errors.fullName?.message as string}
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
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormField
              {...field}
              label="Email Address"
              placeholder="your.email@example.com"
              error={!!errors.email}
              helperText={errors.email?.message as string}
              fullWidth
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormField
              {...field}
              label="Phone Number"
              placeholder="+234 123 456 7890"
              error={!!errors.phone}
              helperText={errors.phone?.message as string}
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
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormField
              {...field}
              select
              label="Country"
              error={!!errors.country}
              helperText={errors.country?.message as string}
              fullWidth
            >
              <MenuItem value="">Select a country</MenuItem>
              {africanCountries.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </FormField>
          )}
        />
        <Controller
          name="role"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormField
              {...field}
              select
              label="Your Role"
              error={!!errors.role}
              helperText={errors.role?.message as string}
              fullWidth
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
            </FormField>
          )}
        />
      </Box>
    </FormSection>
  );
};
