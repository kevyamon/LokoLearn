import React from 'react';
import { useParams } from 'react-router-dom';
import { tpData } from '../data/tpData';
import TpCard from '../components/common/TpCard';
import './TpListPage.css';

const TpListPage = () => {
  const { annee, matiereSlug } = useParams();
  const matiereName = matiereSlug.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());

  const tps = tpData[`${matiereSlug}-${annee}`] || tpData['default'];

  return (
    <div className="tp-list-container">
      <h1 className="tp-list-title">Travaux Pratiques de {matiereName}</h1>
      <div className="tp-grid">
        {tps.map((tp) => (
          <TpCard 
            key={tp.id}
            title={tp.title}
            description={tp.description}
          />
        ))}
      </div>
    </div>
  );
};

export default TpListPage;