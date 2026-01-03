import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stepper, Step, StepLabel, Button, Paper, Box, CircularProgress, Typography, Alert } from '@mui/material';
import { PersonalInfoStep, OrgDetailsStep, GrantRequestStep } from '../components/FormSteps';
import { step1Schema, step2Schema, step3Schema } from '../utils/schemas';
import { combinedSchema, FormData } from '../utils/types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const steps = ['Personal Info', 'Organization', 'Grant Request'];

export const ApplyForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{ref: string} | null>(null);
  const navigate = useNavigate();

  const methods = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    mode: 'onBlur',
    defaultValues: {
      focusArea: []
    }
  });

  const { trigger, handleSubmit, getValues } = methods;

  // Validate current step before moving next
  const handleNext = async () => {
    let isValid = false;
    if (activeStep === 0) {
      isValid = await trigger(['fullName', 'email', 'phone', 'country', 'role']);
    } else if (activeStep === 1) {
      isValid = await trigger(['orgName', 'orgType', 'yearFounded', 'orgDescription', 'employees']);
    } else {
      isValid = true;
    }

    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    const refNum = `APH-2025-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
    setSubmitSuccess({ ref: refNum });
    console.log("Form Data Submitted:", data);
  };

  // Success View
  if (submitSuccess) {
    const data = getValues();
    return (
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center', mt: 4 }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>Application Submitted!</Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Reference ID: {submitSuccess.ref}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
          Thank you, {data.fullName}. We have received your request for {data.currency} {data.grantAmount} for project "{data.projectTitle}".
        </Typography>
        <Button variant="contained" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Paper>
    );
  }

  return (
    <FormProvider {...methods}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && <PersonalInfoStep />}
          {activeStep === 1 && <OrgDetailsStep />}
          {activeStep === 2 && <GrantRequestStep />}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </FormProvider>
  );
};