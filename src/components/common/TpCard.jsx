import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 1. Importer les hooks
import './TpCard.css';

const TpCard = ({ id, title, description }) => { // 2. Accepter l'ID du TP
  const navigate = useNavigate();
  const { annee, matiereSlug } = useParams(); // On récupère les infos de l'URL

  const handleClick = () => {
    // 3. Naviguer vers la page de détail avec toutes les infos
    navigate(`/tp/${annee}/${matiereSlug}/${id}`);
  };

  return (
    <div 
      className="tp-card" 
      onClick={handleClick}
    >
      <div className="tp-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TpCard;