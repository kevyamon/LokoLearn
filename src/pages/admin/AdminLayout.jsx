// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/pages/admin/AdminLayout.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  // CORRECTION CRITIQUE : On cherche 'adminInfo', pas 'userInfo'
  const adminInfoString = localStorage.getItem('adminInfo');
  const adminInfo = adminInfoString ? JSON.parse(adminInfoString) : null;

  // Vérification du rôle
  // On s'assure que l'utilisateur existe ET qu'il a le rôle 'admin'
  if (!adminInfo || adminInfo.role !== 'admin') {
    // Si ce n'est pas un admin, on le renvoie à l'accueil (ou on pourrait ouvrir le modal)
    return <Navigate to="/" replace />;
  }

  // Si c'est un vrai admin, on le laisse entrer
  return <Outlet />;
};

export default AdminLayout;