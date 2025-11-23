// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/components/prof/CourseWizard/CourseWizard.jsx
import React from 'react';
import { Box, Stepper, Step, StepLabel, Paper, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Step1Infos from './Step1Infos';
import Step2Details from './Step2Details';
import Step3Upload from './Step3Upload';
import { usePublishCourse } from '../../../hooks/usePublishCourse';
import { useConfirm } from '../../../contexts/ConfirmContext'; // Import du Context

const steps = ['Informations', 'Détails', 'Document'];

const CourseWizard = () => {
  const navigate = useNavigate();
  const { confirm } = useConfirm(); // Récupération de la fonction confirm
  const { 
    step, nextStep, prevStep, 
    formData, updateField, 
    loading, handlePublish,
    availableFilieres, availableSubjects 
  } = usePublishCourse();

  // GESTION BOUTON ANNULER (Avec Modale Stylisée)
  const handleCancel = async () => {
    const isConfirmed = await confirm(
        "Annuler la publication ?",
        "Toutes les données saisies seront perdues. Voulez-vous vraiment quitter ?",
        "warning"
    );

    if (isConfirmed) {
      navigate('/prof/dashboard');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: 
        return (
          <Step1Infos 
            data={formData} 
            update={updateField} 
            filieres={availableFilieres} 
            subjects={availableSubjects} 
          />
        );
      case 2: return <Step2Details data={formData} update={updateField} />;
      case 3: return <Step3Upload data={formData} update={updateField} />;
      default: return null;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, maxWidth: 800, mx: 'auto', mt: 2 }}>
      <Typography variant="h5" fontWeight="bold" align="center" mb={3}>
        Publier un nouveau cours
      </Typography>

      <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ minHeight: 300 }}>
        {renderStep()}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
        
        {step === 1 ? (
           <Button onClick={handleCancel} color="error" variant="outlined" sx={{ borderRadius: 20 }}>
             Annuler
           </Button>
        ) : (
           <Button onClick={prevStep} variant="outlined" sx={{ borderRadius: 20 }}>
             Retour
           </Button>
        )}
        
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