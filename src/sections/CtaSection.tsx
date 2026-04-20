import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-h2',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        }
      );
      gsap.fromTo(
        '.cta-body',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        }
      );
      gsap.fromTo(
        '.cta-btn',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToStandorte = () => {
    const el = document.getElementById('standorte');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-20 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #4A1C45 0%, #62265C 70%)',
      }}
    >
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <h2 className="cta-h2 font-playfair text-[32px] lg:text-5xl font-bold text-white">
          Besuche uns in deiner Nähe
        </h2>

        <p className="cta-body font-inter text-base text-white/85 leading-relaxed mt-4 max-w-[560px] mx-auto">
          Ob Georg-Schumann-Straße, Georg-Schwarz-Straße oder Zweinaundorfer Straße — wir freuen 
          uns auf deinen Besuch. Komm vorbei und überzeuge dich selbst von unserem hausgemachten Eis!
        </p>

        <button
          onClick={scrollToStandorte}
          className="cta-btn mt-8 bg-white text-luilui-primary font-inter font-bold text-lg lg:text-xl px-10 py-5 lg:px-12 lg:py-5 rounded-full shadow-luilui-lg hover:bg-luilui-cream hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
        >
          Route planen
        </button>

        <p className="text-xs text-white/60 mt-4">
          3 Standorte in Leipzig · Täglich geöffnet
        </p>
      </div>
    </section>
  );
}
