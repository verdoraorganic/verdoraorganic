// app/components/CategoryCircles.js
'use client';

const categories = [
  { id: 'spices',    label: 'Spices',        emoji: '🌶️', accent: '#f0d5cc' },
  { id: 'dal',       label: 'Dal & Pulses',  emoji: '🫘', accent: '#e8e0d0' },
  { id: 'flour',     label: 'Flour',         emoji: '🌾', accent: '#f5e8c8' },
  { id: 'rice',      label: 'Rice',          emoji: '🍚', accent: '#e0e8d8' },
  { id: 'oil',       label: 'Oil',           emoji: '🫗', accent: '#f0e0c8' },
  { id: 'ghee',      label: 'Ghee',          emoji: '🧈', accent: '#f5e8c8' },
];

export default function CategoryCircles() {
  return (
    <section className="vd-cat-section">
      <div className="vd-cat-head">
        <div className="vd-cat-eyebrow">Shop by Category</div>
        <h2 className="vd-cat-title">Everything Your Kitchen Needs</h2>
      </div>

      <div className="vd-cat-row">
        {categories.map((cat, i) => (
          <a
            href="#products"
            className="vd-cat-circle"
            key={cat.id}
            style={{
              animationDelay: `${i * 0.07}s`,
              '--cat-accent': cat.accent,
            }}
          >
            <span className="vd-cat-ring">
              <span className="vd-cat-ring-inner">
                <span className="vd-cat-emoji">{cat.emoji}</span>
              </span>
            </span>
            <span className="vd-cat-label">{cat.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}