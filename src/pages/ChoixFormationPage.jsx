import React, { useState } from 'react'; // 1. Importer useState
import { useNavigate } from 'react-router-dom';
import Modal from '../components/common/Modal'; // 2. Importer le composant Modal
import './ChoixFormationPage.css';

const ChoixFormationPage = () => {
  const navigate = useNavigate();
  
  // 3. Créer un état pour contrôler la visibilité de la modale
  const [isLmdModalOpen, setIsLmdModalOpen] = useState(false);

  const handleBtsClick = () => {
    navigate('/choix-filiere'); 
  };

  // 4. Le clic sur LMD va maintenant ouvrir la modale
  const handleLmdClick = () => {
    setIsLmdModalOpen(true);
  };

  return (
    <div className="choix-container">
      {/* 5. Ajouter la modale à la page */}
      <Modal isOpen={isLmdModalOpen} onClose={() => setIsLmdModalOpen(false)}>
        <div className="lmd-modal-content">
          <h3>Section en Développement</h3>
          <p>Le parcours LMD est en cours de préparation et sera bientôt disponible sur LokoLearn.</p>
          <button 
            className="lmd-modal-button" 
            onClick={() => setIsLmdModalOpen(false)}
          >
            Compris
          </button>
        </div>
      </Modal>

      <h1 className="choix-title">Choisissez votre parcours</h1>
      <div className="buttons-container">
        <button 
          className="choix-button bts-button"
          onClick={handleBtsClick}
        >
          BTS
        </button>
        <button 
          className="choix-button lmd-button"
          onClick={handleLmdClick}
        >
          LMD
        </button>
      </div>
    </div>
  );
};

export default ChoixFormationPage;