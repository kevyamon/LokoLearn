import React from 'react';
import { useModal } from '../../contexts/ModalContext';
import { useSound } from '../../hooks/useSound';
import './TpCard.css';

const TpCard = ({ title, description }) => {
  const { showModal } = useModal();
  const { playClickSound, playHoverSound } = useSound();

  const handleClick = () => {
    playClickSound();
    showModal(
      "Contenu en construction",
      `Le protocole pour le ${title} (${description}) sera bientôt disponible.`
    );
  };

  return (
    <div 
      className="tp-card" 
      onClick={handleClick}
      onMouseEnter={playHoverSound}
    >
      <div className="tp-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TpCard;