import React, { useState, useEffect } from 'react';
import { filieres } from '../data/filieresData';
import FiliereCard from '../components/FiliereCard';
import SkeletonLoader from '../components/common/SkeletonLoader'; // 1. Importer le squelette
import './ChoixFilierePage.css';

const ChoixFilierePage = () => {
  // 2. Créer un état de chargement
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3. Simuler un chargement de 1 seconde
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Nettoyage
  }, []);

  return (
    <div className="choix-filiere-container">
      <h1 className="choix-filiere-title">Quelle est votre filière ?</h1>
      <div className="filiere-grid">
        {/* 4. Affichage conditionnel */}
        {isLoading ? (
          // Si ça charge, on affiche 12 squelettes
          Array.from({ length: 12 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : (
          // Sinon, on affiche les vraies cartes
          filieres.map((filiere, index) => (
            <FiliereCard 
              key={index} 
              name={filiere.name} 
              active={filiere.active}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChoixFilierePage;