import React from 'react';
import './Accordion.css';

// Ce composant interne gère un seul élément de l'accordéon (un chapitre)
const AccordionItem = ({ titre, lecons, isOpen, onClick }) => {
  const handleLeconClick = (lecon) => {
    // Ici, on mettra la logique pour afficher le contenu du cours
    alert(`Affichage de la leçon : "${lecon}". Contenu à venir.`);
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

// Ce composant principal gère toute la liste des chapitres
const Accordion = ({ data }) => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const handleItemClick = (index) => {
    // Si on clique sur le chapitre déjà ouvert, on le ferme. Sinon, on ouvre le nouveau.
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