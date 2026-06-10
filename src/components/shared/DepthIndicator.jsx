import { useState, useEffect } from 'react';

const levels = [
  { id: 'artifacts', label: 'Surface', depth: 1 },
  { id: 'espoused', label: 'Espoused', depth: 2 },
  { id: 'tacit', label: 'Tacit', depth: 3 },
];

export default function DepthIndicator({ activeScheinLevel }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scheinSection = document.getElementById('schein');
    if (!scheinSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(scheinSection);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      className="depth-indicator"
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '12px 10px',
        backgroundColor: 'rgba(26,26,26,0.82)',
        backdropFilter: 'blur(6px)',
        borderRadius: '4px',
        border: '1px solid rgba(45,95,82,0.4)',
      }}
    >
      {levels.map((level) => {
        const isActive = activeScheinLevel === level.id;
        const strokeWidth = level.depth * 1.2;
        return (
          <div key={level.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <ellipse
                cx="12" cy="12"
                rx={10 - level.depth * 1.5}
                ry={7 - level.depth * 0.8}
                stroke={isActive ? 'var(--color-river)' : 'rgba(197,212,208,0.4)'}
                strokeWidth={isActive ? strokeWidth + 0.8 : strokeWidth}
                fill="none"
              />
            </svg>
            <span style={{
              fontSize: '10px',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isActive ? '#FFFFFF' : 'rgba(197,212,208,0.55)',
              fontWeight: isActive ? 700 : 500,
              transition: 'color 200ms ease',
              whiteSpace: 'nowrap',
            }}>
              {level.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
