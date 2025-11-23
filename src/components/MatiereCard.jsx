// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/components/MatiereCard.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LibraryBooks, Science } from '@mui/icons-material'; // Icônes pour le modal
import Modal from './common/Modal'; // On réutilise ton composant Modal générique
import './MatiereCard.css';

const MatiereCard = ({ name, hasTP }) => {
  const navigate = useNavigate();
  const { annee } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);

  // Fonction pour nettoyer le nom pour l'URL
  const getSlug = () => name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const handleClick = () => {
    if (hasTP) {
      // Si TP dispo, on demande
      setModalOpen(true);
    } else {
      // Sinon, direction directe vers les cours
      navigate(`/matiere/${annee}/${getSlug()}`);
    }
  };

  const handleChoice = (type) => {
    setModalOpen(false);
    const slug = getSlug();
    if (type === 'cours') {
      navigate(`/matiere/${annee}/${slug}`);
    } else if (type === 'tp') {
      navigate(`/tp/${annee}/${slug}`);
    }
  };

  return (
    <>
      <div className={`matiere-card ${hasTP ? 'has-tp' : ''}`} onClick={handleClick}>
        <div className="matiere-card-content">
          <h3>{name}</h3>
        </div>
        
        {/* NOUVEAU BADGE INFORMATIF (Plus visible) */}
        {hasTP && (
          <div className="tp-info-badge">
            ✨ Option TP Disponible
          </div>
        )}
      </div>

      {/* MODAL DE CHOIX (Seulement si hasTP) */}
      {hasTP && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <div className="modal-choix-container">
            <h2>Que souhaitez-vous consulter ?</h2>
            <p className="modal-subtitle">Cette matière contient des ressources pratiques.</p>
            
            <div className="modal-buttons">
              <button 
                className="modal-button cours" 
                onClick={() => handleChoice('cours')}
              >
                <LibraryBooks sx={{ fontSize: 40, marginBottom: '10px' }} />
                Cours Magistraux
              </button>
              
              <button 
                className="modal-button tp" 
                onClick={() => handleChoice('tp')}
              >
                <Science sx={{ fontSize: 40, marginBottom: '10px' }} />
                Travaux Pratiques
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MatiereCard;