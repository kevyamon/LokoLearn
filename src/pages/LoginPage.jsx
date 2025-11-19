import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

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
        setMode('login');
      } else {
        setMode('register');
      }
      setStep(2);

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

      localStorage.setItem('userInfo', JSON.stringify(data));
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
        <h2>{step === 1 ? "Identification" : (mode === 'login' ? "Connexion" : "Activation")}</h2>
        
        {step === 1 && (
          <>
            {/* Texte Strict demandé */}
            <p className="matricule-info">
              Entrez votre matricule LOKO, c'est le matricule qui est sur votre carte étudiant.
            </p>
            
            <form onSubmit={handleCheckMatricule}>
              <input
                type="text"
                placeholder="Matricule" 
                value={matricule}
                onChange={(e) => setMatricule(e.target.value.toUpperCase())}
                required
                disabled={loading}
                style={{ textAlign: 'center' }} // Petit bonus esthétique pour le centrer
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
            <p style={{ marginBottom: '15px' }}>
              Pour le matricule : <strong>{matricule}</strong>
            </p>
            
            <form onSubmit={handleFinalSubmit}>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                style={{ textAlign: 'center' }}
              />
              {error && <p className="error-message">{error}</p>}
              
              <button type="submit" disabled={loading}>
                {loading ? "Chargement..." : (mode === 'login' ? "Se connecter" : "Activer")}
              </button>

              <button 
                type="button" 
                className="btn-back" 
                onClick={() => { setStep(1); setError(''); setPassword(''); }}
                style={{ marginTop: '15px', background: 'transparent', color: '#888', border: 'none', textDecoration:'underline', cursor:'pointer', fontSize: '0.9rem' }}
              >
                Retour
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;