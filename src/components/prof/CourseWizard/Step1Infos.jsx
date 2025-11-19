// src/components/prof/CourseWizard/Step1Infos.jsx
import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const Step1Infos = ({ data, update, filieres, subjects }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Filière</InputLabel>
          <Select
            value={data.filiere}
            label="Filière"
            onChange={(e) => update('filiere', e.target.value)}
          >
            {filieres.map(f => <MenuItem key={f._id} value={f._id}>{f.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Niveau</InputLabel>
          <Select
            value={data.niveau}
            label="Niveau"
            onChange={(e) => update('niveau', e.target.value)}
          >
            {/* Idéalement dynamique selon le type de la filière choisie */}
            <MenuItem value="L1">Licence 1</MenuItem>
            <MenuItem value="L2">Licence 2</MenuItem>
            <MenuItem value="L3">Licence 3</MenuItem>
            <MenuItem value="M1">Master 1</MenuItem>
            <MenuItem value="BTS1">BTS 1ère Année</MenuItem>
            <MenuItem value="BTS2">BTS 2ème Année</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Matière</InputLabel>
          <Select
            value={data.matiere}
            label="Matière"
            onChange={(e) => update('matiere', e.target.value)}
          >
             {subjects.map(s => <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Type de document</InputLabel>
          <Select
            value={data.typeCours}
            label="Type de document"
            onChange={(e) => update('typeCours', e.target.value)}
          >
            <MenuItem value="COURS">Cours Magistral</MenuItem>
            <MenuItem value="TP">Travaux Pratiques (TP)</MenuItem>
            <MenuItem value="TD">Travaux Dirigés (TD)</MenuItem>
            <MenuItem value="EXAMEN">Sujet d'Examen</MenuItem>
          </Select>
          <FormHelperText>Permet de ranger le fichier dans la bonne catégorie.</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Step1Infos;