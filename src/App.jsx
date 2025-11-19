// kevyamon/lokolearn/LokoLearn-b5c45fffcb67d272a63e66159862c5d8094c7d68/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

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
import AdminSettingsPage from './pages/admin/AdminSettingsPage'; // NOUVEL IMPORT
import ProfLayout from './pages/prof/ProfLayout';
import ProfLogin from './pages/prof/ProfLogin';
import ProfRegister from './pages/prof/ProfRegister';
import ProfDashboard from './pages/prof/ProfDashboard';
import ProfPublier from './pages/prof/ProfPublier';

// Composants Communs
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/common/Breadcrumbs';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import SearchOverlay from './components/search/SearchOverlay';

// --- LAYOUT PRINCIPAL (Contient Header + Sidebar + Footer Global) ---
const MainLayout = () => {
  return (
    <div className="app-background">
      <Header /> {/* La Sidebar est cachée ici dedans */}
      
      {/* Padding-top pour ne pas être caché par le Header fixe */}
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Breadcrumbs />
        <main style={{ flex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          <Outlet /> {/* C'est ici que les pages s'affichent */}
        </main>
      </div>
      
      <Footer /> {/* Le Footer global avec le God Mode global */}
    </div>
  );
};

function App() {
  return (
    <Router>
      <SearchOverlay />
      <Routes>
        
        {/* 1. LANDING PAGE : TOTALEMENT ISOLÉE */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. LOGIN : ISOLÉ AUSSI */}
        <Route path="/login" element={
          <div className="app-background">
            <Header />
            <div style={{ paddingTop: '80px' }}>
                <LoginPage />
            </div>
            <Footer />
          </div>
        } />

        {/* 3. APPLICATION : TOUT LE RESTE DANS LE MAIN LAYOUT */}
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

        {/* 4. SECTION ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="banner" element={<ManageBannerPage />} />
          <Route path="settings" element={<AdminSettingsPage />} /> {/* NOUVELLE ROUTE */}
        </Route>

        {/* 5. SECTION PROF */}
        <Route path="/prof/login" element={<ProfLogin />} />
        <Route path="/prof/register" element={<ProfRegister />} />
        <Route path="/prof" element={<ProfLayout />}>
          <Route path="dashboard" element={<ProfDashboard />} />
          <Route path="cours" element={<ProfDashboard />} /> {/* Placeholder */}
          <Route path="publier" element={<ProfPublier />} />
        </Route>

      </Routes>
      <ScrollToTopButton />
    </Router>
  );
}

export default App;