import SectionHeader from '../shared/SectionHeader';
import TensionCard from './TensionCard';
import { tensionCards } from '../../data/tensionCards';

export default function TensionsSection() {
  return (
    <section id="tensions" style={{ backgroundColor: 'var(--color-white)' }}>
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
