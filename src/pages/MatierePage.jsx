// kevyamon/lokolearn/LokoLearn-4b9aa75bc8e6a71557f2291b3bb06173df2a94ad/src/pages/MatierePage.jsx
import React, { useState, useEffect, forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import './MatierePage.css';
import NavigateBackButton from '../components/common/NavigateBackButton';
import { 
  PictureAsPdf, Description, Slideshow, Download, Search, Person, Visibility, 
  Close, ZoomIn 
} from '@mui/icons-material';
import { 
  Dialog, AppBar, Toolbar, IconButton, Typography, Slide, Box, Button, CircularProgress 
} from '@mui/material';
import api from '../services/api';
import { useConfirm } from '../contexts/ConfirmContext'; // <-- Utiliser le context pour les erreurs

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MatierePage = () => {
  const { annee, matiereSlug } = useParams();
  const niveauTechnique = annee; 

  const [allCourses, setAllCourses] = useState([]); 
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null); 
  const { alertInfo } = useConfirm(); // <-- On récupère l'outil alerte

  const filiereName = localStorage.getItem('selectedFiliereName');
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

  const trackView = async (courseId) => {
    try {
        await api.put(`/api/courses/${courseId}/view`);
        
        setFilteredCourses(prev => prev.map(c => 
            c._id === courseId ? { 
                ...c, 
                views: (c.views || 0) + 1,
                downloads: (c.downloads || 0) + 1
            } : c
        ));
    } catch (e) { console.error(e); }
  };
  
  // NOUVELLE FONCTION CORE : Récupérer l'URL signée
  const getSecureFileUrl = async (courseId) => {
    try {
        const { data } = await api.get(`/api/courses/${courseId}/signed-url`);
        return data.signedUrl;
    } catch (e) {
        console.error("Erreur de signature d'URL:", e);
        // Alerte utilisateur que l'accès est refusé
        alertInfo("Accès Refusé", e.response?.data?.message || "Erreur de connexion/autorisation pour accéder au fichier.", "error");
        return null;
    }
  };


  const handleDownload = async (e, course) => {
    e.stopPropagation(); 
    
    // 1. Récupérer l'URL signée
    const signedUrl = await getSecureFileUrl(course._id);

    if (signedUrl) {
        try {
          // 2. Ouvrir le fichier. L'URL signée passe l'authentification Cloudinary.
          window.open(signedUrl, '_blank');
          
          // 3. Appeler le tracking
          await api.put(`/api/courses/${course._id}/view`); 
          
          // Mise à jour de l'état local
          setFilteredCourses(prev => prev.map(c => 
              c._id === course._id ? { 
                  ...c, 
                  views: (c.views || 0) + 1, 
                  downloads: (c.downloads || 0) + 1 
              } : c
          ));
        } catch (e) { console.error("Erreur de téléchargement:", e); }
    }
  };

  const handlePreview = async (course) => {
    // 1. Récupérer l'URL signée
    const signedUrl = await getSecureFileUrl(course._id);
    
    if (signedUrl) {
      // 2. Mettre à jour le document avec l'URL SECURE pour le visualiseur
      setCurrentDoc({ ...course, fileUrl: signedUrl });
      setViewerOpen(true);
      // 3. Appeler la fonction de tracking (vue/download)
      trackView(course._id); 
    }
  };

  const getFileIcon = (type) => {
    if (type && type.includes('pdf')) return <PictureAsPdf style={{ color: '#f40f02', fontSize: 40 }} />;
    if (type && (type.includes('word') || type.includes('doc'))) return <Description style={{ color: '#2b579a', fontSize: 40 }} />;
    if (type && (type.includes('powerpoint') || type.includes('ppt'))) return <Slideshow style={{ color: '#d24726', fontSize: 40 }} />;
    return <Description style={{ color: '#555', fontSize: 40 }} />;
  };

  const renderViewerContent = () => {
    if (!currentDoc) return null;

    // Utilisation de l'URL signée
    const urlToUse = currentDoc.fileUrl; 

    const isPdf = currentDoc.fileType.includes('pdf');
    const isOffice = currentDoc.fileType.includes('word') || 
                     currentDoc.fileType.includes('doc') || 
                     currentDoc.fileType.includes('presentation') || 
                     currentDoc.fileType.includes('ppt') ||
                     currentDoc.fileType.includes('sheet') ||
                     currentDoc.fileType.includes('xls');

    if (isPdf) {
        return (
            <object
                // On utilise l'URL signée ici
                data={urlToUse} 
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            >
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" color="white">
                    <Typography variant="h6" gutterBottom>Impossible d'afficher le PDF directement.</Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<Download />} 
                        // On réutilise la fonction de download (qui va re-signer le lien)
                        onClick={(e) => handleDownload(e, currentDoc)} 
                    >
                        Télécharger pour voir
                    </Button>
                </Box>
            </object>
        );
    } else if (isOffice) {
        const encodedUrl = encodeURIComponent(urlToUse);
        return (
            <iframe 
                // Office Online Viewer fonctionne avec l'URL Cloudinary, même signée
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`} 
                width="100%" 
                height="100%" 
                frameBorder="0"
                title="Lecteur Office"
                style={{ border: 'none' }}
            >
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
                    Télécharger le fichier
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