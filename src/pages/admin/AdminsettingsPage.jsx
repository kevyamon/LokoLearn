// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/admin/AdminSettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, IconButton, Alert, InputAdornment, Divider } from '@mui/material';
import { ArrowBack, Save, VpnKey, Refresh, Block } from '@mui/icons-material';
import api from '../../services/api';

const AdminSettingsPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Charger le code actuel
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const { data } = await api.get('/api/settings/prof-code');
        setCode(data.code);
      } catch (err) {
        console.error(err);
        setMessage({ type: 'error', text: "Impossible de charger le code actuel." });
      } finally {
        setLoading(false);
      }
    };
    fetchCode();
  }, []);

  // Générer un code aléatoire
  const generateRandomCode = () => {
    const year = new Date().getFullYear();
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCode(`LOKO-${randomPart}-${year}`);
  };

  // Sauvegarder le nouveau code
  const handleSave = async () => {
    try {
      await api.put('/api/settings/prof-code', { newCode: code });
      setMessage({ type: 'success', text: "Code mis à jour avec succès !" });
    } catch (err) {
      setMessage({ type: 'error', text: "Erreur lors de la mise à jour." });
    }
  };

  // VERROUILLER L'ACCÈS DEV
  const handleLockDev = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir verrouiller l'accès développeur ? Cette action est irréversible depuis cette interface.")) {
        try {
            await api.post('/api/settings/lock-dev');
            alert("Accès développeur verrouillé. Vous êtes le seul maître à bord.");
            // On pourrait déconnecter ici pour tester, mais on laisse l'admin connecté
        } catch (e) {
            alert("Erreur lors du verrouillage.");
        }
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/admin')} 
        sx={{ mb: 3, color: 'white', borderColor: 'white' }} 
        variant="outlined"
      >
        Retour Dashboard
      </Button>

      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, bgcolor: '#1e1e1e', color: 'white' }}>
        
        {/* SECTION 1 : CODE PROF */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#FFD700' }}>
          <VpnKey sx={{ mr: 1, verticalAlign: 'middle' }} />
          Sécurité Professeurs
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 4, color: '#aaa' }}>
          Ce code est requis pour qu'un nouveau professeur puisse s'inscrire. 
          Changez-le régulièrement pour la sécurité de l'établissement.
        </Typography>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 3 }}>{message.text}</Alert>
        )}

        <TextField
          fullWidth
          label="Code d'inscription Actuel"
          value={loading ? 'Chargement...' : code}
          onChange={(e) => setCode(e.target.value)}
          variant="filled"
          sx={{ 
            bgcolor: 'rgba(255,255,255,0.1)', 
            borderRadius: 1,
            input: { color: 'white', fontSize: '1.2rem', letterSpacing: 2, fontWeight: 'bold', textAlign: 'center' },
            label: { color: '#aaa' }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={generateRandomCode} sx={{ color: '#FFD700' }} title="Générer aléatoire">
                  <Refresh />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button 
          fullWidth 
          variant="contained" 
          size="large"
          onClick={handleSave}
          startIcon={<Save />}
          sx={{ 
            mt: 4, 
            bgcolor: '#FFD700', 
            color: 'black', 
            fontWeight: 'bold',
            '&:hover': { bgcolor: '#e6c200' }
          }}
        >
          Sauvegarder le nouveau code
        </Button>

        {/* SECTION 2 : ZONE DE LIVRAISON (KILL SWITCH) */}
        <Divider sx={{ my: 5, bgcolor: 'rgba(255,255,255,0.2)' }} />

        <Typography variant="h6" color="error" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Block /> Zone de Livraison
        </Typography>
        <Typography variant="body2" color="gray" mb={2}>
            Une fois la maintenance terminée, vous pouvez révoquer l'accès du prestataire technique (Kevy Amon) pour garantir que vous êtes le seul administrateur.
        </Typography>

        <Button 
            fullWidth 
            variant="outlined" 
            color="error"
            onClick={handleLockDev}
            sx={{ borderColor: '#ef5350', color: '#ef5350', '&:hover': { bgcolor: 'rgba(239, 83, 80, 0.1)' } }}
        >
            Verrouiller l'accès Développeur
        </Button>

      </Paper>
    </Box>
  );
};

export default AdminSettingsPage;