import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-luilui-primary text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-semibold mb-2">LuiLui Eis</h3>
            <p className="text-sm text-white/70 mb-6">Hausgemachtes Eis in Leipzig</p>
            <div className="flex items-center gap-3">
              {/* Social placeholders */}
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-xs text-white/70">IG</span>
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-xs text-white/70">FB</span>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-inter text-base font-semibold mb-4">Unsere Standorte</h4>
            <div className="flex flex-col gap-2">
              <Link to="/georg-schumann-141" className="text-sm text-white/70 hover:text-white transition-colors">
                Georg-Schumann-Str. 141
              </Link>
              <Link to="/georg-schwarz-64" className="text-sm text-white/70 hover:text-white transition-colors">
                Georg-Schwarz-Str. 64
              </Link>
              <Link to="/zweinaundorfer-63" className="text-sm text-white/70 hover:text-white transition-colors">
                Zweinaundorfer Str. 63
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-inter text-base font-semibold mb-4">Rechtliches</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors">Impressum</span>
              <span className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors">Datenschutz</span>
              <span className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors">Kontakt</span>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-12 pt-6 border-t border-white/15">
          <p className="text-xs text-white/50 text-center">
            © 2025 LuiLui Eis. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
