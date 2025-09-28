import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/choix-formation');
  };

  return (
    <div className="landing-container">
      {/* Le titre avec une classe pour l'animation typewriter */}
      <h1 className="landing-title typewriter">Bienvenue sur LokoLearn</h1>
      
      {/* Le texte de présentation mis à jour */}
      <p className="landing-subtitle">
        Votre plateforme d'entraide pour réussir votre formation au sein du Groupe LOKO.
      </p>
      
      <div className="landing-author">
        <p>Une initiative de Kévin Amon (Kevy)</p>
      </div>
      
      {/* Le nouveau bouton avec l'icône */}
      <button onClick={handleStart} className="start-button">
        <span role="img" aria-label="Graduate Cap" className="start-icon">🎓</span>
        Commencer l'aventure
      </button>
      
      {/* Le slogan de l'école */}
      <p className="slogan">
        GROUPE LOKO, notre expérience fera toujours la différence.
      </p>
    </div>
  );
};

export default LandingPage;