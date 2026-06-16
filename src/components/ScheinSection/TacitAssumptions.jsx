import { useState, useCallback } from 'react';
import { tacitAssumptions } from '../../data/tacitAssumptions';

function AssumptionCard({ assumption }) {
  const [view, setView] = useState('belief');
  const [contentVisible, setContentVisible] = useState(true);
  const isEvidence = view === 'evidence';

  const handleViewChange = useCallback((newView) => {
    if (newView === view) return;
    setContentVisible(false);
    setTimeout(() => {
      setView(newView);
      setContentVisible(true);
    }, 150);
  }, [view]);

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
        display: 'inline-flex',
        gap: '4px',
        marginBottom: '24px',
        padding: '4px',
        backgroundColor: 'rgba(0,0,0,0.07)',
        borderRadius: '999px',
        width: 'fit-content',
      }} role="group" aria-label="Toggle view">
        {[
          { key: 'belief', label: 'What employees believe' },
          { key: 'evidence', label: 'What evidence shows' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => handleViewChange(tab.key)}
            aria-pressed={view === tab.key}
            style={{
              padding: '8px 16px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              border: 'none',
              whiteSpace: 'nowrap',
              backgroundColor: view === tab.key ? '#000000' : 'transparent',
              color: view === tab.key ? '#FFFFFF' : 'rgba(0,0,0,0.6)',
              boxShadow: view === tab.key ? '0 2px 6px rgba(0,0,0,0.25)' : 'none',
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
        opacity: contentVisible ? 1 : 0,
        transform: contentVisible ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 150ms ease, transform 150ms ease',
      }}>
        {(isEvidence ? assumption.challenges : assumption.supports).map((point, i) => (
          <div key={i} style={{
            padding: '16px 20px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: 'var(--radius)',
            transition: 'opacity 200ms ease',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-sm)',
              color: '#000000',
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
