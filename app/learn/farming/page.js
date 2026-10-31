// app/learn/farming/page.js
export const metadata = {
  title: 'Farming Practices · Verdora Organic',
  description: 'How we grow — the traditional, chemical-free way.',
};

const practices = [
  {
    icon: '🌱',
    title: 'Native Seeds',
    desc: 'Heirloom varieties saved and shared between farms for generations.',
  },
  {
    icon: '🚫',
    title: 'Zero Chemicals',
    desc: 'No synthetic pesticides, no fertilisers — we compost, rotate, and wait.',
  },
  {
    icon: '🐄',
    title: 'Grass-Fed Dairy',
    desc: 'Free-grazing A2 cows, cared for on open pastures, never tethered.',
  },
  {
    icon: '💧',
    title: 'Drip Irrigation',
    desc: 'Every drop counted. We use 60% less water than conventional farms.',
  },
  {
    icon: '☀️',
    title: 'Solar Drying',
    desc: 'No machines. The sun does the work — flavour and nutrients stay intact.',
  },
  {
    icon: '🌾',
    title: 'Seasonal Farming',
    desc: 'We grow what the season allows, never forcing nature to keep up.',
  },
];

export default function FarmingPage() {
  return (
    <section className="vd-page-section">
      <div className="container">
        <div className="vd-prose vd-prose-center">
          <p className="vd-prose-lede">
            We farm the way our grandparents did — slowly, carefully, and
            without shortcuts.
          </p>
        </div>

        <div className="vd-practice-grid">
          {practices.map((p, i) => (
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