// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/prof/ProfLogin.jsx
import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { Email, Lock, School, ArrowBack } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useConfirm } from '../../contexts/ConfirmContext'; // IMPORT

const ProfLogin = () => {
  const navigate = useNavigate();
  const { alertInfo } = useConfirm(); // HOOK
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post('/api/users/prof/login', { 
        email: formData.email, 
        password: formData.password 
      });

      localStorage.setItem('profInfo', JSON.stringify(data));
      
      // SUCCÈS (Modale)
      await alertInfo(
        "Connexion réussie", 
        `Bienvenue Professeur ${data.name}.`, 
        "success"
      );

      navigate('/prof/dashboard');

    } catch (err) {
      console.error(err);
      // ERREUR (Modale)
      alertInfo(
        "Accès refusé", 
        err.response?.data?.message || 'Email ou mot de passe incorrect', 
        "error"
      );
    } finally {
      setLoading(false);
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

        {/* On a retiré l'Alert MUI ici */}

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
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }} disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link to="/prof/register" style={{ textDecoration: 'none', color: '#3f51b5', fontSize: '0.9rem' }}>
            Nouveau professeur ? Créer un compte
            </Link>
            <Button 
                startIcon={<ArrowBack />} 
                onClick={() => navigate('/')}
                size="small"
                sx={{ color: 'text.secondary', textTransform: 'none', alignSelf: 'center', mt: 1 }}
            >
                Retour à l'accueil
            </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfLogin;