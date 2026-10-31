// app/components/BadgesScroll.js
'use client';
const badges = [
  { icon: '🧈', label: 'A2 Ghee', sub: 'Bilona Method' },
  { icon: '🍯', label: 'Raw Honey', sub: 'Forest Honey' },
  { icon: '🌾', label: 'Atta', sub: 'Chakki Fresh' },
  { icon: '🟡', label: 'Turmeric', sub: 'High Curcumin' },
  { icon: '🥥', label: 'Coconut Oil', sub: 'Cold Pressed' },
  { icon: '🍚', label: 'Brown Rice', sub: 'Low GI' },
  { icon: '🥜', label: 'Almonds', sub: 'Premium' },
  { icon: '🌿', label: 'Herbal', sub: 'Natural' },
];

export default function BadgesScroll() {
  return (
    <div className="badges-scroll">
      {badges.map((b, i) => (
        <div className="badge-card zoom-in" key={i}>
          <div className="circle">{b.icon}</div>
          <div className="label">{b.label}</div>
          <div className="sub">{b.sub}</div>
        </div>
      ))}
    </div>
  );
}