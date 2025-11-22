// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/prof/ProfCourses.jsx
import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, IconButton, Chip, Button, CircularProgress 
} from '@mui/material';
import { Edit, Delete, Add, Visibility, CloudDownload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useConfirm } from '../../contexts/ConfirmContext'; // IMPORT DU HOOK

const ProfCourses = () => {
  const navigate = useNavigate();
  const { confirm, alertInfo } = useConfirm(); // UTILISATION DU HOOK
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les cours
  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/api/courses/my-stats');
      setCourses(data.allCourses || []); 
    } catch (error) {
      console.error("Erreur chargement cours", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Gérer la suppression (AVEC MODALE STYLISÉE)
  const handleDelete = async (id, title) => {
    // On attend la réponse de l'utilisateur via notre belle modale
    const isConfirmed = await confirm(
      "Suppression du cours",
      `Êtes-vous sûr de vouloir supprimer définitivement le cours "${title}" ? Cette action est irréversible.`,
      "error" // Couleur rouge
    );

    if (isConfirmed) {
      try {
        await api.delete(`/api/courses/${id}`);
        setCourses(prev => prev.filter(c => c._id !== id));
        // Petit feedback succès
        alertInfo("Supprimé", "Le cours a été supprimé avec succès.", "success");
      } catch (error) {
        alertInfo("Erreur", "Impossible de supprimer ce cours.", "error");
      }
    }
  };

  // Gérer la modification (AVEC MODALE STYLISÉE)
  const handleEdit = (course) => {
    alertInfo(
      "Fonctionnalité à venir",
      `L'édition du cours "${course.title}" sera disponible dans la prochaine mise à jour !`,
      "info" // Couleur bleue
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Mes Cours</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => navigate('/prof/publier')}
          sx={{ borderRadius: 50, px: 3 }}
        >
          Nouveau
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>
      ) : courses.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: 'center', color: 'text.secondary' }}>
          Vous n'avez publié aucun cours pour le moment.
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Titre</strong></TableCell>
                <TableCell><strong>Matière</strong></TableCell>
                <TableCell><strong>Niveau</strong></TableCell>
                <TableCell align="center"><strong>Stats</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id} hover>
                  <TableCell>
                    <Typography fontWeight="bold">{course.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {new Date(course.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>{course.subject}</TableCell>
                  <TableCell>
                    <Chip label={course.level} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={2} color="text.secondary" fontSize="0.85rem">
                        <span title="Vues"><Visibility fontSize="inherit" style={{verticalAlign:'middle'}}/> {course.views || 0}</span>
                        <span title="Téléchargements"><CloudDownload fontSize="inherit" style={{verticalAlign:'middle'}}/> {course.downloads || 0}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEdit(course)} size="small">
                      <Edit />
                    </IconButton>
                    {/* On passe aussi le titre pour le message personnalisé */}
                    <IconButton color="error" onClick={() => handleDelete(course._id, course.title)} size="small">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ProfCourses;