// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/prof/ProfLayout.jsx
import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Box, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import ProfSidebar from '../../components/prof/ProfSidebar';

const drawerWidth = 280;

const ProfLayout = () => {
  // Sécurité basique
  const isAuth = localStorage.getItem('profInfo');
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuth) {
    return <Navigate to="/prof/login" replace />;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      
      {/* Barre d'outils Mobile (pour ouvrir le menu) */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { md: 'none' }, // Caché sur PC
          bgcolor: '#1a1c23',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Espace Professeur
          </Typography>
        </Toolbar>
      </AppBar>

      {/* La Sidebar Intelligente */}
      <ProfSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Zone de Contenu Principale */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 0 }, // Marge en haut sur mobile pour ne pas être caché par la barre
          overflowX: 'hidden' // Empêche le scroll horizontal
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProfLayout;