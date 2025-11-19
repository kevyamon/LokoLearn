import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/common/Banner';
import BannerToggle from '../components/common/BannerToggle';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  // Gestion de l'affichage de la bannière (persistant via localStorage)
  const [showBanner, setShowBanner] = useState(
    localStorage.getItem('bannerVisible') !== 'false'
  );

  const toggleBanner = () => {
    const newState = !showBanner;
    setShowBanner(newState);
    localStorage.setItem('bannerVisible', newState);
  };

  return (
    <div className={`landing-page ${showBanner ? 'with-banner' : 'no-banner'}`}>
      
      {/* Bouton pour afficher/masquer la bannière */}
      <BannerToggle isVisible={showBanner} toggleBanner={toggleBanner} />

      {/* La Bannière (si active) */}
      {showBanner && <Banner />}

      <div className="content-container">
        <h1 className="content-title">
          <span className="title-line">
            <span>L</span><span>O</span><span>K</span><span>O</span>
          </span>
          <span className="title-line">
            <span>L</span><span>E</span><span>A</span><span>R</span><span>N</span>
          </span>
        </h1>

        <p className="content-subtitle">
          La plateforme numérique d'excellence du Groupe LOKO.
        </p>
        
        <p className="content-author">
          Conçue par Kevy Amon
        </p>

        <button className="start-button" onClick={() => navigate('/login')}>
          <span className="start-icon">🚀</span>
          Accéder à mon Espace
        </button>

        <p className="slogan">
          "L'avenir appartient à ceux qui se préparent aujourd'hui."
        </p>
      </div>
    </div>
  );
};

export default LandingPage;