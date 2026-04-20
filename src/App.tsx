import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import LocationPage from '@/pages/LocationPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-luilui-cream">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/georg-schumann-141" element={<LocationPage />} />
        <Route path="/georg-schwarz-64" element={<LocationPage />} />
        <Route path="/zweinaundorfer-63" element={<LocationPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
