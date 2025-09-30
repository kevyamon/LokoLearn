import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import NavigateBackButton from './common/NavigateBackButton';
import SearchButton from './search/SearchButton';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // On lit les informations de l'utilisateur depuis le localStorage
  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          {!isHomePage && <NavigateBackButton />}
        </div>
        <h1 className="header-title">LokoLearn</h1>
        <div className="header-right">
          <SearchButton />
          {/* Affiche le bouton Admin seulement si l'utilisateur est connecté ET est admin */}
          {userInfo && userInfo.isAdmin && (
            <Link to="/admin" className="admin-button">Espace Admin</Link>
          )}
          <img src={logo} alt="LokoLearn Logo" className="header-logo" /> 
        </div>
      </div>
    </header>
  );
};

export default Header;