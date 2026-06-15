import { useState } from 'react';
import SectionHeader from '../shared/SectionHeader';
import EvidenceTag from '../shared/EvidenceTag';

const NORMAL = { sociability: 7.5, solidarity: 8.0 };
const DRIFTED = { sociability: 7.2, solidarity: 7.0 };

const quadrants = [
  {
    id: 'communal',
    label: 'COMMUNAL',
    desc: 'High Sociability + High Solidarity. People genuinely like each other and share a common purpose. The most powerful — and most fragile — archetype.',
  },
  {
    id: 'networked',
    label: 'NETWORKED',
    desc: 'High Sociability + Low Solidarity. Strong personal relationships but loose alignment on mission. Great for informal collaboration; poor for unified execution.',
  },
  {
    id: 'mercenary',
    label: 'MERCENARY',
    desc: 'Low Sociability + High Solidarity. Tightly aligned on goals, but impersonal. High performance in stable markets; struggles with loyalty and retention.',
  },
  {
    id: 'fragmented',
    label: 'FRAGMENTED',
    desc: 'Low Sociability + Low Solidarity. Individual contributors; minimal coordination. Common in academic or specialist environments.',
  },
];

const sociabilityEvidence = [
  { stat: '4%', label: 'employee turnover', sub: 'vs 57% US retail avg' },
  { stat: '4.4/5', label: 'Glassdoor culture & values', sub: '' },
  { stat: '95%', label: 'maternity leave return rate', sub: '' },
  { stat: '79%', label: 'would recommend to a friend', sub: 'Glassdoor' },
];

const solidarityEvidence = [
  { stat: 'Earth', label: 'is the sole shareholder', sub: 'since 2022' },
  { stat: 'Paid', label: 'activism + bail coverage', sub: 'written benefit' },
  { stat: '#1→#8', label: 'reputation ranking drop', sub: 'Harris Poll 2023→2024' },
  { stat: '100%', label: 'Black Friday sales donated', sub: '2016, $10M' },
];

function DotPopover({ show }) {
  if (!show) return null;
  return (
    <div style={{
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: '12px',
      backgroundColor: 'var(--color-earth)',
      border: '1px solid var(--color-river)',
      borderRadius: 'var(--radius)',
      padding: '16px',
      width: '240px',
      zIndex: 10,
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    }} role="tooltip">
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 700,
        letterSpacing: '0.1em',
        color: 'var(--color-river)',
        textTransform: 'uppercase',
        marginBottom: '8px',
      }}>
        Patagonia
      </p>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-glacier)',
        lineHeight: 'var(--leading-sm)',
      }}>
        Sociability: 7.5/10 · Solidarity: 8.0/10. Firmly Communal, built on a shared mission that is legally binding — not just aspirational.
      </p>
    </div>
  );
}

