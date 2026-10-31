import Link from 'next/link';

export const metadata = {
  title: 'Learn · Verdora Organic',
  description: 'Stories, recipes, farming practices, and honest food knowledge from Verdora.',
};

const guides = [
  { href: '/learn/story', icon: '🌿', eyebrow: 'Our Story', title: 'The people and principles behind every batch.', text: 'Meet the farmers, makers, and traditions that guide Verdora.' },
  { href: '/learn/farming', icon: '🌱', eyebrow: 'Farming', title: 'Better food starts with healthier soil.', text: 'Explore the patient, chemical-free practices used by our partner farms.' },
  { href: '/learn/recipes', icon: '🍲', eyebrow: 'Recipes', title: 'Simple ways to make the most of good ingredients.', text: 'Everyday recipes built around honest pantry staples.' },
  { href: '/learn/sustainability', icon: '🌍', eyebrow: 'Impact', title: 'A lighter footprint, from farm to home.', text: 'See how we think about packaging, water, fair prices, and more.' },
];

export default function LearnPage() {
  return (
    <section className="vd-page-section vd-learn-overview">
      <div className="container">
        <div className="vd-learn-intro">
          <span className="eyebrow">Start here</span>
          <h2>Good food is worth knowing.</h2>
          <p>Practical knowledge, thoughtful stories, and no empty jargon—made for curious kitchens.</p>
        </div>
        <div className="vd-learn-guide-grid">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="vd-learn-guide-card">
              <span className="vd-learn-guide-icon" aria-hidden="true">{guide.icon}</span>
              <span className="vd-learn-guide-eyebrow">{guide.eyebrow}</span>
              <h3>{guide.title}</h3>
              <p>{guide.text}</p>
              <span className="vd-learn-guide-link">Explore <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
        <div className="vd-learn-journal-cta">
          <div>
            <span className="eyebrow">From the journal</span>
            <h2>Fresh field notes, recipes, and food stories.</h2>
          </div>
          <Link href="/learn/blog" className="btn btn-primary">Read the journal →</Link>
        </div>
      </div>
    </section>
  );
}
