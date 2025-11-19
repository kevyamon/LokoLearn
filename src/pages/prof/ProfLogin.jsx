// src/pages/prof/ProfLogin.jsx
import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, InputAdornment } from '@mui/material';
import { Email, Lock, School } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

const ProfLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Remplacer par l'appel API réel (Mission 3)
    if (formData.email === 'prof@loko.ci' && formData.password === 'prof123') {
      localStorage.setItem('profInfo', JSON.stringify({ name: 'Mr. KOFFI', email: formData.email }));
      navigate('/prof/dashboard');
    } else {
      setError('Identifiants incorrects (Test: prof@loko.ci / prof123)');
    }
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      bgcolor: '#f0f2f5',
      backgroundImage: 'radial-gradient(#3f51b520 1px, transparent 1px)', 
      backgroundSize: '20px 20px'
    }}>
      <Paper elevation={4} sx={{ p: 5, width: '100%', maxWidth: 400, borderRadius: 4, textAlign: 'center' }}>
        <Box sx={{ bgcolor: '#e8eaf6', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
          <School color="primary" fontSize="large" />
        </Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>Espace Enseignant</Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>Connectez-vous pour gérer vos cours</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Email professionnel" variant="outlined" margin="normal"
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
            InputProps={{ startAdornment: <InputAdornment position="start"><Email color="action" /></InputAdornment> }}
          />
          <TextField
            fullWidth label="Mot de passe" type="password" variant="outlined" margin="normal"
            value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
            InputProps={{ startAdornment: <InputAdornment position="start"><Lock color="action" /></InputAdornment> }}
          />
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}>
            Se connecter
          </Button>
        </form>
        <Link to="/prof/register" style={{ textDecoration: 'none', color: '#3f51b5', fontSize: '0.9rem' }}>
          Nouveau professeur ? Créer un compte
        </Link>
      </Paper>
    </Box>
  );
};

export default ProfLogin;