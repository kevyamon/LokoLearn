// src/pages/prof/ProfDashboard.jsx
import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { Add, TrendingUp, CloudDownload, Visibility } from '@mui/icons-material';

// Composant "Stat Card" réutilisable
const StatCard = ({ title, value, icon, color }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', height: '100%' }}>
    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}20`, color: color, mr: 2 }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary" fontWeight="500">{title}</Typography>
      <Typography variant="h4" fontWeight="bold">{value}</Typography>
    </Box>
  </Paper>
);

const ProfDashboard = () => {
  // Données simulées
  const profName = "Mr. KOFFI";
  
  return (
    <Box>
      {/* En-tête */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>Bonjour, {profName} 👋</Typography>
          <Typography variant="body1" color="text.secondary">Voici ce qui se passe avec vos cours aujourd'hui.</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} sx={{ borderRadius: 50, px: 3, py: 1 }}>
          Nouveau Cours
        </Button>
      </Box>

      {/* Statistiques */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <StatCard title="Vues Totales" value="1,204" icon={<Visibility />} color="#2196f3" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Téléchargements" value="856" icon={<CloudDownload />} color="#4caf50" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Cours Publiés" value="12" icon={<TrendingUp />} color="#ff9800" />
        </Grid>
      </Grid>

      {/* Section Vide (pour l'instant) */}
      <Typography variant="h6" fontWeight="bold" mb={2}>Vos Derniers Cours</Typography>
      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3, bgcolor: '#fff', border: '1px dashed #e0e0e0' }}>
        <Typography color="text.secondary">Aucun cours récent à afficher.</Typography>
      </Paper>
    </Box>
  );
};

export default ProfDashboard;