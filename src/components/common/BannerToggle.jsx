import React from 'react';
import './BannerToggle.css';

// Le composant reçoit l'état actuel de la bannière (isVisible)
// et la fonction pour changer cet état (toggleBanner)
const BannerToggle = ({ isVisible, toggleBanner }) => {
  return (
    <button 
      onClick={toggleBanner} 
      className="banner-toggle"
      title={isVisible ? 'Masquer la bannière' : 'Afficher la bannière'}
    >
      {/* On affiche une icône différente selon l'état */}
      {isVisible ? '👁️' : '👁️‍🗨️'}
    </button>
  );
};

export default BannerToggle;