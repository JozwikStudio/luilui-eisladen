import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone, Car, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MAPS_CONSENT_KEY = 'luilui-google-maps-consent';

interface LocationData {
  slug: string;
  name: string;
  street: string;
  postalCode: string;
  description: string;
  parking: string;
  mapsDeepLink: string;
  mapsEmbed: string;
}

const locationsData: Record<string, LocationData> = {
  'georg-schumann-141': {
    slug: 'georg-schumann-141',
    name: 'Georg-Schumann-Straße 141',
    street: 'Georg-Schumann-Straße 141',
    postalCode: '04155',
    description:
      'Unser Standort an der Georg-Schumann-Straße 141 ist bequem erreichbar und liegt direkt an der Haltestelle Wiederitzscher Straße. Dort halten die Straßenbahnlinien 10 und 11 sowie die Buslinien 80 und 90 der LVB. Sitzplätze im Freien gibt es an diesem Standort nicht, dafür erwartet dich direkt vor Ort unsere Auswahl an hausgemachtem Eis und veganen Sorten.',
    parking: 'Parkmöglichkeiten befinden sich in den Nebenstraßen',
    mapsDeepLink: 'https://www.google.com/maps/dir/?api=1&destination=Georg-Schumann-Straße+141,+04155+Leipzig',
    mapsEmbed:
      'https://www.google.com/maps?q=Georg-Schumann-Straße+141,+04155+Leipzig&output=embed',
  },
  'georg-schwarz-64': {
    slug: 'georg-schwarz-64',
    name: 'Georg-Schwarz-Straße 64',
    street: 'Georg-Schwarz-Straße 64',
    postalCode: '04155',
    description:
      'Im beliebten Stadtteil Leutzsch erwartet dich unser LuiLui Eis an der Georg-Schwarz-Straße 64. Der Standort besticht durch seine familiäre Atmosphäre und ist ein beliebter Treffpunkt für Einheimische und Besucher. Genieße unser hausgemachtes Eis in entspannter Umgebung — mit oder ohne veganen Optionen.',
    parking: 'Parkmöglichkeiten in der Nähe',
    mapsDeepLink: 'https://www.google.com/maps/dir/?api=1&destination=Georg-Schwarz-Straße+64,+04155+Leipzig',
    mapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.1!2d12.3700!3d51.3450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f9c7b9c0c0c2%3A0x0!2zR2VvcnctU2Nod2Fyei1TdHIuIDY0LCAwNDE1NSBMZWlwc2ln!5e0!3m2!1sde!2sde!4v1',
  },
  'zweinaundorfer-63': {
    slug: 'zweinaundorfer-63',
    name: 'Zweinaundorfer Straße 63',
    street: 'Zweinaundorfer Straße 63',
    postalCode: '04318',
    description:
      'An der Zweinaundorfer Straße 63 im Leipziger Osten findest du einen unserer schönsten Standorte. Die großzügige Außenfläche lädt besonders an warmen Sommertagen zum Verweilen ein. Probieren Sie unsere saisonalen Kreationen und erleben Sie Eisgenuss in seiner reinsten Form — hausgemacht, frisch und voller Geschmack.',
    parking: 'Kostenfreie Parkplätze vor Ort',
    mapsDeepLink: 'https://www.google.com/maps/dir/?api=1&destination=Zweinaundorfer+Straße+63,+04318+Leipzig',
    mapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2!2d12.3800!3d51.3400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f9c7b9c0c0c3%3A0x0!2zWndlaW5hdW5kb3JmZXIgU3RyLiA2MywgMDQzMTggTGVpcHNpZw!5e0!3m2!1sde!2sde!4v1',
  },
};

