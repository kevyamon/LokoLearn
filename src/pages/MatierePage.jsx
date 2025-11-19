// src/pages/MatierePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MatierePage.css';
import NavigateBackButton from '../components/common/NavigateBackButton';
import { Book, Videocam, Assignment, Description, Download, Visibility } from '@mui/icons-material';
import api from '../services/api';

const MatierePage = () => {
  const { annee, matiereSlug } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  // Astuce : On nettoie le slug pour l'affichage (ex: "algorithmique-avancee" -> "Algorithmique Avancee")
  const matiereName = matiereSlug.replace(/-/g, ' ').toUpperCase();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // APPEL OPTIMISÉ : On filtre directement via l'URL
        // Note: Dans une V2, on filtrera aussi par 'subject' (ID) au lieu de trier en JS
        const { data } = await api.get(`/api/courses?level=${annee}`);
        
        // Filtrage final (car nous n'avons pas encore l'ID de la matière ici, juste le slug)
        // On suppose que le titre du cours ou la matière contient le mot clé du slug
        // C'est temporaire, idéalement 'matiereSlug' devrait être un ID
        setCourses(data); 
      } catch (error) {
        console.error("Erreur", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [annee, matiereSlug]);

  // FONCTION TRACKING
  const handleDownload = async (courseId, fileUrl) => {
    try {
      // 1. On ouvre le lien
      window.open(fileUrl, '_blank');
      
      // 2. On prévient le serveur (compteur +1) sans attendre
      await api.put(`/api/courses/${courseId}/view`);
      
      // 3. (Optionnel) On met à jour l'affichage localement pour l'effet immédiat
      setCourses(prev => prev.map(c => 
        c._id === courseId ? { ...c, downloads: (c.downloads || 0) + 1 } : c
      ));
    } catch (e) {
      console.error("Erreur tracking", e);
    }
  };

  const getIcon = (type) => {
    switch(type) {
        case 'TP': return <Assignment />;
        case 'TD': return <Description />;
        case 'EXAMEN': return <Description />;
        default: return <Book />;
    }
  };

  return (
    <div className="matiere-page">
      <div className="container">
        <NavigateBackButton />
        
        <div className="matiere-header">
          <h1>{matiereName}</h1>
          <span className="niveau-badge">{annee}</span>
        </div>

        {loading ? (
            <div className="loading" style={{textAlign:'center', padding:'50px'}}>Chargement...</div>
        ) : (
            <div className="lecons-grid">
            {courses.length === 0 ? (
                <div className="empty-state">Pas de cours disponibles pour l'instant.</div>
            ) : (
                courses.map((course) => (
                <div key={course._id} className="lecon-card">
                    <div className="lecon-icon">{getIcon(course.type)}</div>
                    <div className="lecon-content">
                        <h3>{course.title}</h3>
                        <div className="meta-info">
                            <span className="prof-name">Par {course.author?.name || 'Professeur'}</span>
                            {/* Affichage discret des vues */}
                            <span className="views-count" style={{fontSize:'0.8rem', color:'#888', marginLeft:'10px', display:'flex', alignItems:'center', gap:'4px'}}>
                                <Visibility style={{fontSize:'14px'}}/> {course.downloads || 0}
                            </span>
                        </div>
                        <div className="meta-tags">
                            <span className={`tag type-${course.type}`}>{course.type}</span>
                            {course.fileSize && <span className="tag size">{course.fileSize}</span>}
                        </div>
                    </div>
                    <button 
                        onClick={() => handleDownload(course._id, course.fileUrl)}
                        className="action-btn"
                        title="Télécharger"
                    >
                        <Download />
                    </button>
                </div>
                ))
            )}
            </div>
        )}
      </div>
    </div>
  );
};

export default MatierePage;