import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import './Accordion.css';

const AccordionItem = ({ titre, lecons, isOpen, onClick, chapitreIndex }) => {
  const navigate = useNavigate();
  const { annee, matiereSlug } = useParams();
  const { isCompleted } = useProgress();

  const handleLeconClick = (leconIndex) => {
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
            {lecons.map((lecon, index) => {
              // On recrée le même ID unique pour vérifier s'il est complété
              const lessonId = `lecon-${annee}-${matiereSlug}-${chapitreIndex}-${index}`;
              const completed = isCompleted(lessonId);
              return (
                <li key={index} onClick={() => handleLeconClick(index)}>
                  {lecon}
                  {/* Si la leçon est complétée, on affiche l'icône */}
                  {completed && <span className="completion-check">✔️</span>}
                </li>
              );
            })}
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
          chapitreIndex={index}
        />
      ))}
    </div>
  );
};

export default Accordion;