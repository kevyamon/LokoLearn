// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/components/Sidebar.jsx
import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, Typography } from '@mui/material';
import { Home, School, Person, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService'; // Import du service

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Accueil', icon: <Home />, path: '/' },
    { text: 'Espace Étudiant', icon: <School />, path: '/login' },
    { text: 'Espace Professeur', icon: <Person />, path: '/prof/login' },
  ];

  const handleNavigation = (path) => {
    // Si on clique sur "Accueil" ('/')
    if (path === '/') {
        const session = authService.checkSession();
        if (session && session.valid) {
            // Redirection intelligente vers le dashboard
            if (session.role === 'student') navigate('/etudiant/dashboard');
            else if (session.role === 'professor') navigate('/prof/dashboard');
            else if (session.role === 'admin') navigate('/admin');
        } else {
            // Sinon accueil normal
            navigate('/');
        }
    } else {
        // Pour les autres liens (Connexion, etc.), navigation normale
        navigate(path);
    }
    onClose(); // On ferme le menu après le clic
  };

  return (
    <>
      {/* Overlay sombre */}
      {isOpen && (
        <Box 
          onClick={onClose}
          sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(0,0,0,0.5)', zIndex: 1299 }}
        />
      )}

      {/* Le Panneau Latéral */}
      <Box sx={{
        position: 'fixed', top: 0, left: 0, width: 280, height: '100%',
        bgcolor: 'white', zIndex: 1300, boxShadow: 5,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        display: 'flex', flexDirection: 'column'
      }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f5f5f5' }}>
          <Typography variant="h6" fontWeight="bold" color="primary">LOKOLEARN</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>
        
        <Divider />

        <List sx={{ p: 2 }}>
          {menuItems.map((item) => (
            <ListItemButton 
              key={item.text} 
              onClick={() => handleNavigation(item.path)}
              sx={{ borderRadius: 2, mb: 1 }}
            >
              <ListItemIcon sx={{ color: '#3f51b5' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Sidebar;