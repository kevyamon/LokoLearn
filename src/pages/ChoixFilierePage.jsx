import React from 'react';
import { filieres } from '../data/filieresData'; // Importer les données
import FiliereCard from '../components/FiliereCard'; // Importer le composant carte
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
          />
        ))}
      </div>
    </div>
  );
};

export default ChoixFilierePage;