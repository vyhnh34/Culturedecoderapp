import { useState } from 'react';
import { tacitAssumptions } from '../../data/tacitAssumptions';

function AssumptionCard({ assumption }) {
  const [view, setView] = useState('belief');
  const isEvidence = view === 'evidence';

  return (
    <article style={{
      paddingBottom: '40px',
      marginBottom: '40px',
    }}>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-xl)',
        lineHeight: 'var(--leading-xl)',
        color: '#000000',
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
              whiteSpace: 'nowrap',
              backgroundColor: view === tab.key ? 'var(--color-river)' : 'transparent',
              color: '#000000',
              transition: 'background-color 200ms ease, color 200ms ease, transform 150ms ease',
              borderRadius: '999px',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
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
            backgroundColor: '#000000',
            borderRadius: 'var(--radius)',
            transition: 'opacity 200ms ease',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-sm)',
              color: '#FAF7E9',
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
        color: '#000000',
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
