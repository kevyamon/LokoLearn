import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import './ChoixFormationPage.css';

const ChoixFormationPage = () => {
  const navigate = useNavigate(); // Initialiser le hook

  // Le clic envoie maintenant vers la nouvelle page
  const handleBtsClick = () => {
    navigate('/choix-filiere'); 
  };

  // Le bouton LMD affichera une modale d'information.
  const handleLmdClick = () => {
    alert("Cette section est en cours de développement. Revenez bientôt !");
  };

  return (
    <div className="choix-container">
      <h1 className="choix-title">Choisissez votre parcours</h1>
      <div className="buttons-container">
        <button 
          className="choix-button bts-button"
          onClick={handleBtsClick}
        >
          BTS
        </button>
        <button 
          className="choix-button lmd-button"
          onClick={handleLmdClick}
        >
          LMD
        </button>
      </div>
    </div>
  );
};

export default ChoixFormationPage;