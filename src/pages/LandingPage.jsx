import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  // On sépare le titre en deux parties
  const titleParts = ["Bienvenue sur", "LokoLearn"];

  const handleStart = () => {
    navigate('/choix-formation');
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">
        {/* On boucle sur chaque partie du titre */}
        {titleParts.map((part, partIndex) => (
          <span key={partIndex} className="title-line">
            {/* Et ensuite on boucle sur chaque lettre de la partie */}
            {part.split('').map((char, charIndex) => (
              <span 
                key={charIndex} 
                style={{ animationDelay: `${(partIndex * 10 + charIndex) * 0.08}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        ))}
      </h1>
      
      <p className="landing-subtitle">
        Votre plateforme d'entraide pour réussir votre formation au sein du Groupe LOKO.
      </p>
      
      <div className="landing-author">
        <p>Une initiative de Kévin Amon (Kevy)</p>
      </div>
      
      <button onClick={handleStart} className="start-button">
        <span role="img" aria-label="Graduate Cap" className="start-icon">🎓</span>
        Commencer l'aventure
      </button>
      
      <p className="slogan">
        GROUPE LOKO, notre expérience fera toujours la différence.
      </p>
    </div>
  );
};

export default LandingPage;