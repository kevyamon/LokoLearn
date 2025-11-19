// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/components/Footer.jsx
import React, { useState, useRef } from 'react';
import './Footer.css';
import AdminAuthModal from './admin/adminAuthModal';

const Footer = () => {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const timerRef = useRef(null);

  const handlePressStart = () => {
    timerRef.current = setTimeout(() => {
      setAdminModalOpen(true);
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
      {/* CORRECTION : 'app-footer' pour correspondre au CSS */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} LokoLearn. Tous droits réservés.
          </p>
          <p 
            className="footer-credits"
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            style={{ cursor: 'default', userSelect: 'none' }}
          >
            Une initiative de Kevin Amon
          </p>
        </div>
      </footer>

      <AdminAuthModal 
        open={adminModalOpen} 
        onClose={() => setAdminModalOpen(false)} 
      />
    </>
  );
};

export default Footer;