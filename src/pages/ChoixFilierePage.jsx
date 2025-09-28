import React from 'react';
import { filieres } from '../data/filieresData';
import FiliereCard from '../components/FiliereCard';
import './ChoixFilierePage.css';

const ChoixFilierePage = () => {
  return (
    <div className="choix-filiere-container">
      <h1 className="choix-filiere-title">Quelle est votre filière ?</h1>
      <div className="filiere-grid">
        {filieres.map((filiere, index) => (
          <FiliereCard 
            key={index} 
            name={filiere.name} 
            active={filiere.active}
            // On passe un délai d'animation calculé à chaque carte 
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChoixFilierePage;