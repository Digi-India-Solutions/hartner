import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Building, Menu, X, ArrowRight, User } from "lucide-react";
import { store } from "@/store/store";

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { isAuthenticated } = store.getState().auth;

  const navLinks = [
    { name: "Properties", path: "/" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <div className="min-h-screen bg-navy-50 flex flex-col justify-between">
      {/* Header/Navbar */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-navy-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-10 w-10 bg-navy-900 rounded-xl flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <Building className="h-5.5 w-5.5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-navy-900 group-hover:text-brand-600 transition-colors">
                Haertner Immobilien
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-12">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="px-4 py-2 font-bold text-navy-600 hover:text-brand-500 hover:bg-navy-50/60 rounded-lg transition-all text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="w-[1px] bg-navy-200 h-6"></div>
              {isAuthenticated ? (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-brand-500 text-white hover:text-white font-bold rounded-lg text-sm shadow-sm transition-all duration-200"
                >
                  <User className="h-4 w-4" />
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-5 py-2.5 border border-navy-200 hover:border-brand-500 text-navy-700 hover:text-brand-500 font-bold rounded-lg text-sm transition-all duration-200"
                >
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-navy-600 hover:text-navy-900 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-navy-100 bg-white shadow-lg animate-fade-in">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-semibold text-navy-600 hover:bg-navy-50 hover:text-brand-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-navy-100 my-2 pt-2">
                {isAuthenticated ? (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-navy-900 text-white font-bold rounded-lg text-base"
                  >
                    <User className="h-5 w-5" />
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 border border-navy-200 text-navy-700 font-bold rounded-lg text-base"
                  >
                    Sign In
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-navy-900 text-navy-300 py-12 md:py-16 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-12 border-b border-navy-800">
            {/* Branding */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                  <Building className="h-5 w-5" />
                </div>
                <span className="font-bold text-lg text-white tracking-tight">
                  Haertner Immobilien
                </span>
              </div>
              <p className="text-navy-400 text-sm max-w-xs leading-relaxed">
                Premium property management and investment consultancies. Discover our exclusive listings.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400 mb-4">
                Categories
              </h4>
              <ul className="space-y-2.5 text-sm font-semibold">
                <li>
                  <Link to="/?category=Zinshaus" className="hover:text-white transition-colors">
                    Zinshäuser
                  </Link>
                </li>
                <li>
                  <Link to="/?category=Gewerbe & Investment" className="hover:text-white transition-colors">
                    Gewerbe & Investment
                  </Link>
                </li>
                <li>
                  <Link to="/?category=Haus & Wohnen" className="hover:text-white transition-colors">
                    Häuser & Wohnungen
                  </Link>
                </li>
                <li>
                  <Link to="/?category=Mietobjekte" className="hover:text-white transition-colors">
                    Mietobjekte
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400 mb-4">
                Contact
              </h4>
              <address className="not-italic text-sm text-navy-400 space-y-2 leading-relaxed">
                <p>Haertner Immobilien GmbH</p>
                <p>Schubertring 6, 1010 Wien</p>
                <p className="hover:text-white transition-colors mt-2">
                  <a href="mailto:office@haertner-immobilien.at">office@haertner-immobilien.at</a>
                </p>
              </address>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-navy-500 gap-4">
            <p>© 2026 Haertner Immobilien GmbH</p>
            <div className="flex gap-6 font-semibold">
              <a href="#" className="hover:text-navy-300">Privacy Policy</a>
              <a href="#" className="hover:text-navy-300">Terms of Service</a>
              <a href="#" className="hover:text-navy-300">Imprint</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
