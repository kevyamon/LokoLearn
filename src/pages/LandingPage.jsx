import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // On va créer ce fichier CSS juste après

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/choix-formation');
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Bienvenue sur LokoLearn</h1>
        <p className="landing-subtitle">
          Votre plateforme d'entraide pour réussir votre BTS en Industrie Agro-alimentaire et Chimique.
        </p>
        <div className="landing-author">
          <p>Une initiative de Kévin Amon (Kevy)</p>
        </div>
        <button onClick={handleStart} className="start-button">
          Commencer l'aventure
        </button>
      </div>
    </div>
  );
};

export default LandingPage;