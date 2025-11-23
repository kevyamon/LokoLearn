// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/ChoixFilierePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FALLBACK_FILIERES } from '../data/fallbackData'; // Nos données centralisées
import FiliereCard from '../components/FiliereCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import './ChoixFilierePage.css';

const ChoixFilierePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // On pourrait aussi charger les filières depuis l'API plus tard
  const filieres = FALLBACK_FILIERES; 

  useEffect(() => {
    // Simulation chargement rapide
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleFiliereClick = (filiere) => {
    // C'EST ICI LA CLÉ : On sauvegarde le choix de l'étudiant
    localStorage.setItem('selectedFiliereName', filiere.name);
    localStorage.setItem('selectedFiliereType', filiere.type);
    
    navigate('/choix-niveau');
  };

  return (
    <div className="choix-filiere-container">
      <h1 className="choix-filiere-title">Quelle est votre filière ?</h1>
      <div className="filiere-grid">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : (
          filieres.map((filiere, index) => (
            <div key={index} onClick={() => handleFiliereClick(filiere)}>
                <FiliereCard 
                name={filiere.name} 
                active={true} // On active tout maintenant
                />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChoixFilierePage;