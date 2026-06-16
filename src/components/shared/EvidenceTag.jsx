const tagStyles = {
  'Glassdoor': { bg: '#e8f4ea', color: '#2d7a40' },
  'Patagonia.com': { bg: '#e8f0ee', color: 'var(--color-river)' },
  'News': { bg: '#fdf0e8', color: 'var(--color-rust)' },
  'LinkedIn': { bg: '#e8eef8', color: '#2d4a8a' },
  'Academic': { bg: '#f0edf8', color: '#5a3d8a' },
  'Progress Report 2025': { bg: '#e8f0ee', color: 'var(--color-river)' },
};

export default function EvidenceTag({ source }) {
  const style = tagStyles[source] || { bg: 'var(--color-glacier)', color: 'var(--color-earth)' };
  return (
    <span
      title={source}
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: 'var(--radius)',
        fontSize: 'var(--text-xs)',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        letterSpacing: '0.04em',
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.color}33`,
        cursor: 'default',
        transition: 'transform 150ms ease, box-shadow 150ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {source}
    </span>
  );
}