export default function LocationPage() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '');
  const heroRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [hasMapConsent, setHasMapConsent] = useState(false);

  const loc = locationsData[slug];

  const acceptMapConsent = () => {
    setHasMapConsent(true);
    window.localStorage.setItem(MAPS_CONSENT_KEY, 'accepted');
  };

  const scrollToMapConsent = () => {
    mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleProtectedGoogleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!hasMapConsent) {
      event.preventDefault();
      scrollToMapConsent();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setHasMapConsent(window.localStorage.getItem(MAPS_CONSENT_KEY) === 'accepted');
  }, [slug]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.loc-h1',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.loc-meta',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.loc-cta',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power2.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [slug]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !mapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.map-frame',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: mapRef.current, start: 'top 80%', once: true },
        }
      );
      gsap.fromTo(
        '.map-info',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: mapRef.current, start: 'top 80%', once: true },
        }
      );
    }, mapRef);

    return () => ctx.revert();
  }, [slug]);

  if (!loc) {
    return (
      <div className="min-h-screen bg-luilui-cream pt-24 text-center">
        <h1 className="font-playfair text-3xl font-bold text-luilui-dark-text">Standort nicht gefunden</h1>
        <Link to="/" className="text-luilui-primary underline mt-4 inline-block">
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* Hero */}
      <div ref={heroRef} className="bg-luilui-cream pt-28 lg:pt-36 pb-12 lg:pb-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/"
            className="inline-block text-sm font-medium text-luilui-primary hover:underline mb-6"
          >
            ← Alle Standorte
          </Link>

          <h1 className="loc-h1 font-playfair text-4xl lg:text-[56px] font-bold text-luilui-dark-text leading-tight">
            LuiLui Eis –<br />
            <span className="text-luilui-primary">{loc.name}</span>
          </h1>

          <div className="loc-meta mt-4">
            <p className="font-inter text-base lg:text-lg text-luilui-muted-text">
              {loc.street}<br />
              {loc.postalCode} Leipzig
            </p>
            <p className="font-inter text-sm font-medium text-luilui-muted-text mt-2">
              Öffnungszeiten: Täglich 12–20 Uhr
            </p>
          </div>

          <a
            href={loc.mapsDeepLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleProtectedGoogleClick}
            className="loc-cta inline-block mt-6 bg-luilui-primary text-white font-inter font-semibold text-base px-8 py-4 rounded-full shadow-luilui-md hover:bg-luilui-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
          >
            Route planen
          </a>
        </div>
      </div>

      {/* Map & Info */}
      <div ref={mapRef} className="bg-white py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-10">
            {/* Map */}
            <div className="map-frame flex-1 lg:flex-[0.6]">
              <div className="rounded-2xl overflow-hidden border border-luilui-border bg-white">
                {hasMapConsent ? (
                  <iframe
                    src={loc.mapsEmbed}
                    width="100%"
                    height="280"
                    className="lg:h-[360px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Karte ${loc.name}`}
                  />
                ) : (
                  <div className="flex h-[280px] lg:h-[360px] flex-col items-center justify-center bg-luilui-cream px-4 py-5 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-luilui-sm">
                      <ShieldCheck size={18} className="text-luilui-primary" />
                    </div>
                    <h3 className="mt-3 font-inter text-base font-semibold text-luilui-dark-text">
                      Karte erst nach Zustimmung laden
                    </h3>
                    <p className="mt-2 max-w-[420px] text-xs sm:text-sm leading-relaxed text-luilui-muted-text">
                      Erst nach deiner Bestätigung werden Google Maps und die Routenfunktion aktiviert.
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
                      <button
                        onClick={acceptMapConsent}
                        className="rounded-full bg-luilui-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-luilui-primary-dark"
                      >
                        Karte laden
                      </button>
                      <a
                        href={loc.mapsDeepLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border-2 border-luilui-primary px-5 py-2.5 text-sm font-semibold text-luilui-primary transition-all duration-200 hover:bg-luilui-primary/5"
                      >
                        Google Maps öffnen
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="map-info flex-1 lg:flex-[0.4] mt-8 lg:mt-0">
              <h2 className="font-playfair text-2xl lg:text-4xl font-bold text-luilui-dark-text">
                So findest du uns
              </h2>

              <p className="font-inter text-base text-luilui-dark-text leading-relaxed mt-4">
                {loc.description}
              </p>

              <div className="flex flex-col gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-luilui-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-luilui-muted-text">Adresse</p>
                    <p className="text-sm text-luilui-dark-text">{loc.street}, {loc.postalCode} Leipzig</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-luilui-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-luilui-muted-text">Öffnungszeiten</p>
                    <p className="text-sm text-luilui-dark-text">Täglich 12–20 Uhr</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-luilui-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-luilui-muted-text">Telefon</p>
                    <p className="text-sm text-luilui-dark-text">+49 341 XXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car size={20} className="text-luilui-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-luilui-muted-text">Parken</p>
                    <p className="text-sm text-luilui-dark-text">{loc.parking}</p>
                  </div>
                </div>
              </div>

              <a
                href={loc.mapsDeepLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleProtectedGoogleClick}
                className="inline-block mt-6 text-sm font-semibold text-luilui-primary hover:underline"
              >
                In Google Maps öffnen →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby CTA */}
      <div className="bg-luilui-vanilla py-12 lg:py-16">
        <div className="max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-2xl lg:text-4xl font-bold text-luilui-dark-text">
            In der Nähe?
          </h2>
          <p className="font-inter text-base text-luilui-muted-text mt-3">
            Wir sind nur einen kurzen Spaziergang entfernt. Komm vorbei und probiere unser hausgemachtes Eis!
          </p>

          <a
            href={loc.mapsDeepLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleProtectedGoogleClick}
            className="inline-block mt-6 bg-luilui-primary text-white font-inter font-semibold text-base px-8 py-4 rounded-full shadow-luilui-md hover:bg-luilui-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
          >
            Route zu {loc.name} planen
          </a>

          <div className="mt-4">
            <Link
              to="/"
              className="text-sm font-medium text-luilui-primary hover:underline"
            >
              Anderen Standort wählen
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
