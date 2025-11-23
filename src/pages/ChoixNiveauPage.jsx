// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/ChoixNiveauPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigateBackButton from '../components/common/NavigateBackButton';
import './ChoixNiveauPage.css';

const ChoixNiveauPage = () => {
  const navigate = useNavigate();
  const filiereName = localStorage.getItem('selectedFiliereName');
  const filiereType = localStorage.getItem('selectedFiliereType') || 'BTS';

  // Codes explicites pour éviter la confusion LMD1
  const niveaux = filiereType === 'BTS' 
    ? [
        { label: "1ère Année", value: "BTS1", styleClass: "bts-1" },
        { label: "2ème Année", value: "BTS2", styleClass: "bts-2" }
      ]
    : [
        { label: "Licence 1", value: "L1", styleClass: "lmd-l1" },
        { label: "Licence 2", value: "L2", styleClass: "lmd-l2" },
        { label: "Licence 3", value: "L3", styleClass: "lmd-l3" },
        { label: "Master 1", value: "M1", styleClass: "lmd-m1" },
        { label: "Master 2", value: "M2", styleClass: "lmd-m2" }
      ];

  const handleNiveauClick = (valeur) => {
    // On envoie le code précis (L1, M1...) dans l'URL
    navigate(`/matieres/${valeur}`); 
  };

  return (
    <div className="choix-niveau-container">
      <div className="niveau-header">
        <NavigateBackButton />
        <div style={{ textAlign: 'center' }}>
            <h1 className="choix-niveau-title">Votre Niveau</h1>
            <span className="filiere-badge">{filiereName}</span>
        </div>
      </div>

      <div className="niveaux-grid">
        {niveaux.map((niveau) => (
          <button 
            key={niveau.value}
            className={`niveau-button ${niveau.styleClass}`}
            onClick={() => handleNiveauClick(niveau.value)}
          >
            {niveau.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChoixNiveauPage;