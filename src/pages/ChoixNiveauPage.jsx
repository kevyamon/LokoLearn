// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/ChoixNiveauPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigateBackButton from '../components/common/NavigateBackButton';
import './ChoixNiveauPage.css';

const ChoixNiveauPage = () => {
  const navigate = useNavigate();

  // On récupère ce qu'on a sauvegardé à l'étape précédente
  const filiereName = localStorage.getItem('selectedFiliereName');
  const filiereType = localStorage.getItem('selectedFiliereType') || 'BTS'; // Par défaut BTS si bug

  // Définition des niveaux selon le cycle
  const niveaux = filiereType === 'BTS' 
    ? [
        { label: "1ère Année", value: "1", styleClass: "bts-1" },
        { label: "2ème Année", value: "2", styleClass: "bts-2" }
      ]
    : [
        { label: "Licence 1", value: "1", styleClass: "lmd-l1" },
        { label: "Licence 2", value: "2", styleClass: "lmd-l2" },
        { label: "Licence 3", value: "3", styleClass: "lmd-l3" },
        { label: "Master 1", value: "1", styleClass: "lmd-m1" }, // Note: L'URL sera matieres/1 mais le contexte sera M1 via le type
        { label: "Master 2", value: "2", styleClass: "lmd-m2" }
      ];

  const handleNiveauClick = (valeur) => {
    // On navigue vers la page des matières
    // Note : Pour LMD Master, on envoie quand même 1 ou 2, mais ChoixMatierePage saura distinguer grâce au filiereType
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
            key={niveau.label}
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