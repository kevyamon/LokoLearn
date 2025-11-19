// src/pages/student/StudentDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School, Book, Logout, Person } from '@mui/icons-material';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || { matricule: 'Étudiant' };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <div className="student-dashboard-container">
      
      {/* EN-TÊTE PROFIL */}
      <div className="student-header">
        <div className="student-avatar-container">
            <Person className="student-avatar-icon" />
        </div>
        <h1 className="student-welcome">Bienvenue, {userInfo.matricule}</h1>
        <p className="student-subtitle">Votre espace d'apprentissage LokoLearn</p>
      </div>

      {/* GRILLE DE NAVIGATION */}
      <div className="student-grid">
        
        {/* Carte 1 : Accès Cours (Active) */}
        <div 
          className="student-card"
          onClick={() => navigate('/choix-formation')}
        >
          <div className="card-icon-bg">
            <School className="card-icon" />
          </div>
          <h3>Consulter les Cours</h3>
          <p>Accédez à vos formations, TPs et supports de cours.</p>
        </div>

        {/* Carte 2 : Favoris (Bientôt disponible / Désactivée) */}
        <div className="student-card disabled">
            <div className="card-icon-bg">
              <Book className="card-icon" />
            </div>
            <h3>Mes Favoris</h3>
            <p>Bientôt disponible : sauvegardez vos cours préférés.</p>
        </div>

      </div>

      {/* PIED DE PAGE */}
      <div className="logout-container">
        <button onClick={handleLogout} className="btn-logout">
            <Logout fontSize="small" /> Se déconnecter
        </button>
      </div>

    </div>
  );
};

export default StudentDashboard;