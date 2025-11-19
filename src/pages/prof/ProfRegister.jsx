// src/pages/prof/ProfRegister.jsx
import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, InputAdornment } from '@mui/material';
import { Person, Email, Lock, VpnKey } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

const ProfRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', code: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validation avec le Backend
    if (formData.code !== 'LOKO-PROF-2024') { // Code temporaire pour test
      setError("Code établissement invalide. Contactez l'administration.");
      return;
    }
    // Simulation succès
    navigate('/prof/login');
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0f2f5' }}>
      <Paper elevation={4} sx={{ p: 5, width: '100%', maxWidth: 450, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">Inscription Professeur</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>Rejoignez l'équipe pédagogique numérique</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Nom Complet" margin="normal" required
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
            InputProps={{ startAdornment: <InputAdornment position="start"><Person color="action" /></InputAdornment> }}
          />
          <TextField
            fullWidth label="Email" margin="normal" required type="email"
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
            InputProps={{ startAdornment: <InputAdornment position="start"><Email color="action" /></InputAdornment> }}
          />
          <TextField
            fullWidth label="Code Secret Établissement" margin="normal" required
            helperText="Fourni par l'administration (Test: LOKO-PROF-2024)"
            value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})}
            InputProps={{ startAdornment: <InputAdornment position="start"><VpnKey color="warning" /></InputAdornment> }}
          />
          <TextField
            fullWidth label="Mot de passe" type="password" margin="normal" required
            value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
            InputProps={{ startAdornment: <InputAdornment position="start"><Lock color="action" /></InputAdornment> }}
          />
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}>
            Valider mon compte
          </Button>
        </form>
        <Link to="/prof/login" style={{ textDecoration: 'none', color: '#3f51b5' }}>
          Déjà un compte ? Se connecter
        </Link>
      </Paper>
    </Box>
  );
};

export default ProfRegister;