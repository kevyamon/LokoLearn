// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/MatierePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MatierePage.css';
import NavigateBackButton from '../components/common/NavigateBackButton';
import { PictureAsPdf, Description, Slideshow, Download, Search, Person, Visibility } from '@mui/icons-material';
import api from '../services/api';

const MatierePage = () => {
  // 'annee' est maintenant le code précis (L1, M1...)
  const { annee, matiereSlug } = useParams();
  const niveauTechnique = annee;

  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
  }, [niveauTechnique, matiereSlug, filiereName]); // Dépendances mises à jour

  useEffect(() => {
    if (searchTerm === '') {
        setFilteredCourses(allCourses);
    } else {
        setFilteredCourses(allCourses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [searchTerm, allCourses]);

  const handleDownload = async (courseId, fileUrl) => {
    try {
      window.open(fileUrl, '_blank');
      await api.put(`/api/courses/${courseId}/view`);
      setFilteredCourses(prev => prev.map(c => c._id === courseId ? { ...c, downloads: (c.downloads || 0) + 1 } : c));
    } catch (e) { console.error(e); }
  };

  const getFileIcon = (type) => {
    if (type && type.includes('pdf')) return <PictureAsPdf style={{ color: '#f40f02', fontSize: 40 }} />;
    if (type && (type.includes('word') || type.includes('doc'))) return <Description style={{ color: '#2b579a', fontSize: 40 }} />;
    if (type && (type.includes('powerpoint') || type.includes('ppt'))) return <Slideshow style={{ color: '#d24726', fontSize: 40 }} />;
    return <Description style={{ color: '#555', fontSize: 40 }} />;
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
                <input type="text" placeholder={`Trouver un cours dans ${displayTitle}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input-field" />
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
                    <div className="post-attachment" onClick={() => handleDownload(course._id, course.fileUrl)}>
                        <div className="file-icon">{getFileIcon(course.fileType)}</div>
                        <div className="file-info">
                            <span className="file-name">Document de cours</span>
                            <span className="file-type">{course.fileType?.split('/')[1]?.toUpperCase() || 'FICHIER'} • {course.fileSize || 'Unknown Size'}</span>
                        </div>
                        <div className="download-action"><Download /></div>
                    </div>
                    <div className="post-footer">
                        <div className="stat-item"><Visibility fontSize="small" /> {course.views || 0} Vues</div>
                        <div className="stat-item"><Download fontSize="small" /> {course.downloads || 0} Téléchargements</div>
                    </div>
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