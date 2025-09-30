import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  // Si l'utilisateur n'est pas connecté ou n'est pas admin, on le renvoie à la page de connexion
  if (!userInfo || !userInfo.isAdmin) {
    return <Navigate to="/login" />;
  }

  // Si tout est bon, on affiche la page demandée (Dashboard, Gérer Bannière, etc.)
  return <Outlet />;
};

export default AdminLayout;