import { useState, useEffect } from 'react';

const stats = [
  { value: 4, suffix: '%', label: 'employee turnover', context: 'vs 57% US avg' },
  { value: 180, prefix: '$', suffix: 'M', label: 'donated to Holdfast', context: 'since 2022' },
  { value: 4.4, suffix: '/5', label: 'culture & values', context: 'Glassdoor rating' },
];

const frameworks = ['SCHEIN', 'GOFFEE & JONES', 'DESIGN MATURITY'];

function StatPill({ stat }) {
  return (
    <div style={{
      padding: '28px 32px',
      borderTop: '3px solid var(--color-river)',
      backgroundColor: 'rgba(255,255,255,0.04)',
      flex: '1 1 160px',
      minWidth: '160px',
    }}>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(36px, 5vw, 56px)',
        lineHeight: 1,
        color: '#FFFFFF',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        marginBottom: '8px',
      }}>
        {stat.prefix || ''}{stat.value}{stat.suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'rgba(245,242,237,0.75)',
        fontWeight: 500,
        marginBottom: '2px',
      }}>
        {stat.label}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: 'rgba(143,179,192,0.7)',
      }}>
        {stat.context}
      </div>
    </div>
  );
}

export default function Hero() {
  const [frameworksVisible, setFrameworksVisible] = useState([false, false, false]);

  useEffect(() => {
    const t = setTimeout(() => {
      frameworks.forEach((_, i) => {
        setTimeout(() => {
          setFrameworksVisible(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 800 + i * 280);
      });
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const scrollDown = () => {
    const el = document.getElementById('schein');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="topo-bg"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-earth)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="max-w-content" style={{ paddingTop: '100px', paddingBottom: '80px' }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--color-river)',
          fontWeight: 700,
          marginBottom: '20px',
        }}>
          Design Leadership — Organizational Culture Analysis
        </p>

        {/* Headline — serif for the hero only, per PRD */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px, 9vw, var(--text-3xl))',
          lineHeight: 0.95,
          color: '#FFFFFF',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: '28px',
          maxWidth: '760px',
        }}>
          Reading Patagonia
        </h1>

        {/* Subhead */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-lg)',
          lineHeight: 1.5,
          color: 'rgba(245,242,237,0.72)',
          maxWidth: '540px',
          marginBottom: '20px',
          fontWeight: 400,
        }}>
          What the company actually rewards, tolerates, and punishes — beyond what it says on the tin.
        </p>

        {/* Framework names */}
        <div style={{
          display: 'flex',
          gap: '0',
          marginBottom: '56px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }} aria-label="Frameworks applied">
          {frameworks.map((fw, i) => (
            <span key={fw} style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: 'var(--color-sky)',
              opacity: frameworksVisible[i] ? 1 : 0,
              transform: frameworksVisible[i] ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 400ms ease, transform 400ms ease',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              {fw}
              {i < frameworks.length - 1 && (
                <span style={{ color: 'rgba(197,212,208,0.3)', marginRight: '16px' }}>·</span>
              )}
            </span>
          ))}
        </div>

        {/* Stat pills — flush horizontal strip */}
        <div style={{
          display: 'flex',
          gap: '1px',
          flexWrap: 'wrap',
          marginBottom: '52px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
        }} role="list" aria-label="Key statistics">
          {stats.map(stat => (
            <div key={stat.label} role="listitem" style={{ flex: '1 1 160px' }}>
              <StatPill stat={stat} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={scrollDown}
          style={{
            background: 'var(--color-river)',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: '16px 32px',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'background-color 200ms ease, transform 150ms ease',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#245049'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-river)'}
        >
          Explore the Analysis
          <span aria-hidden="true" style={{ fontSize: '16px' }}>↓</span>
        </button>
      </div>

    </section>
  );
}
