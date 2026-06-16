import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import ArtifactCard from './ArtifactCard';
import EspousedValues from './EspousedValues';
import TacitAssumptions from './TacitAssumptions';
import { artifacts } from '../../data/artifacts';

const cardContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

const layers = [
  {
    id: 'artifacts',
    level: 'Level 1',
    title: 'Artifacts',
    subtitle: 'Surface — what you see, hear, and feel',
    bg: '#FAF7E9',
    textColor: '#000000',
    accentColor: '#000000',
  },
  {
    id: 'espoused',
    level: 'Level 2',
    title: 'Espoused Values',
    subtitle: 'Mid-layer — what the organization says it believes',
    bg: '#EFE9D6',
    textColor: '#000000',
    accentColor: '#000000',
  },
  {
    id: 'tacit',
    level: 'Level 3',
    title: 'Shared Tacit Assumptions',
    subtitle: 'Deep — the invisible rules that actually govern behavior',
    bg: '#E1D8BC',
    textColor: '#000000',
    accentColor: '#000000',
  },
];

function ScheinLayer({ layer, isFirst, isOpen, onToggle, onActive, children }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      id={`schein-${layer.id}`}
      style={{
        backgroundColor: layer.bg,
        borderTop: isFirst ? 'none' : '1px solid rgba(0,0,0,0.15)',
        boxShadow: isFirst ? 'none' : 'inset 0 4px 8px -8px rgba(0,0,0,0.1)',
      }}
    >
      <button
        onClick={() => { onToggle(); onActive(layer.id); }}
        aria-expanded={isOpen}
        aria-controls={`schein-content-${layer.id}`}
        style={{
          width: '100%',
          padding: '32px var(--gutter)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          borderRadius: '999px',
          transition: 'transform 150ms ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '4px' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: layer.textColor,
            }}>
              {layer.level}
            </span>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(0,0,0,0.65)',
              letterSpacing: '0.06em',
            }}>
              {layer.subtitle}
            </span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(22px, 3.5vw, var(--text-xl))',
            lineHeight: 1.1,
            color: layer.textColor,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}>
            {layer.title}
          </h3>
        </div>
        <span style={{
          color: layer.accentColor,
          fontSize: '20px',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 200ms ease',
          flexShrink: 0,
          marginLeft: '16px',
        }} aria-hidden="true">
          ↓
        </span>
      </button>

      <div
        id={`schein-content-${layer.id}`}
        ref={contentRef}
        role="region"
        style={{
          maxHeight: isOpen ? `${height}px` : '0',
          overflow: 'hidden',
          transition: 'max-height 200ms ease',
        }}
      >
        <div className="max-w-content" style={{
          paddingTop: '0',
          paddingBottom: '48px',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ScheinSection({ onLevelChange }) {
  const [openLayer, setOpenLayer] = useState('artifacts');

  const toggle = (id) => {
    setOpenLayer(prev => prev === id ? null : id);
  };

  const handleActive = (id) => {
    onLevelChange(id);
  };

  return (
    <section id="schein" aria-labelledby="schein-title" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-black)' }}>
      <div className="max-w-content" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '24px', fontWeight: 300, letterSpacing: '0.08em', marginBottom: '16px' }}>01</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px, 9vw, 110px)', lineHeight: 0.92, fontWeight: 400, letterSpacing: '-0.02em' }}>Schein's Three Levels</h2>
      </div>
      <div className="max-w-content section-padding">
        <SectionHeader
          eyebrow="Framework 01 — Edgar Schein (2010)"
          title="Three Levels of Culture"
          lead="Schein's model reveals culture not as a single layer but as geological strata — each level deeper, less visible, and more resistant to change."
        />
      </div>

      {/* Stacked layers */}
      {layers.map((layer, i) => (
        <ScheinLayer
          key={layer.id}
          layer={layer}
          isFirst={i === 0}
          isOpen={openLayer === layer.id}
          onToggle={() => toggle(layer.id)}
          onActive={handleActive}
        >
          {layer.id === 'artifacts' && (
            <motion.div
              variants={cardContainerVariants}
              initial="hidden"
              animate={openLayer === 'artifacts' ? 'show' : 'hidden'}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px',
                marginTop: '32px',
              }}
            >
              {artifacts.map(a => (
                <motion.div key={a.id} variants={cardItemVariants}>
                  <ArtifactCard artifact={a} />
                </motion.div>
              ))}
            </motion.div>
          )}
          {layer.id === 'espoused' && <EspousedValues />}
          {layer.id === 'tacit' && <TacitAssumptions />}
        </ScheinLayer>
      ))}
    </section>
  );
}
