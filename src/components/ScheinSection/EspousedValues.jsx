import { useRef, useEffect } from 'react';
import { espousedValues, espousedTension } from '../../data/espousedValues';
import EvidenceTag from '../shared/EvidenceTag';

function ValuesTicker() {
  const trackRef = useRef(null);
  const items = [...espousedValues, ...espousedValues];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const pause = () => { el.style.animationPlayState = 'paused'; };
    const resume = () => { el.style.animationPlayState = 'running'; };
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resume, { passive: true });
    return () => {
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resume);
    };
  }, []);

  return (
    <div style={{
      overflow: 'hidden',
      padding: '16px 0',
      marginBottom: '48px',
    }}>
      <div ref={trackRef} className="ticker-track">
        {items.map((v, i) => (
          <span key={`${v.id}-${i}`} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            color: '#000000',
            whiteSpace: 'nowrap',
            paddingRight: '64px',
            fontStyle: 'italic',
          }}>
            {v.says}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function EspousedValues() {
  return (
    <div>
      <ValuesTicker />

      {/* Two-column evidence table */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }} role="table" aria-label="Espoused values vs evidence">
        {/* Header row */}
        <div style={{
          padding: '12px 20px',
          backgroundColor: 'var(--color-sand)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#000000',
        }} role="columnheader">
          What they say
        </div>
        <div style={{
          padding: '12px 20px',
          backgroundColor: 'var(--color-sand)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#000000',
        }} role="columnheader">
          Evidence it's real
        </div>

        {/* Data rows */}
        {espousedValues.map((v, i) => (
          <div key={v.id} style={{ display: 'contents' }} role="row">
            <div style={{
              padding: '20px',
              backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#faf9f6',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-sm)',
              fontStyle: 'italic',
              color: '#000000',
            }} role="cell">
              "{v.says}"
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#faf9f6',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-sm)',
              color: '#000000',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              justifyContent: 'space-between',
            }} role="cell">
              <span>{v.evidence}</span>
              <EvidenceTag source={v.source} />
            </div>
          </div>
        ))}
      </div>

      {/* Tension callout */}
      <blockquote style={{
        marginTop: '32px',
        padding: '24px',
        backgroundColor: '#fdf0e8',
        borderRadius: 'var(--radius)',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          lineHeight: 'var(--leading-base)',
          color: '#000000',
          marginBottom: '8px',
        }}>
          {espousedTension.text}
        </p>
        <footer style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          color: '#000000',
          letterSpacing: '0.05em',
        }}>
          — {espousedTension.date} · {espousedTension.source}
        </footer>
      </blockquote>
    </div>
  );
}
