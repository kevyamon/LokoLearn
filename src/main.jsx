import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ModalProvider } from './contexts/ModalContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx'; // 1. Importer
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envelopper avec le ThemeProvider */}
    <ThemeProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>,
);