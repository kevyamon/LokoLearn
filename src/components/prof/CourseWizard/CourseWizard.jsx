// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/components/prof/CourseWizard/CourseWizard.jsx
import React from 'react';
import { Box, Stepper, Step, StepLabel, Paper, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import Step1Infos from './Step1Infos';
import Step2Details from './Step2Details';
import Step3Upload from './Step3Upload';
import { usePublishCourse } from '../../../hooks/usePublishCourse';

const steps = ['Informations', 'Détails', 'Document'];

const CourseWizard = () => {
  const navigate = useNavigate(); // Hook de navigation
  const { 
    step, nextStep, prevStep, 
    formData, updateField, 
    loading, handlePublish,
    // On n'a plus besoin de availableFilieres/Subjects ici car on est passé en texte libre
  } = usePublishCourse();

  // --- GESTION DU BOUTON ANNULER ---
  const handleCancel = () => {
    if (window.confirm("Voulez-vous vraiment annuler ? Toutes les données saisies seront perdues.")) {
      navigate('/prof/dashboard'); // Retour au tableau de bord
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Infos data={formData} update={updateField} />;
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

      {/* ZONE DES BOUTONS */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
        
        {/* GAUCHE : Annuler ou Retour */}
        {step === 1 ? (
           <Button 
             onClick={handleCancel} 
             color="error" // Rouge
             variant="outlined" 
             sx={{ borderRadius: 20 }}
           >
             Annuler
           </Button>
        ) : (
           <Button 
             onClick={prevStep} 
             variant="outlined" 
             sx={{ borderRadius: 20 }}
           >
             Retour
           </Button>
        )}
        
        {/* DROITE : Suivant ou Publier */}
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