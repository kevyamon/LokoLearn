// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/ChoixMatierePage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Search, InfoOutlined } from '@mui/icons-material'; // Icônes
import MatiereCard from '../components/MatiereCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import NavigateBackButton from '../components/common/NavigateBackButton';
import api from '../services/api';
import './ChoixMatierePage.css';

const ChoixMatierePage = () => {
  const { annee } = useParams(); 
  const [isLoading, setIsLoading] = useState(true);
  const [matieresRaw, setMatieresRaw] = useState([]); // Données brutes du serveur
  const [searchQuery, setSearchQuery] = useState(''); // Recherche

  // Récupération du contexte
  const filiereName = localStorage.getItem('selectedFiliereName');
  const filiereType = localStorage.getItem('selectedFiliereType'); 
  const niveauTechnique = filiereType ? `${filiereType}${annee}` : `L${annee}`; 

  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        // 1. On demande au backend TOUS les cours pour ce niveau/filière
        const { data } = await api.get(`/api/courses`, {
            params: { 
                filiere: filiereName,
                level: niveauTechnique 
            }
        });

        // 2. REGROUPEMENT PAR MATIÈRE UNIQUE
        const matieresMap = new Map();

        data.forEach(cours => {
            const nomMatiere = cours.subject; // Le backend a déjà nettoyé le nom
            
            if (!matieresMap.has(nomMatiere)) {
                matieresMap.set(nomMatiere, {
                    name: nomMatiere,
                    hasTP: false,
                    source: 'db'
                });
            }

            // Si un des cours est un TP, la matière gagne le badge TP
            if (cours.type === 'TP') {
                matieresMap.get(nomMatiere).hasTP = true;
            }
        });

        // 3. On stocke la liste brute (sans les fallbacks statiques !)
        setMatieresDisplay(Array.from(matieresMap.values()));

      } catch (error) {
        console.error("Erreur chargement matières", error);
        setMatieresRaw([]); // En cas d'erreur, liste vide
      } finally {
        setIsLoading(false);
      }
    };

    if (filiereName) {
        fetchMatieres();
    } else {
        setIsLoading(false);
    }
  }, [annee, filiereName, niveauTechnique]);

  // Helper pour mettre à jour le state (car j'ai utilisé setMatieresDisplay dans le code copié, 
  // mais ici je sépare pour le filtrage)
  const setMatieresDisplay = (list) => {
      setMatieresRaw(list);
  };

  // FILTRAGE ET TRI (useMemo pour la perf)
  const matieresAffichees = useMemo(() => {
    let result = [...matieresRaw];

    // 1. Recherche
    if (searchQuery) {
        result = result.filter(m => 
            m.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // 2. Tri Alphabétique
    result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [matieresRaw, searchQuery]);

  return (
    <div className="choix-matiere-container">
      
      <div className="matiere-page-header">
        <NavigateBackButton />
        <div className="header-text-content">
            <h1 className="choix-matiere-title">
                {filiereName || "Matières"}
            </h1>
            <span className="niveau-badge-large">Niveau {niveauTechnique}</span>
        </div>
      </div>

      {/* BARRE DE RECHERCHE (Seulement si on a des matières au départ) */}
      {matieresRaw.length > 0 && (
        <div className="search-bar-container">
            <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input 
                type="text" 
                placeholder="Rechercher une matière..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-field"
            />
            </div>
        </div>
      )}

      {/* CONTENU PRINCIPAL */}
      <div className="matiere-grid">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : matieresRaw.length === 0 ? (
          // CAS 1 : AUCUNE MATIÈRE PUBLIÉE (Le Modal/Message Joli)
          <div className="empty-matiere-state">
             <InfoOutlined sx={{ fontSize: 60, color: '#00aaff', mb: 2 }} />
             <h3>Aucun cours disponible</h3>
             <p>
               Les professeurs n'ont pas encore publié de contenu pour 
               cette filière en <strong>{niveauTechnique}</strong>.
             </p>
             <p className="sub-text">Revenez plus tard !</p>
          </div>
        ) : matieresAffichees.length === 0 ? (
          // CAS 2 : AUCUN RÉSULTAT DE RECHERCHE
          <div className="no-results">Aucune matière ne correspond à votre recherche.</div>
        ) : (
          // CAS 3 : AFFICHAGE NORMAL
          matieresAffichees.map((matiere, index) => (
            <MatiereCard 
              key={index}
              name={matiere.name}
              hasTP={matiere.hasTP}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChoixMatierePage;