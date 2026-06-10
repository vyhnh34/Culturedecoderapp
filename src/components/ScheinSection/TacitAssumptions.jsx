import { useState } from 'react';
import { tacitAssumptions } from '../../data/tacitAssumptions';

function AssumptionCard({ assumption }) {
  const [view, setView] = useState('belief');
  const isEvidence = view === 'evidence';

  return (
    <article style={{
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      paddingBottom: '40px',
      marginBottom: '40px',
    }}>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-xl)',
        lineHeight: 'var(--leading-xl)',
        color: 'var(--color-stone)',
        fontStyle: 'italic',
        marginBottom: '24px',
      }}>
        "{assumption.belief}"
      </p>

      {/* Toggle */}
      <div style={{
        display: 'flex',
        gap: '0',
        marginBottom: '24px',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        width: 'fit-content',
      }} role="group" aria-label="Toggle view">
        {[
          { key: 'belief', label: 'What employees believe' },
          { key: 'evidence', label: 'What evidence shows' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key)}
            aria-pressed={view === tab.key}
            style={{
              padding: '8px 16px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: view === tab.key ? 'var(--color-river)' : 'transparent',
              color: view === tab.key ? 'var(--color-white)' : 'var(--color-glacier)',
              transition: 'background-color 200ms ease, color 200ms ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content — cross-fade */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
      }}>
        {(isEvidence ? assumption.challenges : assumption.supports).map((point, i) => (
          <div key={i} style={{
            padding: '16px 20px',
            borderLeft: `3px solid ${isEvidence ? 'var(--color-rust)' : 'var(--color-river)'}`,
            backgroundColor: 'rgba(255,255,255,0.04)',
            borderRadius: 'var(--radius)',
            transition: 'opacity 200ms ease',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-sm)',
              color: isEvidence ? '#f4a57a' : 'var(--color-glacier)',
            }}>
              {point}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function TacitAssumptions() {
  return (
    <div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-glacier)',
        marginBottom: '40px',
        letterSpacing: '0.03em',
      }}>
        These are not written down. They are the invisible rules that determine what actually gets rewarded, tolerated, and punished.
      </p>
      {tacitAssumptions.map(assumption => (
        <AssumptionCard key={assumption.id} assumption={assumption} />
      ))}
    </div>
  );
}