export default function GoffeeJonesGrid() {
  const [drifted, setDrifted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [activeQuadrant, setActiveQuadrant] = useState(null);

  const plotPos = drifted ? DRIFTED : NORMAL;

  // SVG grid is 400×400 viewBox
  // X axis: sociability (left=low, right=high) → map 0–10 to 0–400
  // Y axis: solidarity (bottom=low, top=high) → map 0–10 to 400–0
  // LEFT = high sociability, so invert X
  const toSvgX = (s) => (1 - s / 10) * 400;
  const toSvgY = (s) => (1 - s / 10) * 400;

  const dotX = toSvgX(plotPos.sociability);
  const dotY = toSvgY(plotPos.solidarity);

  return (
    <section id="goffee-jones" style={{ backgroundColor: 'var(--color-blue)', color: '#FFFFFF' }}>
      <div className="max-w-content" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '24px', fontWeight: 300, letterSpacing: '0.08em', marginBottom: '16px' }}>02</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px, 9vw, 110px)', lineHeight: 0.92, fontWeight: 400, letterSpacing: '-0.02em' }}>Goffee & Jones</h2>
      </div>
      <div className="max-w-content section-padding">
        <SectionHeader
          eyebrow="Framework 02 — Goffee & Jones (1998)"
          title="Sociability × Solidarity"
          lead="Where does Patagonia sit on the grid? High on both axes places it firmly in the Communal quadrant — but post-2022 restructuring is adding pressure."
          river
        />

        {/* Quadrant grid */}
        <div style={{ position: 'relative', marginBottom: '48px' }}>
          <svg
            viewBox="0 0 400 400"
            style={{ width: '100%', maxWidth: '520px', display: 'block', margin: '0 auto' }}
            aria-label="Goffee and Jones quadrant grid showing Patagonia positioned in the Communal quadrant"
            role="img"
          >
            {/* Background quadrants */}
            <rect x="0" y="0" width="200" height="200" fill="rgba(255,255,255,0.12)" />
            <rect x="200" y="0" width="200" height="200" fill="rgba(255,255,255,0.04)" />
            <rect x="0" y="200" width="200" height="200" fill="rgba(255,255,255,0.04)" />
            <rect x="200" y="200" width="200" height="200" fill="rgba(0,0,0,0.06)" />

            {/* Axes */}
            <line x1="200" y1="0" x2="200" y2="400" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

            {/* Axis labels */}
            <text x="8" y="196" fontFamily="var(--font-body)" fontSize="9" fill="#FFFFFF" textAnchor="start" fontWeight="600">HIGH</text>
            <text x="8" y="208" fontFamily="var(--font-body)" fontSize="9" fill="#FFFFFF" textAnchor="start" fontWeight="600">SOCIABILITY</text>
            <text x="370" y="196" fontFamily="var(--font-body)" fontSize="9" fill="#FFFFFF" textAnchor="end" fontWeight="600">LOW</text>
            <text x="370" y="208" fontFamily="var(--font-body)" fontSize="9" fill="#FFFFFF" textAnchor="end" fontWeight="600">SOCIABILITY</text>
            <text x="200" y="13" fontFamily="var(--font-body)" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="600">HIGH SOLIDARITY</text>
            <text x="200" y="397" fontFamily="var(--font-body)" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontWeight="600">LOW SOLIDARITY</text>

            {/* Quadrant labels — HIGH sociability = LEFT */}
            <text x="100" y="40" fontFamily="var(--font-body)" fontSize="11" fontWeight="800" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">COMMUNAL</text>
            <text x="300" y="40" fontFamily="var(--font-body)" fontSize="11" fontWeight="700" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">MERCENARY</text>
            <text x="100" y="388" fontFamily="var(--font-body)" fontSize="11" fontWeight="700" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">NETWORKED</text>
            <text x="300" y="388" fontFamily="var(--font-body)" fontSize="11" fontWeight="700" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">FRAGMENTED</text>

            {/* Drift arrow */}
            {drifted && (
              <>
                <line
                  x1={toSvgX(NORMAL.sociability)}
                  y1={toSvgY(NORMAL.solidarity)}
                  x2={dotX}
                  y2={dotY}
                  stroke="var(--color-rust)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  opacity="0.7"
                />
                <text
                  x={dotX + 14}
                  y={dotY - 8}
                  fontFamily="var(--font-body)"
                  fontSize="9"
                  fill="var(--color-rust)"
                >
                  Post-restructuring drift
                </text>
              </>
            )}

            {/* Patagonia dot */}
            <g
              transform={`translate(${dotX}, ${dotY})`}
              style={{ transition: 'transform 600ms ease', cursor: 'pointer' }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              role="button"
              tabIndex={0}
              aria-label="Patagonia data point — hover for details"
              onFocus={() => setHovering(true)}
              onBlur={() => setHovering(false)}
            >
              <circle
                r="12"
                fill="rgba(255,255,255,0.2)"
              />
              <circle
                r="7"
                fill="#FFFFFF"
              />
              <text
                x="14"
                y="-10"
                fontFamily="var(--font-body)"
                fontSize="10"
                fontWeight="800"
                fill="#FFFFFF"
                textAnchor="start"
              >
                PATAGONIA
              </text>
            </g>
          </svg>

          {/* Popover */}
          {hovering && (
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: '-140px',
              backgroundColor: 'var(--color-earth)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 'var(--radius)',
              padding: '16px 20px',
              width: '260px',
              zIndex: 10,
              pointerEvents: 'none',
            }} role="tooltip">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-sky)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Patagonia · Communal
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-glacier)', lineHeight: 'var(--leading-sm)' }}>
                Sociability: 7.5/10 — shared outdoor identity and genuine care.<br />
                Solidarity: 8.0/10 — mission legally embedded; all-hands activism.
              </p>
            </div>
          )}
        </div>

        {/* Show drift button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <button
            onClick={() => setDrifted(d => !d)}
            style={{
              padding: '12px 28px',
              border: '2px solid rgba(255,255,255,0.5)',
              borderRadius: '999px',
              backgroundColor: drifted ? 'rgba(181,73,10,0.85)' : 'transparent',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
            onMouseEnter={e => { if (!drifted) e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { if (!drifted) e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {drifted ? '← Show original position' : 'Show what changed (2024) →'}
          </button>
        </div>

        {drifted && (
          <div style={{
            padding: '20px 24px',
            borderLeft: '4px solid #FFFFFF',
            backgroundColor: '#FAF7E9',
            borderRadius: 'var(--radius)',
            marginBottom: '48px',
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: '#000000' }}>
              June–Sept 2024 layoffs strain solidarity. Reputation rank: #1 → #8 (Harris Poll).
            </p>
          </div>
        )}

        {/* Evidence table */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginTop: '16px',
        }}>
          {[
            { title: 'Sociability Evidence', items: sociabilityEvidence },
            { title: 'Solidarity Evidence', items: solidarityEvidence },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                marginBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.15)',
                paddingBottom: '10px',
              }}>
                {col.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.items.map(item => (
                  <div key={item.label} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '14px 16px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius)',
                    backgroundColor: '#FAF7E9',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-lg)',
                      color: '#000000',
                      fontWeight: 800,
                      flexShrink: 0,
                      minWidth: '52px',
                      lineHeight: 1,
                    }}>
                      {item.stat}
                    </span>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: '#000000', fontWeight: 500 }}>
                        {item.label}
                      </p>
                      {item.sub && (
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: '#000000', marginTop: '2px' }}>
                          {item.sub}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quadrant definitions */}
        <details style={{ marginTop: '40px' }}>
          <summary style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '14px 0',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            listStyle: 'none',
          }}>
            What each quadrant means ↓
          </summary>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            paddingTop: '20px',
          }}>
            {quadrants.map(q => (
              <div key={q.id} style={{
                padding: '16px',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius)',
                backgroundColor: '#FAF7E9',
              }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 800, letterSpacing: '0.1em', color: '#000000', marginBottom: '6px' }}>
                  {q.label}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: '#000000', lineHeight: 1.5 }}>
                  {q.desc}
                </p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
