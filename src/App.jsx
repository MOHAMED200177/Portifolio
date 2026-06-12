import { useEffect, useRef } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { useScrollReveal } from './hooks/useScrollReveal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import FreelanceShowcase from './sections/FreelanceShowcase';
import Education from './sections/Education';
import Contact from './sections/Contact';

function CursorGlow() {
  const cursorRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />;
}

function ScrollProgress() {
  const barRef = useRef(null);
  useEffect(() => {
    const update = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-transparent" aria-hidden="true">
      <div ref={barRef} className="h-full bg-[#E8FF47] transition-none" style={{ width: '0%' }} />
    </div>
  );
}

function AppContent() {
  useScrollReveal();
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <FreelanceShowcase />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
