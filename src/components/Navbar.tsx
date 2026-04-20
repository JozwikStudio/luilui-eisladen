import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    if (!isHome) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Standorte', action: () => scrollToSection('standorte'), href: '/#standorte' },
    { label: 'Unser Eis', action: () => scrollToSection('produkte'), href: '/#produkte' },
    { label: 'Über uns', action: () => scrollToSection('ueber-uns'), href: '/#ueber-uns' },
    { label: 'Veganes Eis', action: () => scrollToSection('vegan'), href: '/#vegan' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-luilui-primary shadow-luilui-md border-b border-white/10'
            : 'bg-luilui-primary shadow-none'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-16 lg:h-[72px] flex items-center justify-between">
          <Link to="/" className="font-playfair text-xl lg:text-2xl font-semibold text-white tracking-tight">
            LuiLui Eis
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              isHome ? (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="text-sm font-medium text-white/85 hover:text-white transition-colors duration-150 hover:underline underline-offset-4"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-white/85 hover:text-white transition-colors duration-150 hover:underline underline-offset-4"
                >
                  {link.label}
                </Link>
              )
            ))}
            {isHome ? (
              <button
                onClick={() => scrollToSection('standorte')}
                className="flex items-center gap-2 bg-white text-luilui-primary text-sm font-semibold px-5 py-2 rounded-full hover:bg-luilui-cream transition-colors duration-200"
              >
                <MapPin size={16} />
                Route planen
              </button>
            ) : (
              <Link
                to="/#standorte"
                className="flex items-center gap-2 bg-white text-luilui-primary text-sm font-semibold px-5 py-2 rounded-full hover:bg-luilui-cream transition-colors duration-200"
              >
                <MapPin size={16} />
                Route planen
              </Link>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-white p-2"
            aria-label="Menü öffnen"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-luilui-primary transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full px-6 py-4">
          <div className="flex items-center justify-between h-16">
            <span className="font-playfair text-xl font-semibold text-white">LuiLui Eis</span>
            <button onClick={() => setMenuOpen(false)} className="text-white p-2" aria-label="Menü schließen">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-6">
            {navLinks.map((link, i) => (
              isHome ? (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="font-playfair text-3xl font-semibold text-white text-left"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-playfair text-3xl font-semibold text-white"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          <div className="pb-8">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-4">Standorte</p>
            <div className="flex flex-col gap-2">
              <Link to="/georg-schumann-141" className="text-white/80 text-sm">Georg-Schumann-Str. 141</Link>
              <Link to="/georg-schwarz-64" className="text-white/80 text-sm">Georg-Schwarz-Str. 64</Link>
              <Link to="/zweinaundorfer-63" className="text-white/80 text-sm">Zweinaundorfer Str. 63</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
