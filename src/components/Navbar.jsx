import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Navbar = ({ isLoggedIn = false, onToggleAuth }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(124);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let lastScrollYVal = window.scrollY;
    let accumulatedDelta = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYVal;
      lastScrollYVal = currentScrollY;

      if (isMobileMenuOpen) {
        setIsNavbarVisible(true);
        accumulatedDelta = 0;
        return;
      }

      if (currentScrollY <= 80) {
        setIsNavbarVisible(true);
        accumulatedDelta = 0;
        return;
      }

      // Si cambia de dirección el scroll, reiniciamos la acumulación
      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }
      accumulatedDelta += delta;

      if (accumulatedDelta > 15) {
        setIsNavbarVisible(false);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -15) {
        setIsNavbarVisible(true);
        accumulatedDelta = 0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  // Bloquear scroll de body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="navbar-wrapper" style={{ minHeight: `${navbarHeight}px` }}>
      <div 
        ref={navbarRef}
        className={`navbar-container ${isMobileMenuOpen ? 'mobile-menu-active' : ''} ${!isNavbarVisible ? 'navbar-hidden' : ''}`}
      >
        {/* Top Navigation Row */}
        <div className="top-nav">
          <div className="top-nav-segments">
            <a href="#personas" className="segment-link active">Personas</a>
            <a href="#emprendedores" className="segment-link">Emprendedores</a>
            <a href="#empresas" className="segment-link">Empresas</a>
            <a href="#internacional" className="segment-link">Internacional</a>
          </div>
          <a href="#ayuda" className="top-nav-help">
            Centro de ayuda 
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </a>
        </div>

        {/* Main Navigation Row */}
        <nav className="main-nav">
          <div className="main-nav-left">
            <a href="/" className="nav-brand-link">
              <img src="/logo.png" alt="Starken Logo" className="nav-logo" />
            </a>
          </div>
          
          <div className="main-links">
            <a 
              href="#envios" 
              className="main-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('servicios'); }}
            >
              Envíos
              <svg className="chevron-down" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <a 
              href="#puntos" 
              className="main-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('servicios'); }}
            >
              Puntos red Starken
            </a>
            <a 
              href="#servicios" 
              className="main-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('plugins'); }}
            >
              Servicios
            </a>
            <a 
              href="#tarifas" 
              className="main-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('documentacion'); }}
            >
              Tarifas
            </a>
          </div>
          
          <div className="main-nav-right">
            <div className="nav-actions">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 hidden sm:inline">
                    👤 Mi Cuenta
                  </span>
                  <button 
                    onClick={onToggleAuth}
                    className="text-xs text-red-600 hover:text-red-700 font-bold px-3 py-1.5 rounded-[7px] border border-red-200 hover:bg-red-50 transition-colors"
                    title="Cerrar sesión"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onToggleAuth}
                  className="btn-ingresar"
                >
                  Ingresar
                </button>
              )}
            </div>

            {/* Hamburger Menu Toggle Button */}
            <button 
              className="hamburger-btn" 
              onClick={() => setIsMobileMenuOpen(true)} 
              aria-label="Abrir menú"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <div 
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <img src="/logo.png" alt="Starken Logo" className="mobile-menu-logo" />
              <button 
                className="mobile-menu-close-btn" 
                onClick={() => setIsMobileMenuOpen(false)} 
                aria-label="Cerrar menú"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="mobile-menu-content">
              <div className="mobile-menu-links">
                <a 
                  href="#envios" 
                  className="mobile-menu-link" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('servicios'); }}
                >
                  <span>Envíos</span>
                  <svg className="chevron-right" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
                <a 
                  href="#puntos" 
                  className="mobile-menu-link" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('servicios'); }}
                >
                  <span>Puntos red Starken</span>
                  <svg className="chevron-right" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
                <a 
                  href="#servicios" 
                  className="mobile-menu-link" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('plugins'); }}
                >
                  <span>Servicios</span>
                  <svg className="chevron-right" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
                <a 
                  href="#tarifas" 
                  className="mobile-menu-link" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('documentacion'); }}
                >
                  <span>Tarifas</span>
                  <svg className="chevron-right" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </div>
              
              <div className="mobile-menu-divider"></div>
              
              <a href="#ayuda" className="mobile-menu-help" onClick={() => setIsMobileMenuOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span>Centro de ayuda</span>
              </a>
              
              <div className="mobile-menu-actions">
                {isLoggedIn ? (
                  <button 
                    className="mobile-btn-ingresar bg-red-600 hover:bg-red-700 text-white" 
                    onClick={() => { onToggleAuth && onToggleAuth(); setIsMobileMenuOpen(false); }}
                  >
                    Cerrar sesión
                  </button>
                ) : (
                  <button 
                    className="mobile-btn-ingresar" 
                    onClick={() => { onToggleAuth && onToggleAuth(); setIsMobileMenuOpen(false); }}
                  >
                    Ingresar / Registrarse
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
