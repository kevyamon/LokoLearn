import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { matieres } from '../data/matieresData';
import { programmeData } from '../data/programmeData';
import Modal from '../components/common/Modal';
import Accordion from '../components/layout/Accordion';
import './MatierePage.css';

const MatierePage = () => {
  const { annee, matiereSlug } = useParams();
  const navigate = useNavigate();
  const anneeNum = parseInt(annee, 10);

  const currentMatiere = matieres.find(
    (m) => m.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') === matiereSlug
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState(null);

  useEffect(() => {
    if (currentMatiere) {
      if (currentMatiere.hasTP) {
        setIsModalOpen(true);
      } else {
        setViewMode('cours');
      }
    }
  }, [currentMatiere]);

  const handleSelectCours = () => {
    setViewMode('cours');
    setIsModalOpen(false);
  };

  const handleSelectTP = () => {
    // Redirige vers la nouvelle page de la liste des TP
    navigate(`/tp/${annee}/${matiereSlug}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (viewMode === null) {
      navigate(-1);
    }
  };

  const programmeKey = `${currentMatiere?.name}-${anneeNum}`;
  const programme = programmeData[programmeKey] || programmeData['Default'];

  if (!currentMatiere) {
    return <div className="matiere-container"><p>Matière non trouvée.</p></div>;
  }

  return (
    <div className="matiere-page-container">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-choix-container">
          <h2>Que souhaitez-vous consulter ?</h2>
          <div className="modal-buttons">
            <button className="modal-button cours" onClick={handleSelectCours}>Cours</button>
            <button className="modal-button tp" onClick={handleSelectTP}>TP</button>
          </div>
        </div>
      </Modal>

      {viewMode === 'cours' && (
        <div className="content-section">
          <h1 className="matiere-title">{currentMatiere.name}</h1>
          <div className="section-content">
            <Accordion data={programme} />
          </div>
        </div>
      )}

      {viewMode === 'tp' && (
        // Cette partie ne sera plus jamais affichée, mais on la laisse par sécurité
        <div className="content-section">
          <h1 className="matiere-title">{currentMatiere.name} - Travaux Pratiques</h1>
          <p className="placeholder-text">Redirection...</p>
        </div>
      )}
    </div>
  );
};

export default MatierePage;