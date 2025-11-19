import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // On importe notre service API unifié
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1); 
  const [mode, setMode] = useState('login'); 
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
      // Avec api.js, on ne met que la fin de l'URL. 
      // Axios gère le domaine (http://.../api/...) automatiquement.
      const { data } = await api.post('/api/users/check', { matricule });

      if (data.exists) {
        setMode('login');
      } else {
        setMode('register');
      }
      setStep(2);

    } catch (err) {
      console.error(err);
      // Axios renvoie l'erreur dans err.response.data.message
      setError(err.response?.data?.message || "Erreur de connexion au serveur");
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
      const { data } = await api.post(endpoint, { matricule, password });

      // Succès : Axios ne lance pas d'exception si le statut est 200/201
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/etudiant/dashboard');

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur d'authentification");
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
                style={{ textAlign: 'center' }} 
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