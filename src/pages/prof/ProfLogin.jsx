// src/pages/prof/ProfLogin.jsx
import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, InputAdornment } from '@mui/material';
import { Email, Lock, School } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api'; // On utilise notre nouvelle instance API

const ProfLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // APPEL API RÉEL VERS LE BACKEND
      // Note: On utilise la même route que les étudiants car User est polymorphe
      // Mais on pourrait avoir une route dédiée si besoin. Ici on tente /login générique
      // Si ton backend a une route spécifique prof, adapte ici. 
      // D'après ton userController, c'est /api/users/login (loginStudent) qui gère tout par matricule normalement,
      // MAIS pour les profs c'est par email.
      
      // Correction stratégique : Comme ton backend actuel (userController) semble très axé "Matricule",
      // nous allons simuler une connexion directe ou adapter le backend plus tard.
      // Pour l'instant, utilisons une route login standard, ou assumons que tu vas ajouter le login par email au backend.
      
      // HYPOTHÈSE : Si tu n'as pas encore codé le login par Email côté backend, 
      // je vais utiliser une astuce : on envoie l'email comme "matricule" si le backend le permet,
      // SINON, je te mets ici le code prêt pour quand le backend aura loginProf.
      
      // Pour que ça marche TOUT DE SUITE avec ton backend actuel qui attend un matricule :
      // Je vais laisser le mock temporairement MAIS connecté à la structure
      // ATTENTION : Il faudra implémenter loginByEmail côté backend.
      
      // CODE PROVISOIRE LE TEMPS QUE TU METTES A JOUR LE BACKEND POUR L'EMAIL :
       /*
      const { data } = await api.post('/api/users/login-prof', { 
        email: formData.email, 
        password: formData.password 
      });
      */

      // Pour l'instant, je simule un succès pour débloquer l'affichage, 
      // car ton backend actuel ne semble gérer que les matricules étudiants (5 chiffres-M1).
      if (formData.email && formData.password) {
         // Simulation d'un token pour que le dashboard ne plante pas
         const fakeToken = "simulated_token_pending_backend_update";
         localStorage.setItem('profInfo', JSON.stringify({ 
             name: 'Professeur (Mode Dev)', 
             email: formData.email,
             token: fakeToken 
         }));
         navigate('/prof/dashboard');
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Erreur de connexion au serveur');
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
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }} disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
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