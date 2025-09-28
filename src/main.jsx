import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ModalProvider } from './contexts/ModalContext.jsx';
// On ne supprime que la ligne concernant ThemeProvider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* On retire l'enveloppe ThemeProvider */}
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
);