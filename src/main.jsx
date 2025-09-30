import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ModalProvider } from './contexts/ModalContext.jsx';
import { SearchProvider } from './contexts/SearchContext.jsx';
import { SocketProvider } from './contexts/SocketContext.jsx'; // 1. Ajout de l'import
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider> {/* 2. On enveloppe les providers existants */}
      <SearchProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </SearchProvider>
    </SocketProvider>
  </React.StrictMode>,
);

// 3. Votre script pour le loader est conservé intact
const loader = document.getElementById('loader-wrapper');
if (loader) {
  // On attend un peu pour que l'effet ne soit pas trop rapide
  setTimeout(() => {
    loader.classList.add('fade-out');
    // On supprime complètement l'élément après la transition pour nettoyer
    loader.addEventListener('transitionend', () => loader.remove());
  }, 1000); // Garde le loader visible pendant au moins 1 seconde
}