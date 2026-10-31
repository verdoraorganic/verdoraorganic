// app/components/BadgesSection.js
'use client';
const badges = [
  { icon: '🧈', label: 'Ghee', sub: 'Pure A2' },
  { icon: '🍯', label: 'Honey', sub: 'Raw Forest' },
  { icon: '🌾', label: 'Atta', sub: 'Chakki Fresh' },
  { icon: '🟡', label: 'Turmeric', sub: 'High Curcumin' },
  { icon: '🥥', label: 'Coconut Oil', sub: 'Cold Pressed' },
  { icon: '🍚', label: 'Rice', sub: 'Brown Basmati' },
  { icon: '🥜', label: 'Dry Fruits', sub: 'Premium' },
  { icon: '🌿', label: 'Herbal', sub: 'Natural' },
];

export default function BadgesSection() {
  return (
    <div className="badges-section">
      <div className="container">
        <div className="badges-grid">
          {badges.map((b, i) => (
            <div className="badge-item fade-in" key={i} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="circle">
                <span>{b.icon}</span>
              </div>
              <div className="label">{b.label}</div>
              <div className="sub">{b.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}