import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBadge from '@/components/SectionBadge';
import LocationCard from '@/components/LocationCard';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: 'Georg-Schumann-Straße 141',
    address: 'Georg-Schumann-Straße 141',
    postalCode: '04117',
    hours: 'Öffnungszeiten: Täglich 12–20 Uhr',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.0!2d12.3645!3d51.3548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f9c7b9c0c0c1%3A0x0!2zR2VvcnctU2NodW1hbm4tU3RyLiAxNDEsIDA0MTE3IExlaXB6aWc!5e0!3m2!1sde!2sde!4v1',
    routeUrl: 'https://www.google.com/maps/dir/?api=1&destination=Georg-Schumann-Straße+141,+04117+Leipzig',
    pagePath: '/georg-schumann-141',
  },
  {
    name: 'Georg-Schwarz-Straße 64',
    address: 'Georg-Schwarz-Straße 64',
    postalCode: '04155',
    hours: 'Öffnungszeiten: Täglich 12–20 Uhr',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.1!2d12.3700!3d51.3450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f9c7b9c0c0c2%3A0x0!2zR2VvcnctU2Nod2Fyei1TdHIuIDY0LCAwNDE1NSBMZWlwc2ln!5e0!3m2!1sde!2sde!4v1',
    routeUrl: 'https://www.google.com/maps/dir/?api=1&destination=Georg-Schwarz-Straße+64,+04155+Leipzig',
    pagePath: '/georg-schwarz-64',
  },
  {
    name: 'Zweinaundorfer Straße 63',
    address: 'Zweinaundorfer Straße 63',
    postalCode: '04318',
    hours: 'Öffnungszeiten: Täglich 12–20 Uhr',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2!2d12.3800!3d51.3400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f9c7b9c0c0c3%3A0x0!2zWndlaW5hdW5kb3JmZXIgU3RyLiA2MywgMDQzMTggTGVpcHNpZw!5e0!3m2!1sde!2sde!4v1',
    routeUrl: 'https://www.google.com/maps/dir/?api=1&destination=Zweinaundorfer+Straße+63,+04318+Leipzig',
    pagePath: '/zweinaundorfer-63',
  },
];

export default function StandorteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !cardsRef.current) return;

    const cards = cardsRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="standorte"
      ref={sectionRef}
      className="bg-white py-16 lg:py-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-10">
          <SectionBadge text="Finde uns" />
          <h2 className="font-playfair text-[32px] lg:text-5xl font-bold text-luilui-dark-text mt-3">
            Unsere 3 Standorte in Leipzig
          </h2>
          <p className="font-inter text-base text-luilui-muted-text mt-3 max-w-[560px] mx-auto">
            Wir sind an drei Orten in Leipzig für dich da. Komm vorbei und genieß hausgemachtes Eis!
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {locations.map((loc) => (
            <LocationCard key={loc.pagePath} {...loc} />
          ))}
        </div>
      </div>
    </section>
  );
}
