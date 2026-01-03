import { useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { PersonalInfoStep } from "../components/form/PersonalInfoStep";
import { OrgDetailsStep } from "../components/form/OrgDetailsStep";
import { GrantRequestStep } from "../components/form/GrantRequestStep";
import { combinedSchema, type ApplyFormData } from "../utils/types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useApplications } from "../context/ApplicationContext";

const steps = ["Personal", "Organization", "Grant Request"];

export const ApplyForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ ref: string } | null>(
    null
  );
  const navigate = useNavigate();
  const { addApplication } = useApplications();

  const methods = useForm<ApplyFormData>({
    resolver: zodResolver(combinedSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
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

    addApplication(data);

    setIsSubmitting(false);
    const refNum = `APH-2025-${Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0")}`;
    setSubmitSuccess({ ref: refNum });
  };

  if (submitSuccess) {
    const data = getValues();
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <CheckCircleOutlineIcon
          sx={{ fontSize: 80, mb: 3, color: "success.main" }}
        />
        <Typography variant="h4" sx={{ fontWeight: 300, mb: 2 }}>
          Application Submitted
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          {submitSuccess.ref}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          Thank you, {data.fullName}.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/dashboard")}>
          Return to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <Paper sx={{ p: { xs: 3, md: 5 } }}>
        <Stepper activeStep={activeStep} sx={{ mb: 6 }} alternativeLabel>
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
                startIcon={
                  isSubmitting && <CircularProgress size={20} color="inherit" />
                }
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
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
