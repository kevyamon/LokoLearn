// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // On garde ton CSS existant

const LoginPage = () => {
  const navigate = useNavigate();
  
  // États
  const [step, setStep] = useState(1); // 1: Matricule, 2: Mot de passe
  const [mode, setMode] = useState('login'); // 'login' ou 'register'
  const [matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ÉTAPE 1 : VÉRIFICATION DU MATRICULE
  const handleCheckMatricule = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricule }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erreur de vérification");

      if (data.exists) {
        setMode('login'); // Il existe -> Connexion
      } else {
        setMode('register'); // Il n'existe pas -> Création
      }
      setStep(2); // On passe à l'étape suivante

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ÉTAPE 2 : CONNEXION OU CRÉATION
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = mode === 'login' ? '/api/users/login' : '/api/users/register';

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricule, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erreur d'authentification");

      // Succès ! On sauvegarde et on redirige
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Redirection vers le nouvel Espace Étudiant
      navigate('/etudiant/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{step === 1 ? "Identification" : (mode === 'login' ? "Bon retour !" : "Activation du compte")}</h2>
        
        {step === 1 && (
          <>
            <p>Entrez votre matricule étudiant pour commencer.</p>
            <p className="matricule-info">Format requis : 5 chiffres, tiret, M, 1 chiffre (ex: 12345-M1)</p>
            <form onSubmit={handleCheckMatricule}>
              <input
                type="text"
                placeholder="Ex: 10203-M1"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value.toUpperCase())}
                required
                disabled={loading}
              />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? "Vérification..." : "Continuer"}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <p>
              {mode === 'login' 
                ? `Matricule ${matricule} reconnu.` 
                : `C'est votre première connexion avec ${matricule}.`}
            </p>
            <p className="matricule-info">
              {mode === 'login' 
                ? "Entrez votre mot de passe pour accéder à vos cours." 
                : "Définissez un mot de passe pour sécuriser votre espace."}
            </p>
            
            <form onSubmit={handleFinalSubmit}>
              <input
                type="password"
                placeholder={mode === 'login' ? "Votre mot de passe" : "Créez votre mot de passe"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
              {error && <p className="error-message">{error}</p>}
              
              <button type="submit" className={mode === 'register' ? 'btn-register' : ''} disabled={loading}>
                {loading ? "Chargement..." : (mode === 'login' ? "Se connecter" : "Activer mon espace")}
              </button>

              <button 
                type="button" 
                className="btn-back" 
                onClick={() => { setStep(1); setError(''); setPassword(''); }}
                style={{ marginTop: '10px', background: 'transparent', color: '#666', border: 'none', textDecoration:'underline', cursor:'pointer' }}
              >
                Ce n'est pas moi (Retour)
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;