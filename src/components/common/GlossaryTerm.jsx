import React from 'react';
import { glossaryData } from '../../data/glossaryData';
import './GlossaryTerm.css';

const GlossaryTerm = ({ term }) => {
  // On cherche la définition dans nos données (en ignorant la casse)
  const definition = glossaryData[term.toLowerCase()];

  // Si le mot n'est pas dans le glossaire, on l'affiche simplement
  if (!definition) {
    return <span>{term}</span>;
  }

  return (
    <span className="glossary-term">
      {term}
      <span className="tooltip">{definition}</span>
    </span>
  );
};

export default GlossaryTerm;