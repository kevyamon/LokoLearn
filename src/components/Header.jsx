// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import logo from '../assets/Logo.png';
import './Header.css';
import Sidebar from './Sidebar'; // <--- Import Sidebar

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Bouton Menu (Visible sur mobile surtout) */}
          <div className="menu-burger">
             <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: '#333' }}>
               <Menu fontSize="large" />
             </IconButton>
          </div>

          <Link to="/" className="logo-link">
            <img src={logo} alt="LokoLearn Logo" className="logo" />
            <span className="logo-text">LokoLearn</span>
          </Link>

          {/* Navigation Desktop classique (optionnelle si tout est dans la sidebar) */}
          <nav className="desktop-nav">
             {/* Tu peux mettre des liens ici ou laisser vide pour ne garder que la sidebar */}
          </nav>
        </div>
      </header>

      {/* La Sidebar est intégrée ici */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;