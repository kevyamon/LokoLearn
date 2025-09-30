import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ModalProvider } from './contexts/ModalContext.jsx';
import { SearchProvider } from './contexts/SearchContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </SearchProvider>
  </React.StrictMode>,
);

// On ajoute ce script à la fin
const loader = document.getElementById('loader-wrapper');
if (loader) {
  // On attend un peu pour que l'effet ne soit pas trop rapide
  setTimeout(() => {
    loader.classList.add('fade-out');
    // On supprime complètement l'élément après la transition pour nettoyer
    loader.addEventListener('transitionend', () => loader.remove());
  }, 1000); // Garde le loader visible pendant au moins 1 seconde
}