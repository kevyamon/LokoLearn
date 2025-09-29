import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChoixFormationPage from './pages/ChoixFormationPage';
import ChoixFilierePage from './pages/ChoixFilierePage';
import ChoixNiveauPage from './pages/ChoixNiveauPage';
import ChoixMatierePage from './pages/ChoixMatierePage';
import MatierePage from './pages/MatierePage';
import LeconPage from './pages/LeconPage';
import TpListPage from './pages/TpListPage';
import TpDetailPage from './pages/TpDetailPage'; // 1. Importer la nouvelle page
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import Breadcrumbs from './components/common/Breadcrumbs';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const backgroundClass = location.pathname === '/' ? 'landing-background' : 'app-background';

  return (
    <div className={backgroundClass}>
      <Header />
      <Breadcrumbs />
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
          <Route path="/lecon/:annee/:matiereSlug/:chapitreIndex/:leconIndex" element={<LeconPage />} />
          <Route path="/tp/:annee/:matiereSlug" element={<TpListPage />} />
          {/* 2. Ajouter la nouvelle route pour le détail d'un TP */}
          <Route path="/tp/:annee/:matiereSlug/:tpId" element={<TpDetailPage />} />
        </Routes>
      </PageWrapper>
      <ScrollToTopButton />
    </Router>
  );
}

export default App;