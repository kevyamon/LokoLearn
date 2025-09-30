import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import NavigateBackButton from './common/NavigateBackButton';
import SearchButton from './search/SearchButton';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          {!isLoginPage && <NavigateBackButton />}
        </div>
        <h1 className="header-title">LokoLearn</h1>
        <div className="header-right">
          {!isLoginPage && <SearchButton />}
          {/* Affiche le bouton Admin seulement si on n'est PAS sur la page de connexion ET que l'utilisateur est admin */}
          {userInfo && userInfo.isAdmin && !isLoginPage && (
            <Link to="/admin" className="admin-button">
              <span role="img" aria-label="Admin">👑</span>
              Administration
            </Link>
          )}
          <img src={logo} alt="LokoLearn Logo" className="header-logo" /> 
        </div>
      </div>
    </header>
  );
};

export default Header;