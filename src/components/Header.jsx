// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import logo from '../assets/Logo.png';
import './Header.css';
import Sidebar from './Sidebar'; // Assure-toi que src/components/Sidebar.jsx existe bien !

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Menu Burger */}
          <div className="menu-burger">
             <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: '#333' }}>
               <Menu fontSize="large" />
             </IconButton>
          </div>

          <Link to="/" className="logo-link">
            <img src={logo} alt="LokoLearn Logo" className="logo" />
            <span className="logo-text">LokoLearn</span>
          </Link>

          {/* Espace vide pour équilibrer ou navigation desktop future */}
          <div style={{ width: '48px' }} className="desktop-nav-placeholder"></div>
        </div>
      </header>

      {/* Integration de la Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;