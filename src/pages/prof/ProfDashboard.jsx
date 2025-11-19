// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/prof/ProfDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Button, CircularProgress } from '@mui/material';
import { Add, TrendingUp, CloudDownload, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

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
  const navigate = useNavigate();
  // Valeurs par défaut en cas d'échec API
  const [stats, setStats] = useState({ totalCourses: 0, totalViews: 0, totalDownloads: 0, recentCourses: [] });
  const [loading, setLoading] = useState(true);
  
  const profInfo = JSON.parse(localStorage.getItem('profInfo')) || { name: 'Professeur' };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/api/courses/my-stats');
        setStats(data);
      } catch (error) {
        console.warn("Erreur chargement stats (Mode hors ligne ou token invalide) :", error.message);
        // On ne fait rien, on garde les stats à 0 pour ne pas casser l'UI
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>Bonjour, {profInfo.name} 👋</Typography>
          <Typography variant="body1" color="text.secondary">Aperçu de vos performances.</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => navigate('/prof/publier')}
          sx={{ borderRadius: 50, px: 3, py: 1 }}
        >
          Nouveau Cours
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}><CircularProgress /></Box>
      ) : (
        <>
          {/* CORRECTION SYNTAXE GRID (MUI v6+) */}
          <Grid container spacing={3} mb={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard title="Vues Totales" value={stats.totalViews} icon={<Visibility />} color="#2196f3" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard title="Téléchargements" value={stats.totalDownloads} icon={<CloudDownload />} color="#4caf50" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard title="Cours Publiés" value={stats.totalCourses} icon={<TrendingUp />} color="#ff9800" />
            </Grid>
          </Grid>

          <Typography variant="h6" fontWeight="bold" mb={2}>Vos Derniers Cours</Typography>
          {stats.recentCourses.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3, bgcolor: '#fff', border: '1px dashed #e0e0e0' }}>
                <Typography color="text.secondary">Aucune donnée ou connexion serveur échouée.</Typography>
                <Button onClick={() => navigate('/prof/publier')} sx={{mt: 2}}>Créer un premier cours</Button>
            </Paper>
          ) : (
             <Grid container spacing={2}>
                {stats.recentCourses.map(course => (
                    <Grid size={{ xs: 12 }} key={course._id}>
                        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography fontWeight="bold">{course.title}</Typography>
                            <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary', fontSize: '0.9rem' }}>
                                <span>{course.views} vues</span>
                                <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
             </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default ProfDashboard;