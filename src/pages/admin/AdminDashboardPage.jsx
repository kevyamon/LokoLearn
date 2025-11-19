// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/admin/AdminDashboardPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vraiment quitter l'espace administrateur ?")) {
      localStorage.removeItem('adminInfo'); // On détruit le badge
      navigate('/'); // Retour maison
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Tableau de Bord</h1>
      
      <div className="admin-grid">
        {/* Carte Bannière (Active) */}
        <Link to="/admin/banner" className="admin-card">
          <h3>Gérer la Bannière</h3>
          <p>Ajouter, modifier ou supprimer les images de la bannière d'accueil.</p>
        </Link>

        {/* Cartes Futures (Désactivées) */}
        <div className="admin-card disabled">
          <h3>Gérer les Filières</h3>
          <p>Fonctionnalité à venir...</p>
        </div>
        <div className="admin-card disabled">
          <h3>Gérer les Matières</h3>
          <p>Fonctionnalité à venir...</p>
        </div>
        <div className="admin-card disabled">
          <h3>Ajouter un Cours</h3>
          <p>Fonctionnalité à venir...</p>
        </div>
      </div>

      {/* BOUTON QUITTER */}
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <button 
          onClick={handleLogout}
          style={{
            padding: '12px 30px',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 15px rgba(211, 47, 47, 0.4)'
          }}
        >
          <Logout fontSize="small" /> Quitter l'espace Admin
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardPage;