// app/components/TrustBadges.js
'use client';
const badges = [
  { icon: '🚚', title: 'Free Shipping', desc: 'On orders above ₹499' },
  { icon: '🔄', title: 'Easy Returns', desc: '30-day return policy' },
  { icon: '💳', title: 'Secure Payment', desc: '100% protected' },
  { icon: '🌿', title: '100% Organic', desc: 'Certified organic' },
];

export default function TrustBadges() {
  return (
    <div className="trust-badges">
      {badges.map((b, i) => (
        <div className="trust-badge" key={i}>
          <div className="icon">{b.icon}</div>
          <h4>{b.title}</h4>
          <p>{b.desc}</p>
        </div>
      ))}
    </div>
  );
}