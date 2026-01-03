/**
 * FormSection Component
 * * A layout wrapper component used to group related form fields together
 * with a consistent title and subtitle styling.
 * * @component
 * @example
 * <FormSection title="Personal Info" subtitle="Tell us about yourself">
 * <FormField name="fullName" label="Full Name" />
 * <FormField name="email" label="Email" />
 * </FormSection>
 */

import { Box, Typography, Divider } from "@mui/material";

interface FormSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <Box
      sx={{
        animation: "slideIn 0.6s ease-out",
        "@keyframes slideIn": {
          "0%": {
            opacity: 0,
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 300,
            letterSpacing: "0.05em",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        <Divider sx={{ mt: 2, mb: 4 }} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
