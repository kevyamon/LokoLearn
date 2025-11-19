// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/components/prof/CourseWizard/Step1Infos.jsx
import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField } from '@mui/material';

const Step1Infos = ({ data, update }) => {
  return (
    <Grid container spacing={3}>
      
      {/* CHAMP 1 : FILIÈRE (Saisie Libre) */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Nom de la Filière"
          placeholder="Ex: IGL, RIT, Communication..."
          variant="outlined"
          value={data.filiere}
          onChange={(e) => update('filiere', e.target.value)}
          helperText="Saisissez le nom complet ou l'abréviation."
        />
      </Grid>
      
      {/* CHAMP 2 : NIVEAU (Choix imposé pour standardisation) */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth>
          <InputLabel>Niveau</InputLabel>
          <Select
            value={data.niveau}
            label="Niveau"
            onChange={(e) => update('niveau', e.target.value)}
          >
            <MenuItem value="L1">Licence 1</MenuItem>
            <MenuItem value="L2">Licence 2</MenuItem>
            <MenuItem value="L3">Licence 3</MenuItem>
            <MenuItem value="M1">Master 1</MenuItem>
            <MenuItem value="M2">Master 2</MenuItem>
            <MenuItem value="BTS1">BTS 1ère Année</MenuItem>
            <MenuItem value="BTS2">BTS 2ème Année</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* CHAMP 3 : MATIÈRE (Saisie Libre) */}
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Matière enseignée"
          placeholder="Ex: Algorithmique, Droit des affaires..."
          variant="outlined"
          value={data.matiere}
          onChange={(e) => update('matiere', e.target.value)}
        />
      </Grid>

      {/* CHAMP 4 : TYPE DE DOCUMENT */}
      <Grid size={{ xs: 12 }}>
        <FormControl fullWidth>
          <InputLabel>Type de document</InputLabel>
          <Select
            value={data.typeCours}
            label="Type de document"
            onChange={(e) => update('typeCours', e.target.value)}
          >
            <MenuItem value="COURS">Cours Magistral (PDF)</MenuItem>
            <MenuItem value="TP">Travaux Pratiques (TP)</MenuItem>
            <MenuItem value="TD">Travaux Dirigés (TD)</MenuItem>
            <MenuItem value="EXAMEN">Sujet d'Examen</MenuItem>
          </Select>
          <FormHelperText>Cela permet de ranger le fichier dans la bonne catégorie pour les élèves.</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Step1Infos;