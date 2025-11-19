// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Pages Étudiant & Publiques
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
  
  // DÉTECTION : Est-ce qu'on est sur la page d'accueil ?
  const isLandingPage = location.pathname === '/';
  
  // Pages spéciales sans layout standard (Admin, Prof)
  const isSpecialPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/prof');
  
  // On masque le fil d'ariane sur certaines pages
  const noBreadcrumbs = isLandingPage || location.pathname === '/login' || isSpecialPage || location.pathname === '/etudiant/dashboard';

  // CAS 1 : Routes Admin/Prof (Layouts dédiés gérés par leurs composants parents)
  if (isSpecialPage) {
    return <>{children}</>;
  }

  // CAS 2 : Landing Page (Plein écran, pas de Header/Footer global pour éviter les doublons/conflits)
  if (isLandingPage) {
    return <>{children}</>;
  }

  // CAS 3 : Application Standard (Étudiant/Login) avec Header et Footer
  return (
    <div className="app-background">
      <Header />
      
      {/* Le padding-top n'est appliqué que ici, pas sur la Landing Page */}
      <div style={{ paddingTop: '80px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {!noBreadcrumbs && <Breadcrumbs />}
        <main style={{ flex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px', boxSizing: 'border-box' }}>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <SearchOverlay />
      <PageWrapper>
        <Routes>
          {/* Routes Publiques */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/etudiant/dashboard" element={<StudentDashboard />} />
          
          {/* Parcours Étudiant */}
          <Route path="/choix-formation" element={<ChoixFormationPage />} />
          <Route path="/choix-filiere" element={<ChoixFilierePage />} />
          <Route path="/choix-niveau" element={<ChoixNiveauPage />} />
          <Route path="/matieres/:annee" element={<ChoixMatierePage />} />
          <Route path="/matiere/:annee/:matiereSlug" element={<MatierePage />} />
          <Route path="/lecon/:annee/:matiereSlug/:chapitreIndex/:leconIndex" element={<LeconPage />} />
          <Route path="/tp/:annee/:matiereSlug" element={<TpListPage />} />
          <Route path="/tp/:annee/:matiereSlug/:tpId" element={<TpDetailPage />} />

          {/* Routes Admin */}
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