// app/components/HeroCarousel.js
'use client';
import { useState, useEffect } from 'react';

const slides = [
  {
    tag: '✨ Premium Quality',
    title: 'Farm Fresh, <br/><span>Direct to Your Home</span>',
    desc: 'Clean food, deep purpose — grown with love by farmers who care.',
    emoji: '🌾',
    bg: 'linear-gradient(135deg, #f7f5f0 0%, #ffffff 100%)'
  },
  {
    tag: '🌿 Pure & Organic',
    title: 'Traditional Ghee, <br/><span>Made with Love</span>',
    desc: 'Pure A2 ghee made using the traditional bilona method from dahi.',
    emoji: '🧈',
    bg: 'linear-gradient(135deg, #f0f5f0 0%, #ffffff 100%)'
  },
  {
    tag: '🍯 Raw & Unprocessed',
    title: 'Forest Honey, <br/><span>Straight from Nature</span>',
    desc: 'Unpasteurized, pure honey harvested from the deep forests.',
    emoji: '🍯',
    bg: 'linear-gradient(135deg, #f5f0e8 0%, #ffffff 100%)'
  },
  {
    tag: '🌾 Healthy Living',
    title: 'Brown Basmati, <br/><span>Low GI Goodness</span>',
    desc: 'Premium quality brown rice with low glycemic index.',
    emoji: '🍚',
    bg: 'linear-gradient(135deg, #f0f0e8 0%, #ffffff 100%)'
  },
  {
    tag: '🥥 Pure & Natural',
    title: 'Coconut Oil, <br/><span>Cold Pressed</span>',
    desc: 'Virgin coconut oil extracted using traditional cold-press method.',
    emoji: '🥥',
    bg: 'linear-gradient(135deg, #f5f0e8 0%, #ffffff 100%)'
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-carousel">
      <div className="hero-slide" style={{ background: slides[current].bg }}>
        <div className="content slide-left">
          <div className="tag">{slides[current].tag}</div>
          <h1 dangerouslySetInnerHTML={{ __html: slides[current].title }} />
          <p>{slides[current].desc}</p>
          <div className="btn-group">
            <button className="btn-primary">🛒 Shop Now</button>
            <button className="btn-secondary">📖 Learn More</button>
          </div>
        </div>
        <div className="image slide-right">
          {slides[current].emoji}
        </div>
      </div>
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={i === current ? 'active' : ''}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}