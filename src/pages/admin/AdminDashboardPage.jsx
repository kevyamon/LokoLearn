import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Tableau de Bord</h1>
      <div className="admin-grid">
        <Link to="/admin/banner" className="admin-card">
          <h3>Gérer la Bannière</h3>
          <p>Ajouter, modifier ou supprimer les images de la bannière d'accueil.</p>
        </Link>
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
    </div>
  );
};

export default AdminDashboardPage;