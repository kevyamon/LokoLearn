import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import './FiliereCard.css';

const FiliereCard = ({ name, active }) => {
  const navigate = useNavigate(); // Initialiser le hook

  const handleClick = () => {
    if (active) {
      navigate('/choix-niveau'); // Rediriger vers la page de choix du niveau
    } else {
      alert("Cette filière est en cours d'ajout. Merci de votre patience !");
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