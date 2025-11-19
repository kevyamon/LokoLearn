// src/components/prof/CourseWizard/CourseWizard.jsx
import React from 'react';
import { Box, Stepper, Step, StepLabel, Paper, Button, Typography } from '@mui/material';
import Step1Infos from './Step1Infos';
import Step2Details from './Step2Details';
import Step3Upload from './Step3Upload';
import { usePublishCourse } from '../../../hooks/usePublishCourse';

const steps = ['Informations', 'Détails', 'Document'];

const CourseWizard = () => {
  const { 
    step, nextStep, prevStep, 
    formData, updateField, 
    loading, handlePublish,
    availableFilieres, availableSubjects 
  } = usePublishCourse();

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Infos data={formData} update={updateField} filieres={availableFilieres} subjects={availableSubjects} />;
      case 2: return <Step2Details data={formData} update={updateField} />;
      case 3: return <Step3Upload data={formData} update={updateField} />;
      default: return null;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" fontWeight="bold" align="center" mb={3}>
        Publier un nouveau cours
      </Typography>

      <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ minHeight: 300 }}>
        {renderStep()}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button disabled={step === 1} onClick={prevStep} variant="outlined" sx={{ borderRadius: 20 }}>
          Retour
        </Button>
        
        {step < 3 ? (
           <Button variant="contained" onClick={nextStep} sx={{ borderRadius: 20, px: 4 }}>
             Suivant
           </Button>
        ) : (
           <Button 
             variant="contained" 
             color="success" 
             onClick={handlePublish} 
             disabled={loading || !formData.fileUrl}
             sx={{ borderRadius: 20, px: 4, boxShadow: '0 4px 14px rgba(46, 125, 50, 0.4)' }}
           >
             {loading ? 'Publication...' : 'Publier le Cours'}
           </Button>
        )}
      </Box>
    </Paper>
  );
};

export default CourseWizard;