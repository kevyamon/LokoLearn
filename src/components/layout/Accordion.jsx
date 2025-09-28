import React from 'react';
import { useModal } from '../../contexts/ModalContext'; // 1. Importer
import './Accordion.css';

const AccordionItem = ({ titre, lecons, isOpen, onClick }) => {
  const { showModal } = useModal(); // 2. Récupérer la fonction

  const handleLeconClick = (lecon) => {
    // 3. Remplacer l'alerte
    showModal(
      "Contenu à venir",
      `Le contenu détaillé de la leçon "${lecon}" est en cours de rédaction.`
    );
  };

  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={onClick}>
        <span>{titre}</span>
        <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>&#x25B8;</span>
      </button>
      {isOpen && (
        <div className="accordion-content">
          <ul>
            {lecons.map((lecon, index) => (
              <li key={index} onClick={() => handleLeconClick(lecon)}>
                {lecon}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Accordion = ({ data }) => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion-container">
      <h2>{data.titre}</h2>
      {data.chapitres.map((chapitre, index) => (
        <AccordionItem
          key={index}
          titre={chapitre.titre}
          lecons={chapitre.lecons}
          isOpen={openIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;