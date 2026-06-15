import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { href: '#schein', label: 'Schein Levels' },
  { href: '#goffee-jones', label: 'Goffee & Jones' },
  { href: '#design-maturity', label: 'Design Maturity' },
  { href: '#tensions', label: 'Tensions' },
  { href: '#sources', label: 'Sources' },
];

export default function Nav({ activeSection }) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 10) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E3D9',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 300ms ease',
      }}
    >
      <div className="max-w-content" style={{ paddingTop: '14px', paddingBottom: '0' }}>

        {/* Row 1 — wordmark */}
        <a
          href="#hero"
          onClick={e => handleLinkClick(e, '#hero')}
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#000000',
            textDecoration: 'none',
            marginBottom: '10px',
          }}
        >
          Patagonia&nbsp;·&nbsp;Culture&nbsp;Profile
        </a>

        {/* Row 2 — nav links */}
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, overflowX: 'auto' }}>
          {navLinks.map(link => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <li key={link.href} style={{ flexShrink: 0 }}>
                <a
                  href={link.href}
                  onClick={e => handleLinkClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'block',
                    paddingRight: '28px',
                    paddingBottom: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.02em',
                    color: isActive ? '#000000' : '#888888',
                    textDecoration: 'none',
                    borderBottom: isActive ? '2px solid #000000' : '2px solid transparent',
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
