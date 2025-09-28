import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/common/Banner';
import TransitionScreen from '../components/common/TransitionScreen';
import { useSound } from '../hooks/useSound'; // 1. Importer notre hook
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const titleParts = ["Bienvenue sur ", "LokoLearn"];
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playClickSound, playHoverSound } = useSound(); // 2. Initialiser le hook

  const handleStart = () => {
    playClickSound(); // 3. Jouer le son au clic
    setIsTransitioning(true);
  };

  return (
    <div className="landing-page-wrapper">
      {isTransitioning && (
        <TransitionScreen 
          onAnimationEnd={() => navigate('/choix-formation')} 
        />
      )}

      <Banner />

      <div className="content-container">
        <h1 className="content-title">
          {titleParts.map((part, partIndex) => (
            <span key={partIndex} className="title-line">
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
        
        <p className="content-subtitle">
          Votre plateforme d'entraide pour réussir votre formation au sein du Groupe LOKO.
        </p>
        
        <div className="content-author">
          <p>Une initiative de Kévin Amon (Kevy)</p>
        </div>
        
        <button 
          onClick={handleStart} 
          onMouseEnter={playHoverSound} // 4. Jouer le son au survol
          className="start-button"
        >
          <span role="img" aria-label="Graduate Cap" className="start-icon">🎓</span>
          Commencer l'aventure
        </button>
        
        <p className="slogan">
          GROUPE LOKO, notre expérience fera toujours la différence.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;