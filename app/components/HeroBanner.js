// app/components/HeroBanner.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    eyebrow: 'Certified Organic · Since 2015',
    titleLine1: 'Good food',
    titleLine2: 'grows a',
    titleHighlight: 'better tomorrow.',
    desc: 'From our farms to your table — pure, organic, and wholesome food, grown with care and harvested with love.',
    cta: 'Shop Organic',
    ctaHref: '/shop',
    visual: '🌾',
    visualCaption: 'A2 · Bilona · Farm Fresh',
  },
  {
    id: 2,
    eyebrow: 'Traditional · Handcrafted',
    titleLine1: 'Bilona ghee',
    titleLine2: 'made the',
    titleHighlight: 'ancient way.',
    desc: 'Slow-churned from cultured dahi using the traditional bilona method — pure A2 nutrition in every golden spoon.',
    cta: 'Explore Ghee',
    ctaHref: '/shop?cat=ghee',
    visual: '🧈',
    visualCaption: '100% A2 · Grass-fed',
  },
  {
    id: 3,
    eyebrow: 'Raw · Unprocessed · Forest Fresh',
    titleLine1: 'Forest honey',
    titleLine2: 'straight from',
    titleHighlight: "nature's hive.",
    desc: 'Unpasteurized, unfiltered honey harvested from deep forests — every drop rich with natural enzymes and antioxidants.',
    cta: 'Taste the Wild',
    ctaHref: '/shop?cat=honey',
    visual: '🍯',
    visualCaption: 'Wild · Unfiltered · Raw',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const s = slides[current];

  return (
    <section
      className="vd-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="vd-hero-inner">
        {/* LEFT — Editorial content */}
        <div className="vd-hero-content" key={current}>
          <div className="vd-hero-eyebrow">{s.eyebrow}</div>
          <h1 className="vd-hero-title">
            {s.titleLine1}<br />
            {s.titleLine2}<br />
            <em className="vd-hero-highlight">{s.titleHighlight}</em>
          </h1>
          <p className="vd-hero-desc">{s.desc}</p>
          <Link href={s.ctaHref} className="vd-hero-cta">
            {s.cta}
            <span className="vd-hero-arrow">→</span>
          </Link>

          {/* Slide indicators */}
          <div className="vd-hero-meta">
            <span className="vd-hero-count">
              0{current + 1} <em>/ 0{slides.length}</em>
            </span>
            <div className="vd-hero-progress">
              <div
                className="vd-hero-progress-fill"
                key={`${current}-${paused}`}
                style={{ animationPlayState: paused ? 'paused' : 'running' }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — Clean single visual */}
        <div className="vd-hero-visual" key={`v-${current}`}>
          <div className="vd-hero-visual-circle"></div>
          <div className="vd-hero-visual-emoji">{s.visual}</div>
          <div className="vd-hero-visual-caption">{s.visualCaption}</div>
        </div>
      </div>

      {/* Nav arrows */}
      <button className="vd-hero-nav vd-hero-nav-prev" onClick={prev} aria-label="Previous slide">←</button>
      <button className="vd-hero-nav vd-hero-nav-next" onClick={next} aria-label="Next slide">→</button>

      {/* Dots */}
      <div className="vd-hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`vd-hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}