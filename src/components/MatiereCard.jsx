import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importer les hooks
import './MatiereCard.css';

const MatiereCard = ({ name, hasTP }) => {
  const navigate = useNavigate();
  const { annee } = useParams(); // On récupère l'année de l'URL actuelle

  const handleClick = () => {
    // On "slugifie" le nom pour l'URL (ex: "Chimie Générale" -> "chimie-generale")
    const matiereSlug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    navigate(`/matiere/${annee}/${matiereSlug}`);
  };

  return (
    <div className="matiere-card" onClick={handleClick}>
      <div className="matiere-card-content">
        <h3>{name}</h3>
      </div>
      {hasTP && <div className="tp-badge">TP</div>}
    </div>
  );
};

export default MatiereCard;