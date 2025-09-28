import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigateBackButton from './common/NavigateBackButton';
import './Header.css';
import logo from '../assets/logo.png'; // 1. Importer le logo

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="app-header">
      <div className="header-content">
        {!isHomePage && <NavigateBackButton />}
        <h1 className="header-title">LokoLearn</h1>
        {/* 2. Ajouter l'image du logo */}
        <img src={logo} alt="LokoLearn Logo" className="header-logo" /> 
      </div>
    </header>
  );
};

export default Header;