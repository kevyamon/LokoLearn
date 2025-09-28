import React, { useEffect } from 'react';
import './TransitionScreen.css';
import logo from '../../assets/logo.png'; // On importe le logo

const TransitionScreen = ({ onAnimationEnd }) => {
  useEffect(() => {
    // La durée totale de l'animation est de 2.5 secondes
    const timer = setTimeout(() => {
      onAnimationEnd(); // On prévient le parent que l'animation est finie
    }, 2500);

    return () => clearTimeout(timer); // Nettoyage du minuteur
  }, [onAnimationEnd]);

  return (
    <div className="transition-container">
      <img src={logo} alt="LokoLearn Logo" className="transition-logo" />
    </div>
  );
};

export default TransitionScreen;