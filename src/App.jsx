import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChoixFormationPage from './pages/ChoixFormationPage';
import ChoixFilierePage from './pages/ChoixFilierePage';
import ChoixNiveauPage from './pages/ChoixNiveauPage';
import ChoixMatierePage from './pages/ChoixMatierePage';
import MatierePage from './pages/MatierePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import Breadcrumbs from './components/common/Breadcrumbs'; // 1. Importer le fil d'Ariane

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const backgroundClass = location.pathname === '/' ? 'landing-background' : 'app-background';

  return (
    <div className={backgroundClass}>
      <Header />
      <Breadcrumbs /> {/* 2. Ajouter le composant ici */}
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <PageWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/choix-formation" element={<ChoixFormationPage />} />
          <Route path="/choix-filiere" element={<ChoixFilierePage />} />
          <Route path="/choix-niveau" element={<ChoixNiveauPage />} />
          <Route path="/matieres/:annee" element={<ChoixMatierePage />} />
          <Route path="/matiere/:annee/:matiereSlug" element={<MatierePage />} /> 
        </Routes>
      </PageWrapper>
      <ScrollToTopButton />
    </Router>
  );
}

export default App;