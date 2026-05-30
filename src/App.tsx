import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import { Login, Signup } from './pages/Auth';
import { DashboardLayout } from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import { SignalsPage, MarketPage, AcademyPage, SettingsPage, AboutPage, InnerCirclePage } from './pages/SubPages';
import { CustomCursor } from './components/Primitives';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <div className="noise-overlay">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/signals" element={<SignalsPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="/circle" element={<InnerCirclePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Landing />} />
        </Routes>
        <CustomCursor />
      </div>
    </BrowserRouter>
  );
}
