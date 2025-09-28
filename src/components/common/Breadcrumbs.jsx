import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.css';

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="breadcrumbs-container">
      {/* Le seul élément cliquable sera toujours "Accueil" */}
      <Link to="/">Accueil</Link>

      {/* Les autres éléments sont de simples textes */}
      {pathnames.map((value) => {
        // On nettoie le nom pour l'affichage
        let name = decodeURIComponent(value.replace(/-/g, ' '));

        // On ignore les segments purement techniques (chiffres, mots-clés de route)
        if (!isNaN(value) || name === 'matiere' || name === 'lecon') {
          return null;
        }

        return <span key={name} className="breadcrumb-segment"> / {capitalize(name)}</span>;
      })}
    </nav>
  );
};

export default Breadcrumbs;