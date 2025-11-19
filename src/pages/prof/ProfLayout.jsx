// src/pages/prof/ProfLayout.jsx
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import ProfSidebar from '../../components/prof/ProfSidebar';

const ProfLayout = () => {
  // Sécurité basique (à renforcer avec le token JWT plus tard)
  const isAuth = localStorage.getItem('profInfo');

  if (!isAuth) {
    return <Navigate to="/prof/login" replace />;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <ProfSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 4, ml: '280px' }}>
        {/* C'est ici que les pages Dashboard, Publier, etc. s'afficheront */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProfLayout;