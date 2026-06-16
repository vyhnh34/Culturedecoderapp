import { useState } from 'react';
import SectionHeader from '../shared/SectionHeader';
import EvidenceTag from '../shared/EvidenceTag';
import { sources } from '../../data/sources';

const allTypes = ['Glassdoor', 'Patagonia.com', 'News', 'LinkedIn', 'Academic'];

const sectionLabels = {
  'schein': 'Schein Levels',
  'goffee-jones': 'Goffee & Jones',
  'design-maturity': 'Design Maturity',
  'tensions': 'Tensions',
};

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function SourcesSection() {
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (type) => {
    setActiveFilters(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filtered = activeFilters.length === 0
    ? sources
    : sources.filter(s => activeFilters.includes(s.type));

  return (
    <section id="sources" style={{ backgroundColor: 'var(--color-sand)', color: 'var(--color-black)' }}>
      <div className="max-w-content" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '24px', fontWeight: 300, letterSpacing: '0.08em', marginBottom: '16px' }}>05</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px, 9vw, 110px)', lineHeight: 0.92, fontWeight: 400, letterSpacing: '-0.02em' }}>Sources</h2>
      </div>
      <div className="max-w-content section-padding">
        <SectionHeader
          eyebrow="Evidence Index"
          title="All Sources"
          lead="Every claim in this analysis traces back to a real source. Filter by type or click a row to jump to the relevant section."
        />

        {/* Filter chips */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '32px',
        }} role="group" aria-label="Filter sources by type">
          {allTypes.map(type => {
            const active = activeFilters.includes(type);
            return (
              <button
                key={type}
                onClick={() => toggleFilter(type)}
                aria-pressed={active}
                style={{
                  padding: '6px 14px',
                  border: `1px solid ${active ? '#000000' : 'rgba(0,0,0,0.2)'}`,
                  borderRadius: '999px',
                  backgroundColor: active ? '#000000' : 'transparent',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: active ? '#FFFFFF' : '#000000',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {type}
              </button>
            );
          })}
          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              style={{
                padding: '6px 14px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '999px',
                backgroundColor: 'transparent',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: '#000000',
                cursor: 'pointer',
                transition: 'transform 150ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Clear
            </button>
          )}
        </div>

        {activeFilters.length > 0 && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: 'rgba(0,0,0,0.55)',
            marginBottom: '16px',
            marginTop: '-16px',
          }}>
            Showing {filtered.length} of {sources.length} sources
          </p>
        )}

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: "'Inter', sans-serif",
            fontSize: 'var(--text-sm)',
          }}>
            <thead>
              <tr>
                {['Source', 'Quote / Signal', 'Framework', 'Year', 'Section'].map(h => (
                  <th key={h} style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#000000',
                    borderBottom: '1px solid #333',
                    whiteSpace: 'nowrap',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((src, i) => (
                <tr
                  key={src.id}
                  style={{
                    borderBottom: '1px solid #2a2a2a',
                    transition: 'background-color 150ms ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => scrollToSection(src.section)}
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && scrollToSection(src.section)}
                  role="row"
                  aria-label={`${src.type}: ${src.quote}`}
                >
                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ textDecoration: 'none', display: 'inline-block' }}
                      aria-label={`Open external source for: ${src.quote}`}
                    >
                      <EvidenceTag source={src.type} />
                    </a>
                  </td>
                  <td style={{
                    padding: '14px 16px',
                    lineHeight: 'var(--leading-sm)',
                    color: '#000000',
                    maxWidth: '440px',
                  }}>
                    {src.quote}
                  </td>
                  <td style={{
                    padding: '14px 16px',
                    color: '#000000',
                    whiteSpace: 'nowrap',
                  }}>
                    {src.framework}
                  </td>
                  <td style={{
                    padding: '14px 16px',
                    color: '#000000',
                    whiteSpace: 'nowrap',
                  }}>
                    {src.year}
                  </td>
                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); scrollToSection(src.section); }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 'var(--text-sm)',
                        color: '#000000',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        padding: 0,
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        borderRadius: '999px',
                        transition: 'transform 150ms ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                      {sectionLabels[src.section] || src.section} →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p style={{
              textAlign: 'center',
              padding: '48px',
              color: '#000000',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
            }}>
              No sources match the selected filters.
            </p>
          )}
        </div>

        <p style={{
          marginTop: '32px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          color: '#000000',
          borderTop: '1px solid #2a2a2a',
          paddingTop: '16px',
        }}>
          All evidence drawn from public sources: Patagonia.com, Glassdoor, Fast Company, Fortune, Business of Fashion, FourWeekMBA, Harris Poll. Academic frameworks: Schein (2010), Goffee & Jones (1998).
        </p>
      </div>
    </section>
  );
}
