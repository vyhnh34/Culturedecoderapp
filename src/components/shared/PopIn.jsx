import { useRef, useEffect, useState } from 'react';

export default function PopIn({ children, delay = 0, threshold = 0.15, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(14px)',
        transition: 'opacity 380ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
