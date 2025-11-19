// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Le voile sombre pour faire ressortir le texte */}
      <div className="landing-overlay"></div>

      <div className="content-container">
        <h1 className="content-title">
          LOKO <span className="title-highlight">LEARN</span>
        </h1>

        <p className="content-subtitle">
          La plateforme numérique d'excellence du Groupe LOKO.
          <br />
          Accédez à vos cours, vos TP et préparez votre avenir dès aujourd'hui.
        </p>

        <button className="start-button" onClick={() => navigate('/login')}>
          Commencer
        </button>
      </div>

      <div className="landing-footer">
        &copy; 2025 LokoLearn - Développé par Kevy Amon
      </div>
    </div>
  );
};

export default LandingPage;