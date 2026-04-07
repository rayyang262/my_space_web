"use client";

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// ── Navbar size controls ──────────────────────────────
const NAV_PADDING_X = '1.1rem'   // ← left/right padding (wider = bigger pill)
const NAV_PADDING_Y = '0.75rem'  // ← top/bottom padding (taller pill)
const NAV_MIN_WIDTH  = 'auto'    // ← minimum width, e.g. '400px' or 'auto'
// ──────────────────────────────────────────────────────

const TABS = [
  { label: 'Home',    href: '/',        offset: '0px'  },  // ← adjust Home position
  { label: 'About',   href: '/about',   offset: '20px'  },  // ← adjust About position
  { label: 'Contact', href: '/contact', offset: '20px'  },  // ← adjust Contact position
];

const AnimatedNavLink = ({ href, children, offset = '0px' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === href;
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => navigate(href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ height: '1.2em', overflow: 'hidden', lineHeight: '1.2em', marginLeft: offset, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        transform: hovered ? 'translateY(-50%)' : 'translateY(0%)',
        transition: 'transform 0.3s ease',
      }}>
        <span style={{ height: '1.2em', display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: isActive ? '#000' : '#555555' }}>{children}</span>
        <span style={{ height: '1.2em', display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#000' }}>{children}</span>
      </div>
    </button>
  );
};

export default function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => setHeaderShapeClass('rounded-full'), 300);
    }
    return () => { if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current); };
  }, [isOpen]);

  const logoElement = (
    <div
      onClick={() => navigate('/')}
      style={{ cursor: 'pointer', fontStyle: 'italic', fontWeight: '700', fontSize: '1.25rem', color: '#111111', lineHeight: 1, userSelect: 'none' }}
    >
      R
    </div>
  );

  return (
    <header
      style={{ paddingLeft: NAV_PADDING_X, paddingRight: NAV_PADDING_X, paddingTop: NAV_PADDING_Y, paddingBottom: NAV_PADDING_Y, minWidth: NAV_MIN_WIDTH }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50
                  flex flex-col items-center
                  backdrop-blur-sm
                  ${headerShapeClass}
                  border border-black/10 bg-[#ffffffcc]
                  w-[calc(100%-2rem)] sm:w-auto
                  transition-[border-radius] duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <div className="flex items-center">
          {logoElement}
        </div>

        <nav className="hidden sm:flex items-center space-x-24 text-sm">
          {TABS.map((tab) => (
            <AnimatedNavLink key={tab.href} href={tab.href} offset={tab.offset}>
              {tab.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-600 focus:outline-none bg-transparent border-none cursor-pointer"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                    ${isOpen ? 'max-h-96 opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}
      >
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {TABS.map((tab) => (
            <button
              key={tab.href}
              onClick={() => { navigate(tab.href); setIsOpen(false); }}
              className="text-gray-600 hover:text-black transition-colors w-full text-center bg-transparent border-none cursor-pointer text-base"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
