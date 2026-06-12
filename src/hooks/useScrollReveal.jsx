import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function useActiveSection() {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            navLinks.forEach(l => {
              l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`);
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);
}
