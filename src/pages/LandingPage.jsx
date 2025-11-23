// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/LandingPage.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAuthModal from '../components/admin/adminAuthModal';
import { authService } from '../services/authService'; // IMPORT
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const timerRef = useRef(null);

  const handlePressStart = () => {
    timerRef.current = setTimeout(() => {
      setAdminModalOpen(true);
      if (navigator.vibrate) navigator.vibrate(200);
    }, 3000);
  };

  const handlePressEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // FONCTION INTELLIGENTE DU BOUTON COMMENCER
  const handleStart = () => {
    const session = authService.checkSession();

    if (session && session.valid) {
        // Si déjà connecté, on redirige selon le rôle
        if (session.role === 'student') navigate('/etudiant/dashboard');
        else if (session.role === 'professor') navigate('/prof/dashboard');
        else if (session.role === 'admin') navigate('/admin');
    } else {
        // Sinon, direction login classique
        navigate('/login');
    }
  };

  return (
    <div className="landing-page">
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

        <button className="start-button" onClick={handleStart}>
          Commencer
        </button>
      </div>

      <div className="landing-footer">
        <p>
          &copy; 2025 LokoLearn - 
          <span 
            className="dev-credits"
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

      <AdminAuthModal 
        open={adminModalOpen} 
        onClose={() => setAdminModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;