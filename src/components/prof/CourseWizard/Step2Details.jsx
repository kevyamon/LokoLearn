// src/components/prof/CourseWizard/Step2Details.jsx
import React from 'react';
import { Grid, TextField } from '@mui/material';

const Step2Details = ({ data, update }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
      
      <Grid item xs={12}>
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