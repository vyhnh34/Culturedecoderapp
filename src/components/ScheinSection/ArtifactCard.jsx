import EvidenceTag from '../shared/EvidenceTag';

export default function ArtifactCard({ artifact }) {
  return (
    <article
      className="evidence-card"
      style={{
        padding: '24px',
        backgroundColor: 'var(--color-white)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
      tabIndex={0}
    >
      <div style={{
        fontSize: '24px',
        lineHeight: 1,
      }} aria-hidden="true">
        {artifact.icon}
      </div>
      <h4 style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-base)',
        fontWeight: 600,
        color: 'var(--color-earth)',
        lineHeight: 'var(--leading-sm)',
      }}>
        {artifact.title}
      </h4>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        lineHeight: 'var(--leading-sm)',
        color: '#444',
        flexGrow: 1,
      }}>
        {artifact.evidence}
      </p>
      <EvidenceTag source={artifact.source} />
    </article>
  );
}
