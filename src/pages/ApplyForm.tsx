import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { PersonalInfoStep } from "../components/form/PersonalInfoStep";
import { OrgDetailsStep } from "../components/form/OrgDetailsStep";
import { GrantRequestStep } from "../components/form/GrantRequestStep";
import { combinedSchema, type ApplyFormData } from "../utils/types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const steps = ["Personal", "Organization", "Grant Request"];

export const ApplyForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ ref: string } | null>(
    null
  );
  const navigate = useNavigate();

  const methods = useForm<ApplyFormData>({
    resolver: zodResolver(combinedSchema),
    mode: "onBlur",
    defaultValues: {
      focusArea: [],
    },
  });

  const { trigger, handleSubmit, getValues } = methods;

  const handleNext = async () => {
    let isValid = false;
    if (activeStep === 0) {
      isValid = await trigger([
        "fullName",
        "email",
        "phone",
        "country",
        "role",
      ]);
    } else if (activeStep === 1) {
      isValid = await trigger([
        "orgName",
        "orgType",
        "yearFounded",
        "orgDescription",
        "employees",
      ]);
    } else {
      isValid = true;
    }

    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = async (data: ApplyFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    const refNum = `APH-2025-${Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0")}`;
    setSubmitSuccess({ ref: refNum });
    console.log("Form Data Submitted:", data);
  };

  if (submitSuccess) {
    const data = getValues();
    return (
      <Box
        sx={{
          textAlign: "center",
          animation: "fadeIn 0.8s ease-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: 80, mb: 3, opacity: 0.7 }} />
        <Typography variant="h4" sx={{ fontWeight: 300, mb: 2 }}>
          Application Submitted
        </Typography>
        <Box
          sx={{
            width: 60,
            height: 1,
            bgcolor: "text.primary",
            mx: "auto",
            mb: 3,
          }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, letterSpacing: "0.1em" }}
        >
          REFERENCE ID
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, fontWeight: 400 }}>
          {submitSuccess.ref}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 500, mx: "auto" }}
        >
          Thank you, {data.fullName}. We have received your request for{" "}
          {data.currency} {data.grantAmount} for "{data.projectTitle}".
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard")}
          sx={{
            bgcolor: "text.primary",
            color: "background.default",
            "&:hover": {
              bgcolor: "text.primary",
              opacity: 0.8,
            },
          }}
        >
          Return to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <Paper sx={{ p: { xs: 3, md: 5 } }}>
        <Stepper
          activeStep={activeStep}
          sx={{
            mb: 6,
            "& .MuiStepLabel-label": {
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ minHeight: "400px" }}>
            {activeStep === 0 && <PersonalInfoStep />}
            {activeStep === 1 && <OrgDetailsStep />}
            {activeStep === 2 && <GrantRequestStep />}
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: "divider" }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              sx={{ visibility: activeStep === 0 ? "hidden" : "visible" }}
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                sx={{
                  bgcolor: "text.primary",
                  color: "background.default",
                  "&:hover": {
                    bgcolor: "text.primary",
                    opacity: 0.8,
                  },
                  "&:disabled": {
                    opacity: 0.5,
                  },
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "text.primary",
                  color: "background.default",
                  "&:hover": {
                    bgcolor: "text.primary",
                    opacity: 0.8,
                  },
                }}
              >
                Next
              </Button>
            )}
          </Stack>
        </form>
      </Paper>
    </FormProvider>
  );
};
