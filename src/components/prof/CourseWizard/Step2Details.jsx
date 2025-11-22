// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/components/prof/CourseWizard/Step2Details.jsx
import React from 'react';
import { Grid, TextField } from '@mui/material';

const Step2Details = ({ data, update }) => {
  return (
    <Grid container spacing={3}>
      {/* Utilisation de 'size' au lieu de 'item xs' pour la nouvelle version MUI */}
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Titre du cours"
          placeholder="Ex: Introduction aux Algorithmes de Tri"
          variant="outlined"
          value={data.titre}
          onChange={(e) => update('titre', e.target.value)}
          helperText="Soyez précis pour aider les étudiants à trouver votre cours."
        />
      </Grid>
      
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Description (Optionnel)"
          multiline
          rows={4}
          variant="outlined"
          value={data.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Ce cours aborde les concepts fondamentaux..."
        />
      </Grid>
    </Grid>
  );
};

export default Step2Details;