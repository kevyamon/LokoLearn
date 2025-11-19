// src/pages/MatierePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MatierePage.css';
import NavigateBackButton from '../components/common/NavigateBackButton';
import { Book, Videocam, Assignment, Description, Download } from '@mui/icons-material';
import api from '../services/api'; // Import de l'API

const MatierePage = () => {
  const { annee, matiereSlug } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  // On utilise le slug comme titre par défaut, en attendant mieux
  const [matiereName, setMatiereName] = useState(matiereSlug.replace(/-/g, ' '));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Récupération de tous les cours (dans une V2, on filtrera côté serveur)
        const { data } = await api.get('/api/courses');
        
        // Filtrage local : On ne garde que les cours qui correspondent au niveau (annee)
        // Note: Pour la matière, l'idéal serait de comparer les ID, mais ici on va afficher tout pour tester
        const filtered = data.filter(c => c.level === annee);
        
        setCourses(filtered);

        // Si on trouve des cours, on met à jour le titre avec le vrai nom de la matière
        if(filtered.length > 0 && filtered[0].subject) {
             setMatiereName(filtered[0].subject.name);
        }

      } catch (error) {
        console.error("Erreur chargement cours", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [annee, matiereSlug]);

  // Choix de l'icône selon le type
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
          <h1>{matiereName.toUpperCase()}</h1>
          <span className="niveau-badge">{annee}</span>
        </div>

        {loading ? (
            <div className="loading" style={{textAlign: 'center', marginTop: '50px'}}>Chargement des ressources...</div>
        ) : (
            <div className="lecons-grid">
            {courses.length === 0 ? (
                <div className="empty-state">
                    <p>Aucun document n'a encore été publié pour cette matière.</p>
                </div>
            ) : (
                courses.map((course) => (
                <div key={course._id} className="lecon-card">
                    <div className="lecon-icon">
                        {getIcon(course.type)}
                    </div>
                    <div className="lecon-content">
                        <h3>{course.title}</h3>
                        <p className="prof-name">Publié par : {course.author?.name || 'Enseignant'}</p>
                        <div className="meta-tags">
                            <span className={`tag type-${course.type.toLowerCase()}`}>{course.type}</span>
                            {course.fileSize && <span className="tag size">{course.fileSize}</span>}
                        </div>
                    </div>
                    <a 
                        href={course.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn"
                        title="Télécharger"
                    >
                        <Download />
                    </a>
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