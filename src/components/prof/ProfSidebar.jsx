// src/components/prof/ProfSidebar.jsx
import React from 'react';
import { 
  Box, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Divider,
  Avatar
} from '@mui/material';
import { 
  Dashboard, 
  Class, 
  AddCircle, 
  Logout,
  Settings
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupération infos prof (mock pour l'instant)
  const profInfo = JSON.parse(localStorage.getItem('profInfo')) || { name: 'Professeur' };

  const menuItems = [
    { text: 'Tableau de bord', icon: <Dashboard />, path: '/prof/dashboard' },
    { text: 'Mes Cours', icon: <Class />, path: '/prof/cours' },
    { text: 'Publier un cours', icon: <AddCircle />, path: '/prof/publier' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('profInfo');
    navigate('/');
  };

  return (
    <Box sx={{ 
      width: 280, 
      height: '100vh', 
      bgcolor: '#1a1c23', 
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1200
    }}>
      {/* En-tête Profil */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#3f51b5' }}>{profInfo.name[0]}</Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">{profInfo.name}</Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Enseignant</Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* Menu */}
      <List sx={{ flexGrow: 1, py: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton 
            key={item.text} 
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              my: 0.5,
              mx: 1.5,
              borderRadius: '12px',
              '&.Mui-selected': {
                bgcolor: 'rgba(63, 81, 181, 0.2)',
                borderLeft: '4px solid #3f51b5',
                '&:hover': { bgcolor: 'rgba(63, 81, 181, 0.3)' }
              },
              '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? '#3f51b5' : 'rgba(255,255,255,0.7)' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      {/* Bas de page */}
      <Box sx={{ p: 2 }}>
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: '12px', color: '#ef5350', '&:hover': { bgcolor: 'rgba(239, 83, 80, 0.1)' } }}>
          <ListItemIcon sx={{ color: '#ef5350' }}><Logout /></ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default ProfSidebar;