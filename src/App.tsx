import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import CalendlyGate from './components/CalendlyGate';
import CalendlyCleanup from './components/CalendlyCleanup';
import CookiebotSuppressor from './components/CookiebotSuppressor';
import ErrorBoundary from './components/ErrorBoundary';
import Notification from './components/Notification';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Assessment from './pages/Assessment';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Education from './pages/Education';
import SymptomTracker from './pages/SymptomTracker';
import Professionals from './pages/Professionals';
import Community from './pages/Community';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Pricing from './pages/Pricing';

// Artículos educativos
import ConsejosGeneralesMenopausia from './pages/articles/ConsejosGeneralesMenopausia';
import MenopausiaYNutricionVideo from './pages/articles/MenopausiaYNutricionVideo';
import GuiaSobreLaMenopausia from './pages/articles/GuiaSobreLaMenopausia';
import SintomasMenopausia from './pages/articles/SintomasMenopausia';
import TerapiaHormonalSustitutiva from './pages/articles/TerapiaHormonalSustitutiva';
import AlimentosMenopausia from './pages/articles/AlimentosMenopausia';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-pink-50">
          <Header />
          <CalendlyCleanup />
          <CookiebotSuppressor />
          <main className="flex-grow container mx-auto px-4 py-8 pb-24 md:pb-8">
            <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/register" element={<Register />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              
              {/* Rutas de artículos educativos */}
              <Route path="/education/consejos-generales" element={<ConsejosGeneralesMenopausia />} />
              <Route path="/education/menopausia-y-nutricion-video" element={<MenopausiaYNutricionVideo />} />
              <Route path="/education/guia-sobre-la-menopausia" element={<GuiaSobreLaMenopausia />} />
              <Route path="/education/sintomas-menopausia" element={<SintomasMenopausia />} />
              <Route path="/education/terapia-hormonal-sustitutiva" element={<TerapiaHormonalSustitutiva />} />
              <Route path="/education/alimentos-menopausia" element={<AlimentosMenopausia />} />
              
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/education" element={
                <PrivateRoute>
                  <Education />
                </PrivateRoute>
              } />
              <Route path="/symptom-tracker" element={
                <PrivateRoute>
                  <SymptomTracker />
                </PrivateRoute>
              } />
              <Route path="/professionals" element={
                <PrivateRoute>
                  <CalendlyGate><Professionals /></CalendlyGate>
                </PrivateRoute>
              } />
              <Route path="/community" element={
                <PrivateRoute>
                  <Community />
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              } />
              <Route path="/admin" element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } />
            </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
          <Notification />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;