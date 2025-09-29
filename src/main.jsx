import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ModalProvider } from './contexts/ModalContext.jsx';
import { SearchProvider } from './contexts/SearchContext.jsx'; // 1. Importer
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider> {/* 2. Envelopper */}
      <ModalProvider>
        <App />
      </ModalProvider>
    </SearchProvider>
  </React.StrictMode>,
);