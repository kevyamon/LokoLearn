// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/ChoixFormationPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChoixFormationPage.css';

const ChoixFormationPage = () => {
  const navigate = useNavigate();

  const handleFormationClick = (type) => {
    // On navigue vers la page des filières en passant le type choisi (BTS ou LMD)
    navigate('/choix-filiere', { state: { typeFormation: type } });
  };

  return (
    <div className="choix-container">
      <h1 className="choix-title">Choisissez votre parcours</h1>
      <div className="buttons-container">
        <button 
          className="choix-button bts-button"
          onClick={() => handleFormationClick('BTS')}
        >
          BTS
        </button>
        <button 
          className="choix-button lmd-button"
          onClick={() => handleFormationClick('LMD')}
        >
          LMD
        </button>
      </div>
    </div>
  );
};

export default ChoixFormationPage;