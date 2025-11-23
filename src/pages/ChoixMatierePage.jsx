// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/ChoixMatierePage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Search, InfoOutlined } from '@mui/icons-material';
import MatiereCard from '../components/MatiereCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import NavigateBackButton from '../components/common/NavigateBackButton';
import api from '../services/api';
import './ChoixMatierePage.css';

const ChoixMatierePage = () => {
  // 'annee' contient maintenant le code précis (L1, M1, BTS1...)
  const { annee } = useParams(); 
  const niveauTechnique = annee; // Simple et direct

  const [isLoading, setIsLoading] = useState(true);
  const [matieresRaw, setMatieresRaw] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filiereName = localStorage.getItem('selectedFiliereName');

  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        // Appel API avec le bon niveau
        const { data } = await api.get(`/api/courses`, {
            params: { 
                filiere: filiereName,
                level: niveauTechnique 
            }
        });

        const matieresMap = new Map();
        data.forEach(cours => {
            const nomMatiere = cours.subject;
            if (!matieresMap.has(nomMatiere)) {
                matieresMap.set(nomMatiere, {
                    name: nomMatiere,
                    hasTP: false,
                    source: 'db'
                });
            }
            if (cours.type === 'TP') {
                matieresMap.get(nomMatiere).hasTP = true;
            }
        });

        setMatieresRaw(Array.from(matieresMap.values()));

      } catch (error) {
        console.error("Erreur chargement matières", error);
        setMatieresRaw([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (filiereName) fetchMatieres();
    else setIsLoading(false);

  }, [niveauTechnique, filiereName]); // Dépendances mises à jour

  const matieresAffichees = useMemo(() => {
    let result = [...matieresRaw];
    if (searchQuery) {
        result = result.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [matieresRaw, searchQuery]);

  return (
    <div className="choix-matiere-container">
      <div className="matiere-page-header">
        <NavigateBackButton />
        <div className="header-text-content">
            <h1 className="choix-matiere-title">{filiereName || "Matières"}</h1>
            <span className="niveau-badge-large">Niveau {niveauTechnique}</span>
        </div>
      </div>

      {matieresRaw.length > 0 && (
        <div className="search-bar-container">
            <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input type="text" placeholder="Rechercher une matière..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input-field" />
            </div>
        </div>
      )}

      <div className="matiere-grid">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => <SkeletonLoader key={index} />)
        ) : matieresRaw.length === 0 ? (
          <div className="empty-matiere-state">
             <InfoOutlined sx={{ fontSize: 60, color: '#00aaff', mb: 2 }} />
             <h3>Aucun cours disponible</h3>
             <p>Les professeurs n'ont pas encore publié de contenu pour cette filière en <strong>{niveauTechnique}</strong>.</p>
             <p className="sub-text">Revenez plus tard !</p>
          </div>
        ) : matieresAffichees.length === 0 ? (
          <div className="no-results">Aucune matière ne correspond à votre recherche.</div>
        ) : (
          matieresAffichees.map((matiere, index) => (
            <MatiereCard key={index} name={matiere.name} hasTP={matiere.hasTP} />
          ))
        )}
      </div>
    </div>
  );
};

export default ChoixMatierePage;