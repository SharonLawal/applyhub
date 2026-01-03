import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  FormHelperText,
  InputAdornment,
  Button,
  Box,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { africanCountries } from "../utils/schemas";

// --- Step 1 Component ---
export const PersonalInfoStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h6">Who are you?</Typography>

      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Full Name"
            error={!!errors.fullName}
            helperText={errors.fullName?.message as string}
            fullWidth
          />
        )}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message as string}
              fullWidth
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              error={!!errors.phone}
              helperText={errors.phone?.message as string}
              fullWidth
            />
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Country"
              error={!!errors.country}
              helperText={errors.country?.message as string}
              fullWidth
            >
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
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Role"
              error={!!errors.role}
              helperText={errors.role?.message as string}
              fullWidth
            >
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

// --- Step 2 Component ---
export const OrgDetailsStep = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const descValue = watch("orgDescription") || "";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h6">Tell us about your organization</Typography>

      <Controller
        name="orgName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Organization Name"
            error={!!errors.orgName}
            helperText={errors.orgName?.message as string}
            fullWidth
          />
        )}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="orgType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Type"
              error={!!errors.orgType}
              helperText={errors.orgType?.message as string}
              fullWidth
            >
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
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Employees"
              error={!!errors.employees}
              helperText={errors.employees?.message as string}
              fullWidth
            />
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="yearFounded"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Year Founded"
              error={!!errors.yearFounded}
              helperText={errors.yearFounded?.message as string}
              fullWidth
            />
          )}
        />
        <Controller
          name="regNumber"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Reg Number (Optional)" fullWidth />
          )}
        />
      </Box>

      <Controller
        name="website"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Website (Optional)"
            error={!!errors.website}
            helperText={errors.website?.message as string}
            fullWidth
          />
        )}
      />

      <Controller
        name="orgDescription"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            rows={4}
            label="Organization Description"
            error={!!errors.orgDescription}
            helperText={`${descValue.length}/500 characters. ${
              errors.orgDescription?.message || ""
            }`}
            fullWidth
          />
        )}
      />
    </Box>
  );
};

// --- Step 3 Component ---
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
      <Typography variant="h6">Project Details</Typography>

      <Controller
        name="projectTitle"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Project Title"
            error={!!errors.projectTitle}
            helperText={errors.projectTitle?.message as string}
            fullWidth
          />
        )}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Currency"
              sx={{ width: 120 }}
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
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Amount Requested"
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
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            rows={4}
            label="Project Description"
            error={!!errors.projectDescription}
            helperText={`${descValue.length}/1000 characters. ${
              errors.projectDescription?.message || ""
            }`}
            fullWidth
          />
        )}
      />

      <Controller
        name="duration"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Project Duration"
            error={!!errors.duration}
            helperText={errors.duration?.message as string}
            fullWidth
          >
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
        <FormLabel component="legend">Focus Area</FormLabel>
        <Controller
          name="focusArea"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <FormGroup row>
              {[
                "Education",
                "Healthcare",
                "Technology",
                "Agriculture",
                "Climate",
                "Financial Inclusion",
              ].map((area) => (
                <FormControlLabel
                  key={area}
                  control={
                    <Checkbox
                      checked={field.value.includes(area)}
                      onChange={(e) => {
                        if (e.target.checked)
                          field.onChange([...field.value, area]);
                        else
                          field.onChange(
                            field.value.filter((val: string) => val !== area)
                          );
                      }}
                    />
                  }
                  label={area}
                />
              ))}
            </FormGroup>
          )}
        />
        <FormHelperText>{errors.focusArea?.message as string}</FormHelperText>
      </FormControl>

      <Box
        sx={{
          border: "1px dashed #ccc",
          p: 3,
          borderRadius: 1,
          textAlign: "center",
        }}
      >
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
        >
          Upload Proposal (PDF/DOC)
          <input
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </Button>
        {fileName && (
          <Typography variant="body2" sx={{ mt: 1, color: "green" }}>
            Selected: {fileName}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
