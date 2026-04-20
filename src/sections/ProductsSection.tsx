import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBadge from '@/components/SectionBadge';
import IceCreamProductCard from '@/components/IceCreamProductCard';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'Vanille Bourbon',
    description: 'Unsere cremigste Klassiker-Sorte',
    image: '/images/product-1.jpg',
  },
  {
    name: 'Schokolade 70%',
    description: 'Intensiv, mit echter Belga-Schokolade',
    image: '/images/product-2.jpg',
  },
  {
    name: 'Erdbeere Sorbet',
    description: 'Fruchtig-frisch, vegan',
    image: '/images/product-3.jpg',
    badge: 'Vegan',
  },
  {
    name: 'Pistazie',
    description: 'Mit echten sizilianischen Pistazien',
    image: '/images/product-4.jpg',
  },
  {
    name: 'Mango Lassi',
    description: 'Exotisch-cremig, vegan',
    image: '/images/product-5.jpg',
    badge: 'Vegan',
  },
  {
    name: 'Salted Caramel',
    description: 'Süß-salzige Karamell-Note',
    image: '/images/product-6.jpg',
  },
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !gridRef.current) return;

    const cards = gridRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="produkte"
      ref={sectionRef}
      className="bg-white py-16 lg:py-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-8">
          <SectionBadge text="Unser Sortiment" />
          <h2 className="font-playfair text-[32px] lg:text-5xl font-bold text-luilui-dark-text mt-3">
            Hausgemachtes Eis in Leipzig
          </h2>
          <p className="font-inter text-base text-luilui-muted-text mt-3 max-w-[520px] mx-auto">
            Von klassischen Sorten bis zu saisonalen Kreationen — entdecke unsere Vielfalt an hausgemachtem Eis.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
        >
          {products.map((product) => (
            <IceCreamProductCard key={product.name} {...product} />
          ))}
        </div>

        <p className="text-center text-xs font-medium italic text-luilui-light-text mt-6">
          Weitere Eissorten und Bilder folgen bald.
        </p>
      </div>
    </section>
  );
}
