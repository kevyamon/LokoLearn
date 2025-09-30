import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../hooks/useSound';
import './LoginPage.css';

const LoginPage = () => {
  const [matricule, setMatricule] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { playClickSound } = useSound();

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClickSound();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricule }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/choix-formation');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Connexion</h2>
        <p>Veuillez entrer votre matricule pour accéder à la plateforme.</p>
        {/* On ajoute le nouveau texte ici */}
        <p className="matricule-info">C'est le matricule se trouvant sur votre carte d'étudiant.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            // On retire le long placeholder
            placeholder="Matricule..."
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Entrer</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;