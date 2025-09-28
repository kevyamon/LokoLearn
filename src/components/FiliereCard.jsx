import React from 'react';
import { useModal } from '../contexts/ModalContext';
import { useNavigate } from 'react-router-dom'; // 1. Importer useNavigate
import './FiliereCard.css';

const FiliereCard = ({ name, active }) => {
  const { showModal } = useModal();
  const navigate = useNavigate(); // 2. Initialiser la fonction de navigation

  const handleClick = () => {
    if (active) {
      // 3. Remplacer l'alerte par la navigation vers la page suivante
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
    <div className={cardClasses} onClick={handleClick}>
      <div className="card-content">
        <h3>{name}</h3>
      </div>
      {!active && <div className="soon-badge">Bientôt</div>}
    </div>
  );
};

export default FiliereCard;