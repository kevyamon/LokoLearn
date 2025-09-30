import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import NavigateBackButton from './common/NavigateBackButton';
import SearchButton from './search/SearchButton';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';

  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          {/* On cache le bouton retour aussi sur la page de login */}
          {!isHomePage && !isLoginPage && <NavigateBackButton />}
        </div>
        <h1 className="header-title">LokoLearn</h1>
        <div className="header-right">
          {/* On cache la recherche sur la page de login et l'accueil */}
          {!isHomePage && !isLoginPage && <SearchButton />}
          
          {userInfo && userInfo.isAdmin && !isHomePage && !isLoginPage && (
            <Link to="/admin" className="admin-button">
              <span role="img" aria-label="Admin">👑</span>
              Administration
            </Link>
          )}

          {/* On transforme le logo en lien */}
          <Link to="/" className="logo-link">
            <img src={logo} alt="LokoLearn Logo" className="header-logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;