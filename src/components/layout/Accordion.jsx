import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 1. Importer les hooks
import './Accordion.css';

// On passe l'index du chapitre en prop
const AccordionItem = ({ titre, lecons, isOpen, onClick, chapitreIndex }) => {
  const navigate = useNavigate();
  const { annee, matiereSlug } = useParams(); // 2. On récupère les infos de l'URL

  const handleLeconClick = (leconIndex) => {
    // 3. On navigue vers la page de la leçon avec toutes les infos
    navigate(`/lecon/${annee}/${matiereSlug}/${chapitreIndex}/${leconIndex}`);
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
              <li key={index} onClick={() => handleLeconClick(index)}>
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
          chapitreIndex={index} // 4. On passe l'index du chapitre
        />
      ))}
    </div>
  );
};

export default Accordion;