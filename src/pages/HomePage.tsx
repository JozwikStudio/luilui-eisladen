import { useEffect } from 'react';
import HeroSection from '@/sections/HeroSection';
import StandorteSection from '@/sections/StandorteSection';
import AboutSection from '@/sections/AboutSection';
import ProductsSection from '@/sections/ProductsSection';
import VeganSection from '@/sections/VeganSection';
import CtaSection from '@/sections/CtaSection';

export default function HomePage() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Handle hash links on load
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <main>
      <HeroSection />
      <VeganSection />
      <StandorteSection />
      <AboutSection />
      <ProductsSection />
      <CtaSection />
    </main>
  );
}
