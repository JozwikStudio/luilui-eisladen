import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';
import SectionBadge from '@/components/SectionBadge';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Täglich frisch hausgemacht',
  'Natürliche Zutaten, keine Konservierungsstoffe',
  'Regionale Bezugsquellen aus Leipzig & Umgebung',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
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
      id="ueber-uns"
      ref={sectionRef}
      className="bg-luilui-vanilla py-16 lg:py-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
          {/* Image */}
          <div ref={imgRef} className="flex-1 mb-8 lg:mb-0">
            <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-luilui-lg">
              <img
                src="/images/about-process.jpg"
                alt="Eisherstellung bei LuiLui Eis - hausgemacht mit Liebe"
                loading="lazy"
                className="w-full aspect-video lg:aspect-[4/3] object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div ref={textRef} className="flex-1">
            <div className="lg:text-left text-center">
              <SectionBadge text="Über uns" />
            </div>

            <h2 className="font-playfair text-[32px] lg:text-5xl font-bold text-luilui-dark-text mt-3 lg:text-left text-center">
              Mit Liebe hausgemacht
            </h2>

            <p className="font-inter text-base text-luilui-dark-text leading-relaxed mt-4">
              Bei LuiLui Eis steckt in jedem Eis ein Stück Leidenschaft. Wir produzieren unser Eis 
              täglich frisch in kleinen Chargen — mit hochwertigen Zutaten, ohne künstliche Aromen 
              und mit viel Liebe zum Detail. Unsere Rezepte kombinieren klassische Eissorten mit 
              kreativen, saisonalen Kreationen.
            </p>

            <p className="font-inter text-base text-luilui-muted-text leading-relaxed mt-3">
              Regionalität ist uns wichtig: Wo immer möglich, beziehen wir unsere Zutaten von 
              Partnern aus der Region Leipzig. Das Ergebnis? Eis, das nicht nur unglaublich gut 
              schmeckt, sondern auch gut tut.
            </p>

            <div className="flex flex-col gap-3 mt-6">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-luilui-primary flex-shrink-0" />
                  <span className="font-inter text-sm font-medium text-luilui-dark-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
