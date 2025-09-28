import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.css';

// Fonction pour mettre en majuscule la première lettre
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Breadcrumbs = () => {
  const location = useLocation();
  // On découpe l'URL en segments (ex: /choix-filiere -> ["", "choix-filiere"])
  const pathnames = location.pathname.split('/').filter((x) => x);

  // On n'affiche rien sur la page d'accueil
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="breadcrumbs-container">
      <Link to="/">Accueil</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        // On crée un nom plus lisible pour chaque segment
        let name = value.replace(/-/g, ' ');
        if (name === 'matieres') name = 'Matières';
        // On pourrait ajouter d'autres remplacements ici si besoin

        return isLast ? (
          <span key={to}> / {capitalize(name)}</span>
        ) : (
          <Link key={to} to={to}>
            {' '}
            / {capitalize(name)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;