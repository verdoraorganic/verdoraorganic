// app/learn/sustainability/page.js
export const metadata = {
  title: 'Sustainability · Verdora Organic',
  description: 'How we pay rent to the planet.',
};

const pillars = [
  {
    icon: '🌳',
    title: 'Tree Planting',
    desc: '12,000+ native trees planted with every partner farm since 2020.',
  },
  {
    icon: '💧',
    title: 'Water Positive',
    desc: 'Rainwater harvesting across all facilities. Net positive since 2023.',
  },
  {
    icon: '♻️',
    title: 'Zero-Waste Packaging',
    desc: 'Glass, tin, and compostable paper. No plastic inside or out.',
  },
  {
    icon: '☀️',
    title: 'Solar Powered',
    desc: 'Our main warehouse runs on 100% rooftop solar.',
  },
  {
    icon: '🤝',
    title: 'Fair Pricing',
    desc: 'Farmers earn 22% above local mandi rates, guaranteed.',
  },
  {
    icon: '🌾',
    title: 'Seed Banking',
    desc: 'Over 40 heirloom varieties saved for future generations.',
  },
];

export default function SustainabilityPage() {
  return (
    <section className="vd-page-section">
      <div className="container">
        <div className="vd-prose vd-prose-center">
          <p className="vd-prose-lede">
            Sustainability is not a badge. It&apos;s the way we pay rent to
            the planet.
          </p>
        </div>
        <div className="vd-practice-grid">
          {pillars.map((p, i) => (
            <div className="vd-practice-card" key={i}>
              <div className="vd-practice-icon">{p.icon}</div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}