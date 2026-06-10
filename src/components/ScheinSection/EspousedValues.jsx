import { espousedValues, espousedTension } from '../../data/espousedValues';
import EvidenceTag from '../shared/EvidenceTag';

function ValuesTicker() {
  const items = [...espousedValues, ...espousedValues];
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--color-river)',
      borderBottom: '1px solid var(--color-river)',
      padding: '16px 0',
      marginBottom: '48px',
    }}>
      <div className="ticker-track">
        {items.map((v, i) => (
          <span key={`${v.id}-${i}`} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-earth)',
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
        border: '1px solid var(--color-glacier)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }} role="table" aria-label="Espoused values vs evidence">
        {/* Header row */}
        <div style={{
          padding: '12px 20px',
          backgroundColor: 'var(--color-earth)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-glacier)',
        }} role="columnheader">
          What they say
        </div>
        <div style={{
          padding: '12px 20px',
          backgroundColor: 'var(--color-earth)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-glacier)',
          borderLeft: '1px solid #333',
        }} role="columnheader">
          Evidence it's real
        </div>

        {/* Data rows */}
        {espousedValues.map((v, i) => (
          <div key={v.id} style={{ display: 'contents' }} role="row">
            <div style={{
              padding: '20px',
              backgroundColor: i % 2 === 0 ? 'var(--color-white)' : '#faf9f6',
              borderTop: '1px solid var(--color-glacier)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-sm)',
              fontStyle: 'italic',
              color: 'var(--color-earth)',
            }} role="cell">
              "{v.says}"
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: i % 2 === 0 ? 'var(--color-white)' : '#faf9f6',
              borderTop: '1px solid var(--color-glacier)',
              borderLeft: '1px solid var(--color-glacier)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-sm)',
              color: '#444',
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
        borderLeft: '4px solid var(--color-rust)',
        backgroundColor: '#fdf0e8',
        borderRadius: 'var(--radius)',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-sm)',
          lineHeight: 'var(--leading-base)',
          color: 'var(--color-rust)',
          marginBottom: '8px',
        }}>
          {espousedTension.text}
        </p>
        <footer style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          color: '#8a4020',
          letterSpacing: '0.05em',
        }}>
          — {espousedTension.date} · {espousedTension.source}
        </footer>
      </blockquote>
    </div>
  );
}
