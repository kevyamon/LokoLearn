// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useConfirm } from '../contexts/ConfirmContext'; // IMPORT DU HOOK
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { alertInfo } = useConfirm(); // On récupère la fonction d'alerte
  
  const [step, setStep] = useState(1); 
  const [mode, setMode] = useState('login'); 
  const [matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ÉTAPE 1 : VÉRIFICATION DU MATRICULE
  const handleCheckMatricule = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post('/api/users/check', { matricule });

      if (data.exists) {
        setMode('login');
      } else {
        setMode('register');
      }
      setStep(2);

    } catch (err) {
      console.error(err);
      // ERREUR JOLIE
      alertInfo(
        "Erreur", 
        err.response?.data?.message || "Erreur de connexion au serveur", 
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ÉTAPE 2 : CONNEXION OU CRÉATION
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = mode === 'login' ? '/api/users/login' : '/api/users/register';

    try {
      const { data } = await api.post(endpoint, { matricule, password });

      // Succès : On sauvegarde
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // MESSAGE DE SUCCÈS AVANT REDIRECTION
      await alertInfo(
        "Bienvenue !", 
        `Connexion réussie. Heureux de vous revoir, ${data.matricule}.`, 
        "success"
      );

      navigate('/etudiant/dashboard');

    } catch (err) {
      console.error(err);
      // ERREUR JOLIE
      alertInfo(
        "Échec de connexion", 
        err.response?.data?.message || "Identifiants incorrects", 
        "error"
      );
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
              {/* Plus besoin de <p className="error-message"> */}
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
              
              <button type="submit" disabled={loading}>
                {loading ? "Chargement..." : (mode === 'login' ? "Se connecter" : "Activer")}
              </button>

              <button 
                type="button" 
                className="btn-back" 
                onClick={() => { setStep(1); setPassword(''); }}
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