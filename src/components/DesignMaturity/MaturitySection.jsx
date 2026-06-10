import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import SectionHeader from '../shared/SectionHeader';
import { maturityDimensions, overallScore, overallLabel, overallSubLabel, contextualNote } from '../../data/maturityDimensions';

function ScoreBar({ score }) {
  return (
    <div style={{ position: 'relative', height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: `${(score / 5) * 100}%`,
        backgroundColor: 'var(--color-river)',
        borderRadius: '2px',
      }} />
    </div>
  );
}

function DimensionRow({ dim }) {
  return (
    <div style={{
      padding: '20px 0',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '10px',
      }}>
        <h4 style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          fontWeight: 700,
          color: '#FFFFFF',
        }}>
          {dim.dimension}
        </h4>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '22px',
          color: 'var(--color-river)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>
          {dim.score}
          <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(197,212,208,0.55)', fontWeight: 500 }}>/5</span>
        </span>
      </div>
      <ScoreBar score={dim.score} />
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        lineHeight: 1.55,
        color: 'rgba(245,242,237,0.65)',
        marginTop: '8px',
      }}>
        {dim.evidence}
      </p>
    </div>
  );
}

const radarData = maturityDimensions.map(d => ({
  subject: d.shortLabel,
  score: d.score,
  fullMark: 5,
}));

export default function MaturitySection() {
  return (
    <section id="design-maturity" style={{ backgroundColor: 'var(--color-earth)' }}>
      <div className="max-w-content section-padding">
        <SectionHeader
          eyebrow="Framework 03 — Design Maturity Assessment"
          title="How Design-Led Is Patagonia?"
          lead="Five dimensions scored 1–5. Where design shows up in products, in the organization, and in the culture."
          light
        />

        <div className="grid-2-col" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '56px',
          alignItems: 'start',
        }}>
          {/* Radar chart */}
          <div>
            <div style={{ height: '320px' }} aria-hidden="true">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      fill: 'var(--color-glacier)',
                      fontWeight: 600,
                    }}
                  />
                  <Radar
                    name="Patagonia"
                    dataKey="score"
                    stroke="var(--color-river)"
                    fill="var(--color-river)"
                    fillOpacity={0.35}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Accessible table (screen reader) */}
            <table style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
              <caption>Design Maturity radar chart data</caption>
              <thead><tr><th>Dimension</th><th>Score (out of 5)</th></tr></thead>
              <tbody>
                {maturityDimensions.map(d => (
                  <tr key={d.id}><td>{d.dimension}</td><td>{d.score}</td></tr>
                ))}
              </tbody>
            </table>

            {/* Overall score */}
            <div style={{
              textAlign: 'center',
              marginTop: '24px',
              padding: '28px 24px',
              border: '1px solid rgba(45,95,82,0.5)',
              borderRadius: 'var(--radius)',
              backgroundColor: 'rgba(45,95,82,0.15)',
            }}>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '48px',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: 'var(--color-river)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                {overallScore}<span style={{ fontSize: '24px', color: 'rgba(197,212,208,0.5)' }}>/5</span>
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '4px',
              }}>
                {overallLabel}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'rgba(197,212,208,0.65)',
              }}>
                {overallSubLabel}
              </div>
            </div>
          </div>

          {/* Dimension rows */}
          <div>
            {maturityDimensions.map(dim => (
              <DimensionRow key={dim.id} dim={dim} />
            ))}

            {/* Contextual note */}
            <blockquote style={{
              marginTop: '32px',
              padding: '20px 24px',
              borderLeft: '4px solid var(--color-sky)',
              backgroundColor: 'rgba(143, 179, 192, 0.08)',
              borderRadius: 'var(--radius)',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                lineHeight: 'var(--leading-base)',
                color: 'var(--color-glacier)',
              }}>
                {contextualNote}
              </p>
            </blockquote>
          </div>
        </div>

        {/* Mobile bar list (visible only on small screens) */}
        <div style={{ display: 'none' }} className="mobile-bar-list">
          {maturityDimensions.map(d => (
            <div key={d.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-stone)', fontWeight: 600 }}>{d.dimension}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-river)' }}>{d.score}/5</span>
              </div>
              <ScoreBar score={d.score} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .mobile-bar-list { display: block !important; }
          #design-maturity .radar-wrapper { display: none; }
        }
        @media (max-width: 768px) {
          #design-maturity .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
