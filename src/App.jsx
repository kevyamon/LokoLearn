import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Pages Étudiant
import LandingPage from './pages/LandingPage';
import ChoixFormationPage from './pages/ChoixFormationPage';
import ChoixFilierePage from './pages/ChoixFilierePage';
import ChoixNiveauPage from './pages/ChoixNiveauPage';
import ChoixMatierePage from './pages/ChoixMatierePage';
import MatierePage from './pages/MatierePage';
import LeconPage from './pages/LeconPage';
import TpListPage from './pages/TpListPage';
import TpDetailPage from './pages/TpDetailPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';

// Composants Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageBannerPage from './pages/admin/ManageBannerPage';

// Composants Professeur
import ProfLayout from './pages/prof/ProfLayout';
import ProfLogin from './pages/prof/ProfLogin';
import ProfRegister from './pages/prof/ProfRegister';
import ProfDashboard from './pages/prof/ProfDashboard';
import ProfPublier from './pages/prof/ProfPublier';

// Composants communs
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import Breadcrumbs from './components/common/Breadcrumbs';
import SearchOverlay from './components/search/SearchOverlay';

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const backgroundClass = location.pathname === '/' ? 'landing-background' : 'app-background';
  
  // On cache le Header/Footer standard pour les pages Prof et Admin
  const isSpecialPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/prof');
  
  // Gestion des fils d'ariane (Breadcrumbs)
  const noBreadcrumbs = location.pathname === '/' || location.pathname === '/login' || isSpecialPage || location.pathname === '/etudiant/dashboard';

  if (isSpecialPage) {
    return <>{children}</>;
  }

  return (
    <div className={backgroundClass}>
      <Header />
      {!noBreadcrumbs && <Breadcrumbs />}
      <main>
        {children}
      </main>
      
      {/* CORRECTION ICI : On cache le Footer global sur la page d'accueil ('/') */}
      {/* La LandingPage possède déjà son propre footer stylisé */}
      {location.pathname !== '/' && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <SearchOverlay />
      <PageWrapper>
        <Routes>
          {/* Routes Publiques & Étudiant */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/etudiant/dashboard" element={<StudentDashboard />} />
          
          <Route path="/choix-formation" element={<ChoixFormationPage />} />
          <Route path="/choix-filiere" element={<ChoixFilierePage />} />
          <Route path="/choix-niveau" element={<ChoixNiveauPage />} />
          <Route path="/matieres/:annee" element={<ChoixMatierePage />} />
          <Route path="/matiere/:annee/:matiereSlug" element={<MatierePage />} />
          <Route path="/lecon/:annee/:matiereSlug/:chapitreIndex/:leconIndex" element={<LeconPage />} />
          <Route path="/tp/:annee/:matiereSlug" element={<TpListPage />} />
          <Route path="/tp/:annee/:matiereSlug/:tpId" element={<TpDetailPage />} />

          {/* Routes Administrateur */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="banner" element={<ManageBannerPage />} />
          </Route>

          {/* Routes Professeur */}
          <Route path="/prof/login" element={<ProfLogin />} />
          <Route path="/prof/register" element={<ProfRegister />} />
          
          <Route path="/prof" element={<ProfLayout />}>
            <Route path="dashboard" element={<ProfDashboard />} />
            <Route path="publier" element={<ProfPublier />} />
          </Route>

        </Routes>
      </PageWrapper>
      <ScrollToTopButton />
    </Router>
  );
}

export default App;