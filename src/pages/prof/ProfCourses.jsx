// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/prof/ProfCourses.jsx
import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, IconButton, Chip, Button, CircularProgress, Menu, MenuItem, useMediaQuery, useTheme, Card, CardContent
} from '@mui/material';
import { Edit, Delete, Add, Visibility, CloudDownload, MoreVert, Folder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useConfirm } from '../../contexts/ConfirmContext';

const ProfCourses = () => {
  const navigate = useNavigate();
  const { confirm, alertInfo } = useConfirm();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Menu Mobile
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  useEffect(() => { fetchCourses(); }, []);

  const handleMenuOpen = (event, course) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourse(course);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCourse(null);
  };

  const handleDelete = async (id, title) => {
    handleMenuClose();
    const isConfirmed = await confirm(
      "Suppression du cours",
      `Êtes-vous sûr de vouloir supprimer définitivement le cours "${title}" ?`,
      "error"
    );

    if (isConfirmed) {
      try {
        await api.delete(`/api/courses/${id}`);
        setCourses(prev => prev.filter(c => c._id !== id));
        alertInfo("Supprimé", "Cours supprimé avec succès.", "success");
      } catch (error) {
        alertInfo("Erreur", "Impossible de supprimer ce cours.", "error");
      }
    }
  };

  const handleEdit = (course) => {
    handleMenuClose();
    alertInfo("Bientôt disponible", `L'édition du cours "${course.title}" arrive bientôt !`, "info");
  };

  // --- VUE PC (TABLEAU) ---
  const renderTable = () => (
    <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f8f9fa' }}>
          <TableRow>
            <TableCell><strong>Titre</strong></TableCell>
            <TableCell><strong>Filière</strong></TableCell> {/* AJOUT */}
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
                <Typography fontWeight="bold" variant="body2">{course.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                    {new Date(course.createdAt).toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="500" color="primary.main">
                    {course.filiere}
                </Typography>
              </TableCell>
              <TableCell>{course.subject}</TableCell>
              <TableCell>
                <Chip label={course.level} size="small" variant="outlined" />
              </TableCell>
              <TableCell align="center">
                <Box display="flex" justifyContent="center" gap={2} color="text.secondary" fontSize="0.85rem">
                    <span title="Vues"><Visibility fontSize="inherit" style={{verticalAlign:'middle'}}/> {course.views || 0}</span>
                    <span title="Téléchargements"><CloudDownload fontSize="inherit" style={{verticalAlign:'middle'}}/> {course.downloads || 0}</span>
                </Box>
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => handleEdit(course)} size="small"><Edit /></IconButton>
                <IconButton color="error" onClick={() => handleDelete(course._id, course.title)} size="small"><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // --- VUE MOBILE (CARTES) ---
  const renderCards = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {courses.map((course) => (
        <Card key={course._id} sx={{ borderRadius: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ pb: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box sx={{ flex: 1, mr: 1 }}>
                    {/* Titre */}
                    <Typography fontWeight="bold" variant="h6" lineHeight={1.2} mb={0.5}>
                        {course.title}
                    </Typography>
                    
                    {/* Filière (AJOUT) */}
                    <Typography variant="body2" color="primary" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                        <Folder fontSize="inherit" /> {course.filiere}
                    </Typography>

                    {/* Niveau et Matière */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                        <Chip label={course.level} size="small" />
                        <Typography variant="body2" color="text.secondary">
                            {course.subject}
                        </Typography>
                    </Box>
                </Box>

                {/* Bouton Actions */}
                <IconButton onClick={(e) => handleMenuOpen(e, course)} sx={{ mt: -1, mr: -1 }}>
                    <MoreVert />
                </IconButton>
            </Box>

            {/* Stats en bas de carte */}
            <Box mt={2} pt={1} borderTop="1px solid #f0f0f0" display="flex" gap={3} color="text.secondary" fontSize="0.85rem">
                <span><Visibility fontSize="small" style={{verticalAlign:'middle', marginRight: 4}}/> {course.views || 0}</span>
                <span><CloudDownload fontSize="small" style={{verticalAlign:'middle', marginRight: 4}}/> {course.downloads || 0}</span>
                <span style={{ marginLeft: 'auto' }}>{new Date(course.createdAt).toLocaleDateString()}</span>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  return (
    <Box sx={{ pb: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
            Mes Cours
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => navigate('/prof/publier')}
          sx={{ borderRadius: 50, px: 3 }}
        >
          {isMobile ? 'Nouveau' : 'Nouveau Cours'}
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>
      ) : courses.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: 'center', color: 'text.secondary', borderRadius: 3 }}>
          Vous n'avez publié aucun cours pour le moment.
        </Paper>
      ) : (
        isMobile ? renderCards() : renderTable()
      )}

      {/* Menu d'actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleEdit(selectedCourse)}>
            <Edit fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} /> Modifier
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedCourse?._id, selectedCourse?.title)} sx={{ color: 'error.main' }}>
            <Delete fontSize="small" sx={{ mr: 1.5 }} /> Supprimer
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfCourses;