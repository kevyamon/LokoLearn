import React from 'react';
import { useParams } from 'react-router-dom';
import { matieres } from '../data/matieresData';
import MatiereCard from '../components/MatiereCard';
import './ChoixMatierePage.css';

const ChoixMatierePage = () => {
  // On récupère le paramètre 'annee' de l'URL
  const { annee } = useParams();
  const anneeNum = parseInt(annee, 10);

  // On filtre les matières pour ne garder que celles de l'année sélectionnée
  const matieresFiltrees = matieres.filter(m => m.year.includes(anneeNum));

  return (
    <div className="choix-matiere-container">
      <h1 className="choix-matiere-title">
        Matières de {anneeNum === 1 ? '1ère' : '2ème'} Année
      </h1>
      <div className="matiere-grid">
        {matieresFiltrees.map((matiere, index) => (
          <MatiereCard 
            key={index}
            name={matiere.name}
            hasTP={matiere.hasTP}
          />
        ))}
      </div>
    </div>
  );
};

export default ChoixMatierePage;