// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import logo from '../assets/Logo.png';
import './Header.css';
import Sidebar from './Sidebar';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* CORRECTION : 'app-header' au lieu de 'header' pour correspondre au CSS */}
      <header className="app-header">
        {/* CORRECTION : 'header-content' au lieu de 'header-container' */}
        <div className="header-content">
          
          <div className="menu-burger">
             <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: '#fff' }}>
               <Menu fontSize="large" />
             </IconButton>
          </div>

          <Link to="/" className="logo-link">
            {/* CORRECTION : 'header-logo' au lieu de 'logo' pour limiter la taille */}
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