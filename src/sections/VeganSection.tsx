import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf } from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';

gsap.registerPlugin(ScrollTrigger);

export default function VeganSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="vegan"
      ref={sectionRef}
      className="relative py-16 lg:py-20 overflow-hidden"
      style={{
        backgroundColor: 'rgba(212, 241, 240, 0.5)',
        backgroundImage: 'radial-gradient(circle, rgba(98,38,92,0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
          {/* Text Content */}
          <div ref={textRef} className="flex-1 lg:max-w-[55%] mt-8 lg:mt-0">
            <div className="lg:text-left text-center">
              <SectionBadge text="Vegane Optionen" variant="white" />
            </div>

            <h2 className="font-playfair text-[32px] lg:text-5xl font-bold text-luilui-dark-text mt-3 lg:text-left text-center">
              Veganes Eis in Leipzig
            </h2>

            <p className="font-inter text-base text-luilui-dark-text leading-relaxed mt-4">
              Unsere veganen Eissorten sind nicht nur für Veganer ein Genuss. Wir nutzen pflanzliche 
              Alternativen wie Kokos- und Hafermilch, um cremige, vollmundige Texturen zu schaffen — 
              ganz ohne tierische Produkte. Von fruchtigen Sorbets bis zu cremigen Schokoladensorten: 
              Bei LuiLui Eis ist für jeden Geschmack etwas dabei.
            </p>

            <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-lg px-4 py-2 mt-5 lg:mx-0 mx-auto">
              <Leaf size={20} className="text-emerald-700" />
              <span className="font-inter text-sm font-semibold text-emerald-700">
                100% pflanzliche Optionen verfügbar
              </span>
            </div>
          </div>

          {/* Image */}
          <div ref={imgRef} className="flex-1 lg:max-w-[45%]">
            <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-luilui-lg">
              <img
                src="/images/vegan-sorbet.jpg"
                alt="Veganes Eis und Sorbet bei LuiLui Eis Leipzig"
                loading="lazy"
                className="w-full h-[280px] object-cover object-[center_55%] scale-100 sm:h-auto sm:aspect-video sm:object-center lg:aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
