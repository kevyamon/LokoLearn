import React, { useState, useEffect } from 'react';
import { glossaryData } from '../../data/glossaryData';
import './GlossaryTerm.css';

const GlossaryTerm = ({ term }) => {
  const [isOpen, setIsOpen] = useState(false);
  const definition = glossaryData[term.toLowerCase()];

  // Effet pour fermer la bulle si on clique ailleurs
  useEffect(() => {
    const closeTooltip = () => setIsOpen(false);
    if (isOpen) {
      // On ajoute un écouteur de clic sur toute la page
      document.addEventListener('click', closeTooltip);
    }
    // Nettoyage : on retire l'écouteur quand le composant n'est plus là ou quand la bulle se ferme
    return () => {
      document.removeEventListener('click', closeTooltip);
    };
  }, [isOpen]);

  if (!definition) {
    return <span>{term}</span>;
  }

  const handleClick = (e) => {
    e.stopPropagation(); // Empêche le clic de se propager et de fermer la bulle immédiatement
    setIsOpen(!isOpen); // Inverse l'état d'ouverture (ouvert/fermé)
  };

  return (
    <span className="glossary-term" onClick={handleClick}>
      {term}
      {/* On ajoute la classe 'visible' quand la bulle doit s'afficher */}
      <span className={`tooltip ${isOpen ? 'visible' : ''}`}>{definition}</span>
    </span>
  );
};

export default GlossaryTerm;