// app/components/OrganicSection.js
'use client';
const items = [
  { icon: '🌱', label: '100% Organic' },
  { icon: '🧪', label: 'No Chemicals' },
  { icon: '🌾', label: 'Farm Fresh' },
  { icon: '🏆', label: 'Certified' },
];

export default function OrganicSection() {
  return (
    <div className="organic-section fade-in">
      <h2>🌱 Why Choose <span>VERDORA ORGANIC</span>?</h2>
      <p>We bring you the purest, most authentic organic products straight from the farms.</p>
      <div className="organic-grid">
        {items.map((item, i) => (
          <div className="organic-item zoom-in" key={i}>
            <div className="icon">{item.icon}</div>
            <div className="label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}