// src/components/admin/AdminAuthModal.jsx
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, TextField, Button, Typography, 
  Box, Tabs, Tab, IconButton, InputAdornment, Alert 
} from '@mui/material';
import { Visibility, VisibilityOff, VpnKey, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AdminAuthModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0); // 0: Login, 1: Register
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    adminKey: '' // La fameuse clé
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = tabIndex === 0 ? '/api/users/admin/login' : '/api/users/admin/register';

    try {
      const { data } = await api.post(endpoint, formData);
      
      // Succès
      localStorage.setItem('adminInfo', JSON.stringify(data));
      onClose();
      navigate('/admin'); // Vers le dashboard Admin
    } catch (err) {
      setError(err.response?.data?.message || "Erreur d'authentification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mt: 1 }}>
        <Typography variant="h6" fontWeight="bold" color="error">
          Zone Restreinte ☢️
        </Typography>
        <IconButton onClick={onClose} size="small"><Close /></IconButton>
      </Box>

      <Tabs value={tabIndex} onChange={(e, v) => { setTabIndex(v); setError(null); }} centered sx={{ mb: 2, mt: 1 }}>
        <Tab label="Connexion" />
        <Tab label="Initialisation" />
      </Tabs>

      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Email Admin" name="email" type="email"
            margin="dense" required variant="outlined"
            value={formData.email} onChange={handleChange}
          />

          {tabIndex === 1 && (
            <TextField
              fullWidth label="Numéro de téléphone" name="phoneNumber"
              margin="dense" required variant="outlined"
              value={formData.phoneNumber} onChange={handleChange}
            />
          )}

          <TextField
            fullWidth label="Mot de passe" name="password"
            type={showPassword ? 'text' : 'password'}
            margin="dense" required variant="outlined"
            helperText={tabIndex === 1 ? "Min 8 chars, 1 chiffre, 1 spécial" : ""}
            value={formData.password} onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {tabIndex === 1 && (
            <TextField
              fullWidth label="CLÉ ADMIN (Sécurité)" name="adminKey"
              type="password" margin="dense" required variant="filled"
              color="error" focused
              value={formData.adminKey} onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start"><VpnKey color="error" /></InputAdornment> }}
            />
          )}

          <Button 
            type="submit" fullWidth variant="contained" 
            color={tabIndex === 0 ? "primary" : "error"} 
            size="large" sx={{ mt: 3, borderRadius: 50, fontWeight: 'bold' }}
            disabled={loading}
          >
            {loading ? "Vérification..." : (tabIndex === 0 ? "Accéder au système" : "Créer l'accès")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAuthModal;