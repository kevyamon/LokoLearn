import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { matieres } from '../data/matieresData';
import { programmeData } from '../data/programmeData';
import Modal from '../components/common/Modal';
import Accordion from '../components/layout/Accordion';
import './MatierePage.css';

const MatierePage = () => {
  const { annee, matiereSlug } = useParams();
  const anneeNum = parseInt(annee, 10);

  // On retrouve les détails de la matière actuelle
  const currentMatiere = matieres.find(
    (m) => m.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') === matiereSlug
  );

  // State pour gérer la modale et la vue (Cours ou TP)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState(null); // 'cours', 'tp', or null

  // Effet pour décider s'il faut ouvrir la modale au chargement de la page
  useEffect(() => {
    if (currentMatiere) {
      if (currentMatiere.hasTP) {
        setIsModalOpen(true);
      } else {
        setViewMode('cours'); // Si pas de TP, on affiche direct les cours
      }
    }
  }, [currentMatiere]);

  const handleSelectCours = () => {
    setViewMode('cours');
    setIsModalOpen(false);
  };

  const handleSelectTP = () => {
    setViewMode('tp');
    setIsModalOpen(false);
  };

  // On cherche le programme correspondant à la matière et à l'année
  const programmeKey = `${currentMatiere?.name}-${anneeNum}`;
  const programme = programmeData[programmeKey] || programmeData['Default'];

  if (!currentMatiere) {
    return <div className="matiere-container"><p>Matière non trouvée.</p></div>;
  }

  return (
    <div className="matiere-page-container">
      {/* La Modale pour le choix Cours/TP */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-choix-container">
          <h2>Que souhaitez-vous consulter ?</h2>
          <div className="modal-buttons">
            <button className="modal-button cours" onClick={handleSelectCours}>Cours</button>
            <button className="modal-button tp" onClick={handleSelectTP}>TP</button>
          </div>
        </div>
      </Modal>

      {/* Affichage conditionnel du contenu */}
      {viewMode === 'cours' && (
        <div className="content-section">
          <h1 className="matiere-title">{currentMatiere.name}</h1>
          {/* Ici on mettra les boutons pour les sections (Programme, Cours, etc.) */}
          <div className="section-content">
            <Accordion data={programme} />
          </div>
          {/* On ajoutera les autres sections ici */}
        </div>
      )}

      {viewMode === 'tp' && (
        <div className="content-section">
          <h1 className="matiere-title">{currentMatiere.name} - Travaux Pratiques</h1>
          <p className="placeholder-text">La section des TP est en cours de construction. Revenez bientôt !</p>
          {/* On affichera les cartes circulaires des TP ici */}
        </div>
      )}
    </div>
  );
};

export default MatierePage;