// app/components/Features.js
'use client';

const features = [
  { icon: '🌱', title: '100% Organic', desc: 'Certified organic farming' },
  { icon: '🚚', title: 'Free Shipping', desc: 'On orders above ₹999' },
  { icon: '🏆', title: 'Premium Quality', desc: 'Handpicked & tested' },
  { icon: '💚', title: 'Farm Fresh', desc: 'Direct from farmers' },
];

export default function Features() {
  return (
    <section className="features-section">
      <div className="container">
        <div className="section-heading">
          <div className="eyebrow">Why Choose Us</div>
          <h2>Rooted in Nature, Backed by Trust</h2>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-item zoom-in" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}