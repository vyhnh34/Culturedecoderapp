import { useRef, useEffect, useState } from 'react';

export default function TensionCard({ card }) {
  const barRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <article style={{
      borderRadius: 'var(--radius)',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden',
    }}>
      {/* Card header */}
      <div style={{
        padding: '18px 24px 14px',
        backgroundColor: '#000000',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          fontWeight: 800,
          letterSpacing: '0.01em',
          color: '#FFFFFF',
        }}>
          {card.title}
        </h3>
      </div>

      {/* 3-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: '1px solid rgba(0,0,0,0.12)',
      }}>
        {[
          { label: 'Says', content: card.says },
          { label: 'Does', content: card.does },
          { label: 'Signals', content: card.signals },
        ].map((col, i) => (
          <div key={col.label} style={{
            padding: '20px',
            borderRight: i < 2 ? '1px solid rgba(0,0,0,0.12)' : 'none',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#000000',
              marginBottom: '8px',
            }}>
              {col.label}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-sm)',
              color: 'rgba(0,0,0,0.8)',
            }}>
              {col.content}
            </p>
          </div>
        ))}
      </div>

      {/* Gap meter */}
      <div ref={barRef} style={{ padding: '16px 24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: '#000000',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Gap
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            color: '#B3261E',
          }}>
            {card.gap}%
          </span>
        </div>
        <div style={{
          height: '6px',
          backgroundColor: '#f0ece8',
          borderRadius: '3px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            borderRadius: '3px',
            backgroundColor: '#B3261E',
            width: animated ? `${card.gap}%` : '0%',
            transition: 'width 800ms ease',
          }} />
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'rgba(0,0,0,0.6)',
          marginTop: '6px',
        }}>
          {card.source}
        </p>
      </div>
    </article>
  );
}
