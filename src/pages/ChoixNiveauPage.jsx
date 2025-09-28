import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChoixNiveauPage.css';

const ChoixNiveauPage = () => {
  const navigate = useNavigate();

  // La fonction envoie maintenant vers une URL dynamique en fonction du bouton cliqué
  const handleNiveauClick = (niveau) => {
    navigate(`/matieres/${niveau}`); // Ex: /matieres/1 ou /matieres/2
  };

  return (
    <div className="choix-container">
      <h1 className="choix-title">Sélectionnez votre année</h1>
      <div className="buttons-container">
        <button 
          className="choix-button annee1-button"
          onClick={() => handleNiveauClick(1)} // On passe 1 pour la première année
        >
          Première Année
        </button>
        <button 
          className="choix-button annee2-button"
          onClick={() => handleNiveauClick(2)} // On passe 2 pour la deuxième année
        >
          Deuxième Année
        </button>
      </div>
    </div>
  );
};

export default ChoixNiveauPage;