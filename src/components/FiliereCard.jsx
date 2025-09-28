import React from 'react';
import { useModal } from '../contexts/ModalContext';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../hooks/useSound'; // On ajoute les sons ici aussi
import './FiliereCard.css';

// Le composant accepte maintenant la prop 'style'
const FiliereCard = ({ name, active, style }) => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const { playClickSound, playHoverSound } = useSound();

  const handleClick = () => {
    playClickSound();
    if (active) {
      navigate('/choix-niveau');
    } else {
      showModal(
        "Filière en cours d'ajout",
        "Le contenu pour cette filière sera bientôt disponible. Merci de votre patience !"
      );
    }
  };

  const cardClasses = `filiere-card ${active ? 'active' : 'inactive'}`;

  // On applique le style au conteneur principal
  return (
    <div 
      className={cardClasses} 
      onClick={handleClick} 
      onMouseEnter={playHoverSound}
      style={style}
    >
      <div className="card-content">
        <h3>{name}</h3>
      </div>
      {!active && <div className="soon-badge">Bientôt</div>}
    </div>
  );
};

export default FiliereCard;