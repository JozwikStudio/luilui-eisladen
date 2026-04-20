import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const scrollToStandorte = () => {
    const el = document.getElementById('standorte');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo(badgeRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 })
      .fromTo(h1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
      .fromTo(subRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 0.4)
      .fromTo(ctaRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5)
      .fromTo(imgRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7 }, 0.3);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] lg:min-h-[80vh] bg-luilui-cream overflow-hidden"
    >
      {/* Decorative gradient */}
      <div
        className="absolute top-0 right-0 w-[60%] h-[60%] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(98,38,92,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 lg:pt-28 pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
          {/* Text Content */}
          <div className="flex-1 lg:max-w-[55%]">
            <div ref={badgeRef}>
              <SectionBadge text="3x in Leipzig" />
            </div>

            <h1
              ref={h1Ref}
              className="font-playfair text-[40px] lg:text-5xl xl:text-7xl font-bold text-luilui-dark-text leading-[1.1] mt-3"
            >
              Eiscafé in Leipzig<br />
              <span className="text-luilui-primary">— LuiLui Eis</span>
            </h1>

            <p
              ref={subRef}
              className="font-inter text-base text-luilui-muted-text leading-relaxed mt-4 max-w-[480px]"
            >
              Hausgemachtes Eis mit Liebe gemacht — frisch, cremig und mit regionalen Zutaten. 
              In drei Locations in Leipzig erwartet dich Eisgenuss auf höchstem Niveau.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={scrollToStandorte}
                className="w-full sm:w-auto bg-luilui-primary text-white font-inter font-semibold text-base px-8 py-4 rounded-full shadow-luilui-md hover:bg-luilui-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Route planen
              </button>
              <button
                onClick={scrollToStandorte}
                className="w-full sm:w-auto bg-transparent text-luilui-primary font-inter font-semibold text-base px-8 py-4 rounded-full border-2 border-luilui-primary hover:bg-luilui-primary/5 transition-all duration-200"
              >
                Standorte ansehen
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div ref={imgRef} className="flex-1 mt-10 lg:mt-0 lg:max-w-[45%]">
            <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-luilui-lg">
              <img
                src="/images/hero-ice-cream.jpg"
                alt="Hausgemachtes Eis bei LuiLui Eis in Leipzig"
                className="w-full aspect-video lg:aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile scroll indicator */}
        <div className="lg:hidden flex justify-center mt-10">
          <button onClick={scrollToStandorte} className="text-luilui-primary/40 animate-bounce-down">
            <ChevronDown size={28} />
          </button>
        </div>
      </div>
    </section>
  );
}
