import React from 'react';
import { useParams } from 'react-router-dom';
import { tpData } from '../data/tpData';
import TpSection from '../components/layout/TpSection';
import './TpDetailPage.css';

const TpDetailPage = () => {
  const { annee, matiereSlug, tpId } = useParams();
  const tps = tpData[`${matiereSlug}-${annee}`] || [];
  const tp = tps.find(t => t.id === parseInt(tpId));

  if (!tp) {
    return <div className="tp-detail-container">TP non trouvé.</div>;
  }

  return (
    <div className="tp-detail-container">
      <div className="tp-detail-content">
        <h1 className="tp-detail-title">{tp.title}: {tp.description}</h1>
        
        <TpSection title="But du TP">
          <p>Le contenu de cette section est en cours de rédaction.</p>
        </TpSection>

        <TpSection title="Matériel et Réactifs">
          <p>La liste complète du matériel et des réactifs nécessaires sera détaillée ici.</p>
        </TpSection>
        
        <TpSection title="Protocole Expérimental">
          <p>Les étapes de la manipulation seront décrites précisément dans cette section.</p>
          <ul>
            <li>Étape 1: ...</li>
            <li>Étape 2: ...</li>
            <li>Étape 3: ...</li>
          </ul>
        </TpSection>

        <TpSection title="Consignes de Sécurité">
          <p>Les consignes de sécurité spécifiques à ce TP (port de blouse, gants, lunettes...) seront rappelées ici.</p>
        </TpSection>
      </div>
    </div>
  );
};

export default TpDetailPage;