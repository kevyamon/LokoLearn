// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom';

// Contexts & Services
import { ConfirmProvider, useConfirm } from './contexts/ConfirmContext';
import { authService } from './services/authService'; // IMPORT

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import ChoixFormationPage from './pages/ChoixFormationPage';
import ChoixFilierePage from './pages/ChoixFilierePage';
import ChoixNiveauPage from './pages/ChoixNiveauPage';
import ChoixMatierePage from './pages/ChoixMatierePage';
import MatierePage from './pages/MatierePage';
import LeconPage from './pages/LeconPage';
import TpListPage from './pages/TpListPage';
import TpDetailPage from './pages/TpDetailPage';

// Admin & Prof
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageBannerPage from './pages/admin/ManageBannerPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import ProfLayout from './pages/prof/ProfLayout';
import ProfLogin from './pages/prof/ProfLogin';
import ProfRegister from './pages/prof/ProfRegister';
import ProfDashboard from './pages/prof/ProfDashboard';
import ProfPublier from './pages/prof/ProfPublier';
import ProfCourses from './pages/prof/ProfCourses';

// Composants Communs
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import SearchOverlay from './components/search/SearchOverlay';

// --- COMPOSANT GARDIEN DE SESSION ---
// C'est lui qui surveille l'expiration
const SessionGuardian = () => {
  const { alertInfo } = useConfirm();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const check = async () => {
      // On ne vérifie pas sur la landing page ou login pour éviter les boucles
      if (location.pathname === '/' || location.pathname.includes('/login')) return;

      const sessionStatus = authService.checkSession();

      if (sessionStatus && sessionStatus.expired) {
        await alertInfo(
          "Session Expirée", 
          "Par mesure de sécurité, votre session a expiré après 24h. Veuillez vous reconnecter.", 
          "info"
        );
        navigate('/');
      }
    };
    
    // Vérification au montage et à chaque changement de route important
    check();
  }, [location.pathname]); // Se déclenche quand on change de page

  return null;
};

// --- LAYOUT PRINCIPAL ---
const MainLayout = () => {
  return (
    <div className="app-background">
      <SessionGuardian /> {/* Le gardien est actif ici */}
      <Header />
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ConfirmProvider>
      <Router>
        <SearchOverlay />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Login avec Header/Footer mais isolé du MainLayout */}
          <Route path="/login" element={
            <div className="app-background">
                <Header />
                <div style={{ paddingTop: '80px' }}><LoginPage /></div>
                <Footer />
            </div>
          } />

          <Route element={<MainLayout />}>
            <Route path="/etudiant/dashboard" element={<StudentDashboard />} />
            <Route path="/choix-formation" element={<ChoixFormationPage />} />
            <Route path="/choix-filiere" element={<ChoixFilierePage />} />
            <Route path="/choix-niveau" element={<ChoixNiveauPage />} />
            <Route path="/matieres/:annee" element={<ChoixMatierePage />} />
            <Route path="/matiere/:annee/:matiereSlug" element={<MatierePage />} />
            <Route path="/lecon/:annee/:matiereSlug/:chapitreIndex/:leconIndex" element={<LeconPage />} />
            <Route path="/tp/:annee/:matiereSlug" element={<TpListPage />} />
            <Route path="/tp/:annee/:matiereSlug/:tpId" element={<TpDetailPage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="banner" element={<ManageBannerPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          <Route path="/prof/login" element={<ProfLogin />} />
          <Route path="/prof/register" element={<ProfRegister />} />
          <Route path="/prof" element={<ProfLayout />}>
            <Route path="dashboard" element={<ProfDashboard />} />
            <Route path="cours" element={<ProfCourses />} />
            <Route path="publier" element={<ProfPublier />} />
          </Route>

        </Routes>
        <ScrollToTopButton />
      </Router>
    </ConfirmProvider>
  );
}

export default App;