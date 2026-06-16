import { useEffect, useRef, useState } from 'react';

// SVG animates itself (CSS keyframes baked in):
// 0–560ms    wave bands cascade down
// 560–800ms  white wave body rises
// 820–2100ms letters stagger up left-to-right
// 2500ms     overlay curtain-wipes up to reveal app

export default function LoadingScreen({ onComplete }) {
  const [leaving, setLeaving] = useState(false);
  // Unique key per mount so the <img> always re-fetches and CSS animations restart
  const sessionKey = useRef(Date.now()).current;

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 2500);
    const t2 = setTimeout(() => onComplete(), 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000000',
        overflow: 'hidden',
        transform: leaving ? 'translateY(-100%)' : 'translateY(0)',
        transition: leaving
          ? 'transform 800ms cubic-bezier(0.76, 0, 0.24, 1)'
          : 'none',
      }}
    >
      <img
        key={sessionKey}
        src={`/finish.svg?v=${sessionKey}`}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
