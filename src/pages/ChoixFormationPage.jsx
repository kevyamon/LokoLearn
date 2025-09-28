import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext'; // 1. Importer
import './ChoixFormationPage.css';

const ChoixFormationPage = () => {
  const navigate = useNavigate();
  const { showModal } = useModal(); // 2. Récupérer

  const handleBtsClick = () => {
    navigate('/choix-filiere'); 
  };

  const handleLmdClick = () => {
    // 3. Utiliser notre système centralisé
    showModal(
      "Section en Développement",
      "Le parcours LMD est en cours de préparation et sera bientôt disponible sur LokoLearn."
    );
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