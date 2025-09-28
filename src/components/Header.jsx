import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigateBackButton from './common/NavigateBackButton';
// On retire l'import de ThemeSwitcher
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          {!isHomePage && <NavigateBackButton />}
        </div>
        <h1 className="header-title">LokoLearn</h1>
        <div className="header-right">
          {/* On retire le composant ThemeSwitcher */}
          <img src={logo} alt="LokoLearn Logo" className="header-logo" /> 
        </div>
      </div>
    </header>
  );
};

export default Header;