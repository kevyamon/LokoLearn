import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // 1. Importer useSearchParams
import Banner from '../components/common/Banner';
import BannerToggle from '../components/common/BannerToggle';
import TransitionScreen from '../components/common/TransitionScreen';
import { useSound } from '../hooks/useSound';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // 2. Initialiser le hook pour lire l'URL
  const titleParts = ["Bienvenue sur ", "LokoLearn"];
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playClickSound, playHoverSound } = useSound();

  const [isBannerVisible, setIsBannerVisible] = useState(
    localStorage.getItem('bannerVisible') === 'false' ? false : true
  );

  // 3. Vérifier si le mode admin est activé dans l'URL
  const isAdmin = searchParams.get('admin') === 'true';

  useEffect(() => {
    localStorage.setItem('bannerVisible', isBannerVisible);
  }, [isBannerVisible]);

  const toggleBanner = () => {
    setIsBannerVisible(!isBannerVisible);
  };

  const handleStart = () => {
    playClickSound();
    setIsTransitioning(true);
  };

  const wrapperClass = `landing-page-wrapper ${isBannerVisible ? 'with-banner' : 'no-banner'}`;

  return (
    <div className={wrapperClass}>
      {isTransitioning && (
        <TransitionScreen 
          onAnimationEnd={() => navigate('/choix-formation')} 
        />
      )}

      {/* 4. Afficher le bouton de contrôle UNIQUEMENT si isAdmin est true */}
      {isAdmin && <BannerToggle isVisible={isBannerVisible} toggleBanner={toggleBanner} />}

      {isBannerVisible && <Banner />}

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
          onMouseEnter={playHoverSound}
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