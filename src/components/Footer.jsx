// src/components/Footer.jsx
import React, { useState, useRef } from 'react';
import './Footer.css';
import AdminAuthModal from './admin/adminAuthModal'; // <--- Import du Modal

const Footer = () => {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const timerRef = useRef(null);

  // Déclencheur du "God Mode"
  const handlePressStart = () => {
    timerRef.current = setTimeout(() => {
      // Si on maintient 3 secondes, bingo !
      setAdminModalOpen(true);
      // Petit retour haptique si sur mobile (vibration)
      if (navigator.vibrate) navigator.vibrate(200);
    }, 3000);
  };

  const handlePressEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} LokoLearn. Tous droits réservés.
          </p>
          <p 
            className="footer-credits"
            // Les événements magiques
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            style={{ cursor: 'default', userSelect: 'none' }} // Pour ne pas sélectionner le texte
          >
            Une initiative de Kevin Amon
          </p>
        </div>
      </footer>

      {/* Le Modal Secret */}
      <AdminAuthModal 
        open={adminModalOpen} 
        onClose={() => setAdminModalOpen(false)} 
      />
    </>
  );
};

export default Footer;