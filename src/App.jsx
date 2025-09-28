import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChoixFormationPage from './pages/ChoixFormationPage';
import ChoixFilierePage from './pages/ChoixFilierePage';
import ChoixNiveauPage from './pages/ChoixNiveauPage';
import ChoixMatierePage from './pages/ChoixMatierePage'; // Importer la nouvelle page
import Header from './components/Header';
import Footer from './components/Footer';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const backgroundClass = location.pathname === '/' ? 'landing-background' : 'app-background';

  return (
    <div className={backgroundClass}>
      <Header />
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
          {/* La nouvelle route avec un paramètre :annee */}
          <Route path="/matieres/:annee" element={<ChoixMatierePage />} /> 
        </Routes>
      </PageWrapper>
    </Router>
  );
}

export default App;