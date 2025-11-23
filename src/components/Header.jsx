// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate ajouté
import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import logo from '../assets/Logo.png';
import './Header.css';
import Sidebar from './Sidebar';
import { authService } from '../services/authService'; // Import du service d'auth

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // FONCTION INTELLIGENTE POUR LE LOGO
  const handleLogoClick = (e) => {
    e.preventDefault(); // On empêche le lien normal de fonctionner
    
    const session = authService.checkSession();

    if (session && session.valid) {
      // Si connecté, on redirige vers le bon dashboard
      if (session.role === 'student') navigate('/etudiant/dashboard');
      else if (session.role === 'professor') navigate('/prof/dashboard');
      else if (session.role === 'admin') navigate('/admin');
    } else {
      // Si pas connecté, retour à l'accueil public
      navigate('/');
    }
  };

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          
          <div className="menu-burger">
             <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: '#fff' }}>
               <Menu fontSize="large" />
             </IconButton>
          </div>

          {/* On garde le style du Link mais on change le comportement au clic */}
          <Link to="/" className="logo-link" onClick={handleLogoClick}>
            <img src={logo} alt="LokoLearn Logo" className="header-logo" />
            <span className="logo-text">LokoLearn</span>
          </Link>

          <div style={{ width: '48px' }} className="desktop-nav-placeholder"></div>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;