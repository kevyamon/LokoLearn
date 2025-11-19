// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/components/prof/ProfSidebar.jsx
import React from 'react';
import { 
  Box, List, ListItemButton, ListItemIcon, ListItemText, 
  Typography, Divider, Avatar, Drawer, useTheme, useMediaQuery 
} from '@mui/material';
import { 
  Dashboard, Class, AddCircle, Logout 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const ProfSidebarContent = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const profInfo = JSON.parse(localStorage.getItem('profInfo')) || { name: 'Professeur' };

  const menuItems = [
    { text: 'Tableau de bord', icon: <Dashboard />, path: '/prof/dashboard' },
    { text: 'Mes Cours', icon: <Class />, path: '/prof/cours' },
    { text: 'Publier un cours', icon: <AddCircle />, path: '/prof/publier' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('profInfo');
    navigate('/prof/login');
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1a1c23', color: '#fff' }}>
      {/* En-tête Profil */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#3f51b5' }}>{profInfo.name ? profInfo.name[0] : 'P'}</Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ maxWidth: 160 }}>
            {profInfo.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Enseignant</Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* Menu */}
      <List sx={{ flexGrow: 1, py: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton 
            key={item.text} 
            onClick={() => {
              navigate(item.path);
              if (onClose) onClose(); // Ferme le menu sur mobile après clic
            }}
            selected={location.pathname === item.path}
            sx={{
              my: 0.5, mx: 1.5, borderRadius: '12px',
              '&.Mui-selected': {
                bgcolor: 'rgba(63, 81, 181, 0.2)', borderLeft: '4px solid #3f51b5',
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

const ProfSidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      {/* Version Mobile (Temporaire) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#1a1c23' },
        }}
      >
        <ProfSidebarContent onClose={handleDrawerToggle} />
      </Drawer>

      {/* Version Desktop (Permanente) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#1a1c23', borderRight: 'none' },
        }}
        open
      >
        <ProfSidebarContent />
      </Drawer>
    </Box>
  );
};

export default ProfSidebar;