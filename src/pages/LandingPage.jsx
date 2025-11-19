// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/LandingPage.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAuthModal from '../components/admin/adminAuthModal'; // On réutilise ton modal
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  
  // --- LOGIQUE GOD MODE (INTEGRÉE ICI) ---
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const timerRef = useRef(null);

  const handlePressStart = () => {
    // Si on maintient 3 secondes
    timerRef.current = setTimeout(() => {
      setAdminModalOpen(true);
      // Vibration si sur mobile
      if (navigator.vibrate) navigator.vibrate(200);
    }, 3000); 
  };

  const handlePressEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  // ---------------------------------------

  return (
    <div className="landing-page">
      {/* Overlay sombre */}
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

      {/* FOOTER SPÉCIFIQUE LANDING (Avec le bouton caché) */}
      <div className="landing-footer">
        <p>
          &copy; 2025 LokoLearn - 
          <span 
            className="dev-credits"
            /* Les événements magiques pour le tactile et la souris */
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            style={{ cursor: 'default', userSelect: 'none', marginLeft: '5px' }}
          >
            Développé par Kevy Amon
          </span>
        </p>
      </div>

      {/* Le Modal Admin caché */}
      <AdminAuthModal 
        open={adminModalOpen} 
        onClose={() => setAdminModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;