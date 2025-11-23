// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/ChoixFilierePage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search } from '@mui/icons-material'; // On utilise l'icône de Material UI
import { FALLBACK_FILIERES } from '../data/fallbackData';
import FiliereCard from '../components/FiliereCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import NavigateBackButton from '../components/common/NavigateBackButton';
import './ChoixFilierePage.css';

const ChoixFilierePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupération du type de formation choisi (BTS ou LMD)
  // Si on arrive directement sur la page sans passer par le menu, on met BTS par défaut ou on gère
  const typeFormation = location.state?.typeFormation || 'BTS';

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleFiliereClick = (filiere) => {
    localStorage.setItem('selectedFiliereName', filiere.name);
    localStorage.setItem('selectedFiliereType', filiere.type);
    navigate('/choix-niveau');
  };

  // FILTRAGE ET TRI
  const filieresAffichees = useMemo(() => {
    // 1. Filtrer par type (BTS vs LMD)
    let result = FALLBACK_FILIERES.filter(f => f.type === typeFormation);

    // 2. Filtrer par recherche
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(f => 
        f.name.toLowerCase().includes(lowerQuery)
      );
    }

    // 3. Trier par ordre alphabétique
    result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [typeFormation, searchQuery]);

  return (
    <div className="choix-filiere-container">
      
      <div className="filiere-header">
        <NavigateBackButton />
        <h1 className="choix-filiere-title">Filières {typeFormation}</h1>
      </div>

      {/* BARRE DE RECHERCHE */}
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder={`Rechercher une filière ${typeFormation}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-field"
          />
        </div>
      </div>

      <div className="filiere-grid">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : filieresAffichees.length === 0 ? (
          <div className="no-results">Aucune filière trouvée.</div>
        ) : (
          filieresAffichees.map((filiere, index) => (
            <div key={index} onClick={() => handleFiliereClick(filiere)}>
                <FiliereCard 
                  name={filiere.name} 
                  active={true} 
                />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChoixFilierePage;