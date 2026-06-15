import SectionHeader from '../shared/SectionHeader';
import TensionCard from './TensionCard';
import { tensionCards } from '../../data/tensionCards';

export default function TensionsSection() {
  return (
    <section id="tensions" style={{ backgroundColor: 'var(--color-orange)', color: '#FFFFFF' }}>
      <div className="max-w-content" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '24px', fontWeight: 300, letterSpacing: '0.08em', marginBottom: '16px' }}>04</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px, 9vw, 110px)', lineHeight: 0.92, fontWeight: 400, letterSpacing: '-0.02em' }}>Tensions</h2>
      </div>
      <div className="max-w-content section-padding">
        <SectionHeader
          eyebrow="Culture Gaps & Tensions"
          title="What It Says vs. What It Does"
          lead="A company whose brand is built on radical authenticity must now navigate the gap between its founding mythology and its present-day operational reality."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))',
          gap: '20px',
        }}>
          {tensionCards.map(card => (
            <TensionCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
