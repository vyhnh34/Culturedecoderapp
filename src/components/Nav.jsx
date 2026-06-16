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
  const listRef = useRef(null);
  const linkRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

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

  useEffect(() => {
    const activeIndex = navLinks.findIndex(l => l.href.slice(1) === activeSection);
    if (activeIndex < 0 || !linkRefs.current[activeIndex] || !listRef.current) {
      setIndicatorStyle(s => ({ ...s, opacity: 0 }));
      return;
    }
    const linkEl = linkRefs.current[activeIndex];
    const listEl = listRef.current;
    const listRect = listEl.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    setIndicatorStyle({
      left: linkRect.left - listRect.left,
      width: linkRect.width - 28,
      opacity: 1,
    });
  }, [activeSection]);

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

        {/* Row 2 — nav links with sliding indicator */}
        <ul
          ref={listRef}
          style={{ position: 'relative', display: 'flex', listStyle: 'none', margin: 0, padding: 0, overflowX: 'auto' }}
        >
          {navLinks.map((link, i) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <li key={link.href} style={{ flexShrink: 0 }}>
                <a
                  ref={el => linkRefs.current[i] = el}
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
                    transition: 'color 300ms ease, font-weight 0ms',
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          {/* Sliding underline */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              height: '2px',
              backgroundColor: '#000000',
              opacity: indicatorStyle.opacity,
              transition: 'left 300ms ease, width 300ms ease, opacity 200ms ease',
              pointerEvents: 'none',
            }}
          />
        </ul>
      </div>
    </nav>
  );
}
