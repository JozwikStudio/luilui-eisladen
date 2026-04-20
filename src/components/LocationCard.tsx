import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const MAPS_CONSENT_KEY = 'luilui-google-maps-consent';

interface LocationCardProps {
  name: string;
  address: string;
  postalCode: string;
  hours: string;
  mapUrl: string;
  routeUrl: string;
  pagePath: string;
}

export default function LocationCard({
  name,
  address,
  postalCode,
  hours,
  pagePath,
  routeUrl,
}: LocationCardProps) {
  const [hasMapConsent, setHasMapConsent] = useState(false);

  useEffect(() => {
    setHasMapConsent(window.localStorage.getItem(MAPS_CONSENT_KEY) === 'accepted');
  }, []);

  return (
    <div className="bg-white border border-luilui-border rounded-2xl p-5 lg:p-6 shadow-luilui-md hover:shadow-luilui-hover hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-luilui-peach/60 flex items-center justify-center">
          <MapPin size={20} className="text-luilui-primary" />
        </div>
        <div>
          <h3 className="font-inter text-base lg:text-[17px] font-semibold text-luilui-dark-text leading-tight whitespace-nowrap">{name}</h3>
          <p className="text-sm text-luilui-muted-text whitespace-nowrap">{address}</p>
          <p className="text-sm text-luilui-muted-text">{postalCode} Leipzig</p>
        </div>
      </div>

      <p className="text-sm text-luilui-muted-text mb-4">{hours}</p>

      <div className="flex flex-col gap-2">
        <Link
          to={pagePath}
          className="block w-full text-center bg-luilui-primary text-white font-inter font-semibold text-sm py-3 px-6 rounded-lg hover:bg-luilui-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Standort ansehen
        </Link>
        {hasMapConsent ? (
          <a
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-luilui-primary font-inter font-medium text-sm py-2 hover:underline"
          >
            Route planen →
          </a>
        ) : (
          <Link
            to={pagePath}
            className="block w-full text-center text-luilui-primary font-inter font-medium text-sm py-2 hover:underline"
          >
            Route planen →
          </Link>
        )}
      </div>
    </div>
  );
}
