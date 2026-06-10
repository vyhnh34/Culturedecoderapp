import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#schein', label: 'Schein Levels' },
  { href: '#goffee-jones', label: 'Goffee & Jones' },
  { href: '#design-maturity', label: 'Design Maturity' },
  { href: '#tensions', label: 'Tensions' },
  { href: '#sources', label: 'Sources' },
];

export default function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? 'var(--color-earth)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
          transition: 'background-color 350ms ease',
        }}
      >
        <div className="max-w-content" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          {/* Wordmark */}
          <a
            href="#hero"
            onClick={e => handleLinkClick(e, '#hero')}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 800,
              color: '#FFFFFF',
              textDecoration: 'none',
            }}
          >
            Patagonia&nbsp;·&nbsp;Culture&nbsp;Profile
          </a>

          {/* Desktop links */}
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }} className="desktop-nav">
            {navLinks.map(link => {
              const sectionId = link.href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => handleLinkClick(e, link.href)}
                    style={{
                      display: 'block',
                      padding: '8px 14px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: '0.04em',
                      color: isActive ? '#FFFFFF' : 'rgba(245,242,237,0.55)',
                      textDecoration: 'none',
                      borderBottom: isActive ? '2px solid var(--color-river)' : '2px solid transparent',
                      paddingBottom: '6px',
                      transition: 'color 200ms ease, border-color 200ms ease',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'rgba(245,242,237,0.85)'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(245,242,237,0.55)'; }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: '#FFFFFF',
            }}
            className="mobile-menu-btn"
          >
            {mobileOpen
              ? <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              : <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            }
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-label="Navigation menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            backgroundColor: 'var(--color-earth)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '0 var(--gutter)',
            gap: '4px',
          }}
        >
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => handleLinkClick(e, link.href)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(28px, 6vw, 40px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                width: '100%',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-river)'}
              onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
