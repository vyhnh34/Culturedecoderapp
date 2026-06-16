export default function SectionHeader({ eyebrow, title, lead, light = false, river = false }) {
  // river = section on --color-river background (white text)
  const titleColor = light || river ? '#FFFFFF' : 'var(--color-earth)';
  // eyebrow/lead are always sub-24px text, so on a mid-tone "light" background
  // (e.g. --color-green) white fails AA contrast — use black instead.
  const eyebrowColor = river ? '#FFFFFF' : light ? '#000000' : 'var(--color-river)';
  const leadColor = river ? '#FFFFFF' : light ? '#000000' : '#3a3a3a';

  return (
    <div style={{ marginBottom: '48px' }}>
      {eyebrow && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          lineHeight: 'var(--leading-xs)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: eyebrowColor,
          marginBottom: '14px',
          fontWeight: 700,
        }}>
          {eyebrow}
        </p>
      )}
      <h2 style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(32px, 4vw, var(--text-2xl))',
        lineHeight: 1.05,
        color: titleColor,
        fontWeight: 400,
        letterSpacing: '-0.02em',
        marginBottom: lead ? '20px' : 0,
      }}>
        {title}
      </h2>
      {lead && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          lineHeight: 1.65,
          color: leadColor,
          maxWidth: '620px',
          fontWeight: light ? 500 : 400,
        }}>
          {lead}
        </p>
      )}
    </div>
  );
}
