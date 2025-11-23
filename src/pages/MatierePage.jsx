// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/MatierePage.jsx
import React, { useState, useEffect, forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import './MatierePage.css';
import NavigateBackButton from '../components/common/NavigateBackButton';
import { 
  PictureAsPdf, Description, Slideshow, Download, Search, Person, Visibility, 
  Close, ZoomIn 
} from '@mui/icons-material';
import { 
  Dialog, AppBar, Toolbar, IconButton, Typography, Slide, Box, Button // <--- AJOUT DE BUTTON ICI
} from '@mui/material';
import api from '../services/api';

// Transition pour le modal plein écran
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MatierePage = () => {
  const { annee, matiereSlug } = useParams();
  const [allCourses, setAllCourses] = useState([]); 
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // --- ÉTATS POUR LE VISUALISEUR ---
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null); 

  const filiereName = localStorage.getItem('selectedFiliereName');
  const filiereType = localStorage.getItem('selectedFiliereType');
  const niveauTechnique = filiereType ? `${filiereType}${annee}` : `L${annee}`;
  const displayTitle = matiereSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/courses`, {
            params: { filiere: filiereName, level: niveauTechnique }
        });
        
        const cleanUrlSlug = matiereSlug.toLowerCase().replace(/[^a-z0-9]/g, '');
        const matchingCourses = data.filter(c => {
            const cleanDbSubject = c.subject.toLowerCase().replace(/[^a-z0-9]/g, '');
            return cleanDbSubject.includes(cleanUrlSlug) || cleanUrlSlug.includes(cleanDbSubject);
        });

        setAllCourses(matchingCourses);
        setFilteredCourses(matchingCourses);
      } catch (error) {
        console.error("Erreur", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [annee, matiereSlug, filiereName, niveauTechnique]);

  useEffect(() => {
    if (searchTerm === '') {
        setFilteredCourses(allCourses);
    } else {
        setFilteredCourses(allCourses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [searchTerm, allCourses]);

  // TRACKING VUE
  const trackView = async (courseId) => {
    try {
        await api.put(`/api/courses/${courseId}/view`);
        setFilteredCourses(prev => prev.map(c => 
            c._id === courseId ? { ...c, views: (c.views || 0) + 1 } : c
        ));
    } catch (e) { console.error(e); }
  };

  // 1. TÉLÉCHARGEMENT DIRECT
  const handleDownload = async (e, course) => {
    e.stopPropagation(); 
    try {
      window.open(course.fileUrl, '_blank');
      await api.put(`/api/courses/${course._id}/view`); 
      setFilteredCourses(prev => prev.map(c => c._id === course._id ? { ...c, downloads: (c.downloads || 0) + 1 } : c));
    } catch (e) { console.error(e); }
  };

  // 2. OUVERTURE DU VISUALISEUR
  const handlePreview = (course) => {
    setCurrentDoc(course);
    setViewerOpen(true);
    trackView(course._id); 
  };

  const getFileIcon = (type) => {
    if (type && type.includes('pdf')) return <PictureAsPdf style={{ color: '#f40f02', fontSize: 40 }} />;
    if (type && (type.includes('word') || type.includes('doc'))) return <Description style={{ color: '#2b579a', fontSize: 40 }} />;
    if (type && (type.includes('powerpoint') || type.includes('ppt'))) return <Slideshow style={{ color: '#d24726', fontSize: 40 }} />;
    return <Description style={{ color: '#555', fontSize: 40 }} />;
  };

  // LOGIQUE DU LECTEUR
  const renderViewerContent = () => {
    if (!currentDoc) return null;

    const isPdf = currentDoc.fileType.includes('pdf');
    // Détection Office améliorée
    const isOffice = currentDoc.fileType.includes('word') || 
                     currentDoc.fileType.includes('doc') || 
                     currentDoc.fileType.includes('presentation') || 
                     currentDoc.fileType.includes('ppt') ||
                     currentDoc.fileType.includes('sheet') ||
                     currentDoc.fileType.includes('xls');

    if (isPdf) {
        return (
            <iframe 
                src={currentDoc.fileUrl} 
                title="Lecteur PDF"
                width="100%" 
                height="100%" 
                style={{ border: 'none', backgroundColor: '#333' }} 
            />
        );
    } else if (isOffice) {
        const encodedUrl = encodeURIComponent(currentDoc.fileUrl);
        return (
            <iframe 
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`} 
                width="100%" 
                height="100%" 
                frameBorder="0"
                title="Lecteur Office"
                style={{ border: 'none' }}
            >
                Ce navigateur ne supporte pas la visualisation de ce fichier.
            </iframe>
        );
    } else {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" color="white">
                <Typography variant="h5" gutterBottom>Aperçu non disponible</Typography>
                <Button 
                    variant="contained" 
                    startIcon={<Download />} 
                    onClick={(e) => handleDownload(e, currentDoc)}
                >
                    Télécharger le fichier pour le voir
                </Button>
            </Box>
        );
    }
  };

  return (
    <div className="matiere-page">
      <div className="container">
        <div className="matiere-header-top">
            <NavigateBackButton />
            <span className="niveau-badge">{filiereName} - {niveauTechnique}</span>
        </div>
        
        <h1 className="matiere-main-title">{displayTitle}</h1>

        <div className="search-bar-container">
            <div className="search-input-wrapper">
                <Search className="search-icon" />
                <input 
                    type="text" 
                    placeholder={`Trouver un cours dans ${displayTitle}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input-field"
                />
            </div>
        </div>

        {loading ? (
            <div className="loading">Chargement...</div>
        ) : (
            <div className="courses-feed">
            {filteredCourses.length === 0 ? (
                <div className="empty-state">
                    <h3>Aucun cours trouvé</h3>
                    <p>Essayez une autre recherche ou revenez plus tard.</p>
                </div>
            ) : (
                filteredCourses.map((course) => (
                <div key={course._id} className="course-post-card">
                    <div className="post-header">
                        <div className="prof-avatar"><Person /></div>
                        <div className="post-meta">
                            <span className="prof-name">Prof. {course.author?.name || 'Enseignant'}</span>
                            <span className="post-date">{new Date(course.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute:'2-digit' })}</span>
                        </div>
                    </div>
                    <div className="post-content">
                        <h3 className="course-title">{course.title}</h3>
                        {course.description && <p className="course-desc">{course.description}</p>}
                    </div>
                    
                    <div className="post-attachment" onClick={() => handlePreview(course)}>
                        <div className="file-icon">{getFileIcon(course.fileType)}</div>
                        <div className="file-info">
                            <span className="file-name">
                                {course.fileType.includes('pdf') ? 'Document PDF' : 'Document Office'}
                            </span>
                            <span className="file-type">
                                Cliquer pour lire • {course.fileSize || 'Fichier'}
                            </span>
                        </div>
                        <div className="view-action">
                            <ZoomIn sx={{ color: '#00aaff' }} />
                        </div>
                    </div>

                    <div className="post-footer">
                        <div className="stat-item"><Visibility fontSize="small" /> {course.views || 0} Vues</div>
                        <div className="stat-item action" onClick={(e) => handleDownload(e, course)} style={{cursor: 'pointer'}}>
                            <Download fontSize="small" /> Télécharger
                        </div>
                    </div>
                </div>
                ))
            )}
            </div>
        )}

        {/* --- VISUALISEUR PLEIN ÉCRAN --- */}
        <Dialog
            fullScreen
            open={viewerOpen}
            onClose={() => setViewerOpen(false)}
            TransitionComponent={Transition}
            PaperProps={{ sx: { bgcolor: '#1a1a1a' } }}
        >
            <AppBar sx={{ position: 'relative', bgcolor: '#000' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={() => setViewerOpen(false)} aria-label="close">
                    <Close />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" noWrap>
                    {currentDoc?.title}
                </Typography>
                <Button autoFocus color="inherit" onClick={(e) => handleDownload(e, currentDoc)} startIcon={<Download />}>
                    Enregistrer
                </Button>
            </Toolbar>
            </AppBar>
            
            <Box sx={{ flex: 1, height: '100%', bgcolor: '#2c2c2c', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {renderViewerContent()}
            </Box>
        </Dialog>

      </div>
    </div>
  );
};

export default MatierePage;