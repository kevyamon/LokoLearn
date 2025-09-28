import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigateBackButton.css';

const NavigateBackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="back-button">
      &#x2190; Retour
    </button>
  );
};

export default NavigateBackButton;