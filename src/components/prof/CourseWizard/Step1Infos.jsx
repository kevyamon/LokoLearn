// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/components/prof/CourseWizard/Step1Infos.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField, Autocomplete, IconButton, ListItem } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

const Step1Infos = ({ data, update, filieres = [], subjects = [] }) => {
  
  // 1. GESTION DES FAVORIS (Chargés depuis le localStorage)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('prof_favorite_filieres');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (e, filiereName) => {
    e.stopPropagation(); // Empêche de sélectionner la ligne quand on clique sur l'étoile
    let newFavs;
    if (favorites.includes(filiereName)) {
      newFavs = favorites.filter(f => f !== filiereName);
    } else {
      newFavs = [...favorites, filiereName];
    }
    setFavorites(newFavs);
    localStorage.setItem('prof_favorite_filieres', JSON.stringify(newFavs));
  };

  // 2. LOGIQUE DE FILTRAGE ET TRI
  const filteredFilieres = useMemo(() => {
    let result = [...filieres];

    // A) Filtrage par Cycle (BTS vs LMD) selon le niveau choisi
    if (data.niveau) {
      const isBTS = data.niveau.startsWith('BTS');
      const isLMD = ['L1', 'L2', 'L3', 'M1', 'M2'].includes(data.niveau);
      
      if (isBTS) result = result.filter(f => f.type === 'BTS');
      if (isLMD) result = result.filter(f => f.type === 'LMD');
    }

    // B) Tri : Favoris en premier, puis ordre alphabétique
    result.sort((a, b) => {
      const isFavA = favorites.includes(a.name);
      const isFavB = favorites.includes(b.name);
      if (isFavA && !isFavB) return -1;
      if (!isFavA && isFavB) return 1;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [filieres, data.niveau, favorites]);


  return (
    <Grid container spacing={3}>
      
      {/* CHAMP 1 : NIVEAU (On le met en premier car il pilote le filtre des filières) */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth>
          <InputLabel>Niveau</InputLabel>
          <Select
            value={data.niveau}
            label="Niveau"
            onChange={(e) => {
                update('niveau', e.target.value);
                // Si le niveau change de cycle, on reset la filière si elle n'est plus compatible
                // (Optionnel, pour l'instant on laisse flexible)
            }}
          >
            <MenuItem value="BTS1">BTS 1ère Année</MenuItem>
            <MenuItem value="BTS2">BTS 2ème Année</MenuItem>
            <MenuItem value="L1">Licence 1</MenuItem>
            <MenuItem value="L2">Licence 2</MenuItem>
            <MenuItem value="L3">Licence 3</MenuItem>
            <MenuItem value="M1">Master 1</MenuItem>
            <MenuItem value="M2">Master 2</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* CHAMP 2 : FILIÈRE (Autocomplete avec Favoris) */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Autocomplete
          freeSolo // Permet d'écrire une filière qui n'est pas dans la liste
          options={filteredFilieres}
          getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
          value={data.filiere}
          onInputChange={(event, newInputValue) => {
            update('filiere', newInputValue);
          }}
          renderOption={(props, option) => {
             // On extrait la clé pour éviter le warning React
             const { key, ...otherProps } = props;
             const isFav = favorites.includes(option.name);
             
             return (
              <li key={key} {...otherProps} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{option.name}</span>
                <IconButton 
                    size="small" 
                    onClick={(e) => toggleFavorite(e, option.name)}
                    color={isFav ? "warning" : "default"}
                >
                    {isFav ? <Star /> : <StarBorder />}
                </IconButton>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField 
                {...params} 
                label="Filière" 
                placeholder={data.niveau ? "Recherchez ou sélectionnez..." : "Sélectionnez d'abord un niveau"}
                helperText="Utilisez l'étoile pour vos filières favorites ⭐"
            />
          )}
        />
      </Grid>

      {/* CHAMP 3 : MATIÈRE (Autocomplete simple) */}
      <Grid size={{ xs: 12 }}>
        <Autocomplete
            freeSolo
            options={subjects.map(s => s.name)} // Juste une liste de noms
            value={data.matiere}
            onInputChange={(event, newInputValue) => update('matiere', newInputValue)}
            renderInput={(params) => (
                <TextField {...params} label="Matière enseignée" placeholder="Ex: Algorithmique" />
            )}
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
          <FormHelperText>Permet de ranger le fichier dans la bonne catégorie.</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Step1Infos;