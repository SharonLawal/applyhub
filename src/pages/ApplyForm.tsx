import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stepper, Step, StepLabel, Button, Paper, Box, Stack, CircularProgress } from "@mui/material";
import { PersonalInfoStep } from "../components/form/PersonalInfoStep";
import { OrgDetailsStep } from "../components/form/OrgDetailsStep";
import { GrantRequestStep } from "../components/form/GrantRequestStep";
import { combinedSchema, type ApplyFormData } from "../utils/types";
import { useApplications } from "../context/ApplicationContext";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const steps = ["Personal Info", "Organization", "Grant Request"];

export const ApplyForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { addApplication } = useApplications();
  const navigate = useNavigate();

  const methods = useForm<ApplyFormData>({
    resolver: zodResolver(combinedSchema),
    mode: "all",
    defaultValues: { focusArea: [] },
  });

  const { trigger, handleSubmit, formState: { isSubmitting } } = methods;

  useEffect(() => {
    trigger(); 
  }, [trigger]);

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (activeStep === 0) fieldsToValidate = ["fullName", "email", "phone", "country", "role"];
    if (activeStep === 1) fieldsToValidate = ["orgName", "orgType", "yearFounded", "orgDescription", "employees"];
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = async (data: ApplyFormData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    addApplication(data);
    
    // Navigate back to Dashboard
    navigate('/dashboard'); 
  };

  return (
    <FormProvider {...methods}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <Stepper activeStep={activeStep} sx={{ mb: 5 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ minHeight: '400px' }}>
            {activeStep === 0 && <PersonalInfoStep />}
            {activeStep === 1 && <OrgDetailsStep />}
            {activeStep === 2 && <GrantRequestStep />}
          </Box>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 5, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              color="inherit"
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button 
                variant="contained" 
                type="submit" 
                size="large"
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} color="inherit" />}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext} endIcon={<ArrowForwardIcon />}>
                Next Step
              </Button>
            )}
          </Stack>
        </form>
      </Paper>
    </FormProvider>
  );
};