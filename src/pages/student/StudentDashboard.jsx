// src/pages/student/StudentDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School, Book, Logout, Person } from '@mui/icons-material';
import './StudentDashboard.css'; // On réutilise le style global ou on en crée un

const StudentDashboard = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || { matricule: 'Étudiant' };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <div className="app-container" style={{ paddingTop: '100px', paddingBottom: '50px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ 
            width: '80px', height: '80px', background: '#fff', borderRadius: '50%', 
            margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
            <Person style={{ fontSize: '40px', color: '#3f51b5' }} />
        </div>
        <h1 style={{ color: '#fff', marginBottom: '10px' }}>Bienvenue, {userInfo.matricule}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>Votre espace d'apprentissage LokoLearn</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '0 20px' }}>
        
        {/* Carte Accès Cours */}
        <div 
          onClick={() => navigate('/choix-formation')}
          style={{ 
            background: 'white', padding: '30px', borderRadius: '20px', 
            cursor: 'pointer', transition: 'transform 0.2s',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ background: '#e8eaf6', padding: '15px', borderRadius: '50%', marginBottom: '15px' }}>
            <School style={{ fontSize: '30px', color: '#3f51b5' }} />
          </div>
          <h3 style={{ margin: '0 0 10px', color: '#333' }}>Consulter les Cours</h3>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Accédez à vos formations, TPs et supports de cours.</p>
        </div>

        {/* Carte Futur (Favoris, Notes...) */}
        <div 
            style={{ 
            background: 'white', padding: '30px', borderRadius: '20px', 
            opacity: 0.7, cursor: 'not-allowed',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
            }}
        >
            <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '50%', marginBottom: '15px' }}>
            <Book style={{ fontSize: '30px', color: '#999' }} />
            </div>
            <h3 style={{ margin: '0 0 10px', color: '#999' }}>Mes Favoris</h3>
            <p style={{ color: '#999', fontSize: '0.9rem' }}>Bientôt disponible : sauvegardez vos cours préférés.</p>
        </div>

      </div>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button 
            onClick={handleLogout}
            style={{ 
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', 
                color: 'white', padding: '10px 30px', borderRadius: '30px', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '10px'
            }}
        >
            <Logout fontSize="small" /> Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;