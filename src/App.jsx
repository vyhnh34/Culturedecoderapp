import { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ScheinSection from './components/ScheinSection/ScheinSection';
import GoffeeJonesGrid from './components/GoffeeJones/GoffeeJonesGrid';
import MaturitySection from './components/DesignMaturity/MaturitySection';
import TensionsSection from './components/Tensions/TensionsSection';
import SourcesSection from './components/SourcesIndex/SourcesSection';
import DepthIndicator from './components/shared/DepthIndicator';

const sectionIds = ['hero', 'schein', 'goffee-jones', 'design-maturity', 'tensions', 'sources'];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeScheinLevel, setActiveScheinLevel] = useState('artifacts');

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  return (
    <>
      <Nav activeSection={activeSection} />
      <DepthIndicator activeScheinLevel={activeScheinLevel} />
      <main>
        <Hero />
        <ScheinSection onLevelChange={setActiveScheinLevel} />
        <GoffeeJonesGrid />
        <MaturitySection />
        <TensionsSection />
        <SourcesSection />
      </main>
      <footer style={{
        backgroundColor: 'var(--color-earth)',
        borderTop: '1px solid #2a2a2a',
        padding: '32px var(--gutter)',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          color: '#555',
          letterSpacing: '0.06em',
        }}>
          Patagonia Culture Profile · Design Leadership Course · Evidence drawn from public sources only
        </p>
      </footer>
    </>
  );
}
