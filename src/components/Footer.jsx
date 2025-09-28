import React from 'react';
import './Footer.css';

const Footer = () => {
  // 1. On récupère l'année actuelle dynamiquement
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      {/* 2. On affiche l'année récupérée */}
      <p>&copy; {currentYear} LokoLearn - Développé par Kevy Amon. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;