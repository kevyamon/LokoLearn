// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/MatierePage.jsx
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

  // On décode le slug pour retrouver le vrai nom (ex: "chimie-organique" -> "Chimie Organique")
  // Attention : il faut que la méthode de slugify soit cohérente. 
  // Ici, on fait une approximation inverse ou on utilise le slug comme recherche partielle si le backend le permet.
  // Mieux : Le backend devrait chercher par 'subject' en mode "contient" ou "exact".
  // Pour faire simple ici, on va assumer que le frontend envoie le nom propre via le state ou on re-construit le filtre.
  
  // ASTUCE : Pour l'instant, comme on n'a pas le nom exact "propre" dans l'URL, 
  // on va faire confiance au backend pour chercher approximativement ou on utilisera le localStorage si besoin.
  // Ici, on va reconstruire un nom "propre" approximatif pour l'affichage.
  
  // Récupération du contexte Filière
  const filiereName = localStorage.getItem('selectedFiliereName');
  const filiereType = localStorage.getItem('selectedFiliereType');
  const niveauTechnique = filiereType ? `${filiereType}${annee}` : `L${annee}`;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        
        // On récupère TOUT pour cette filière/niveau
        const { data } = await api.get(`/api/courses`, {
            params: { 
                filiere: filiereName,
                level: niveauTechnique
            }
        });
        
        // FILTRAGE CLIENT : On ne garde que ceux qui correspondent au slug de la matière cliquée
        // On nettoie le slug et le sujet pour comparer (minuscules, sans tirets)
        const cleanSlug = matiereSlug.replace(/-/g, ' ').toLowerCase();
        
        const filteredCourses = data.filter(c => 
            c.subject.toLowerCase().includes(cleanSlug) || 
            cleanSlug.includes(c.subject.toLowerCase())
        );

        setCourses(filteredCourses); 
      } catch (error) {
        console.error("Erreur", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [annee, matiereSlug, filiereName, niveauTechnique]);

  const handleDownload = async (courseId, fileUrl) => {
    try {
      window.open(fileUrl, '_blank');
      await api.put(`/api/courses/${courseId}/view`);
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

  // Nom pour l'affichage (Capitalize)
  const displayTitle = matiereSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="matiere-page">
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <NavigateBackButton />
            <span className="niveau-badge">{filiereName} - {niveauTechnique}</span>
        </div>
        
        <div className="matiere-header">
          <h1>{displayTitle}</h1>
        </div>

        {loading ? (
            <div className="loading" style={{textAlign:'center', padding:'50px'}}>Chargement...</div>
        ) : (
            <div className="lecons-grid">
            {courses.length === 0 ? (
                <div className="empty-state">
                    <h3>Aucun contenu disponible</h3>
                    <p>Les professeurs n'ont pas encore mis en ligne de cours pour <strong>{displayTitle}</strong> dans cette filière.</p>
                </div>
            ) : (
                courses.map((course) => (
                <div key={course._id} className="lecon-card">
                    <div className="lecon-icon">{getIcon(course.type)}</div>
                    <div className="lecon-content">
                        <h3>{course.title}</h3>
                        <div className="meta-info">
                            <span className="prof-name">Par {course.author?.name || 'Professeur'}</span>
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