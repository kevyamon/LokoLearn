import React from 'react';
import { useModal } from '../contexts/ModalContext';
import { useNavigate } from 'react-router-dom';
// On retire l'import de useSound
import './FiliereCard.css';

// On retire la prop 'style' qui n'est plus utilisée pour l'animation
const FiliereCard = ({ name, active }) => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  // On retire l'initialisation du hook useSound

  const handleClick = () => {
    // On retire l'appel à playClickSound()
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

  return (
    <div 
      className={cardClasses} 
      onClick={handleClick} 
      // On retire l'événement onMouseEnter
    >
      <div className="card-content">
        <h3>{name}</h3>
      </div>
      {!active && <div className="soon-badge">Bientôt</div>}
    </div>
  );
};

export default FiliereCard;