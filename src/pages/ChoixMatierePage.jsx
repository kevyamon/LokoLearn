import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { matieres } from '../data/matieresData';
import MatiereCard from '../components/MatiereCard';
import SkeletonLoader from '../components/common/SkeletonLoader'; // 1. Importer
import './ChoixMatierePage.css';

const ChoixMatierePage = () => {
  const { annee } = useParams();
  const anneeNum = parseInt(annee, 10);

  const [isLoading, setIsLoading] = useState(true); // 2. État de chargement
  const [matieresFiltrees, setMatieresFiltrees] = useState([]);

  useEffect(() => {
    // 3. Simuler le chargement et le filtrage des matières
    const timer = setTimeout(() => {
      const filtered = matieres.filter(m => m.year.includes(anneeNum));
      setMatieresFiltrees(filtered);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [anneeNum]);

  return (
    <div className="choix-matiere-container">
      <h1 className="choix-matiere-title">
        Matières de {anneeNum === 1 ? '1ère' : '2ème'} Année
      </h1>
      <div className="matiere-grid">
        {/* 4. Affichage conditionnel */}
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : (
          matieresFiltrees.map((matiere, index) => (
            <MatiereCard 
              key={index}
              name={matiere.name}
              hasTP={matiere.hasTP}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChoixMatierePage;