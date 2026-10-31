// app/learn/blog/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Blog · Verdora Organic',
  description: 'Stories, essays, and field notes from the Verdora team.',
};

const featured = {
  cat: 'Farming',
  title: 'Why Slow Food Is Making a Comeback',
  excerpt:
    'For a century, industrial agriculture promised speed and abundance. The bill is now due — in soil, in health, in taste.',
  author: 'Aditi Sharma',
  date: 'Oct 2026',
  read: '8 min read',
  emoji: '🌾',
};

const posts = [
  {
    cat: 'Recipes',
    title: 'The Right Way to Use Bilona Ghee',
    excerpt: 'Heat, timing, and smoke points — a short guide.',
    author: 'Rohit Nair',
    date: 'Oct 2026',
    read: '5 min',
    emoji: '🧈',
  },
  {
    cat: 'Farming',
    title: 'A2 Milk and the Case for Native Cows',
    excerpt: 'Why breed matters more than we think.',
    author: 'Dr. Meera Iyer',
    date: 'Sep 2026',
    read: '7 min',
    emoji: '🐄',
  },
  {
    cat: 'Health',
    title: 'Turmeric, Curcumin & Bioavailability',
    excerpt: 'Pepper, fat, heat — how to actually absorb it.',
    author: 'Dr. Meera Iyer',
    date: 'Sep 2026',
    read: '6 min',
    emoji: '🟡',
  },
  {
    cat: 'Culture',
    title: 'The Return of the Stone Chakki',
    excerpt: 'Why slow-ground flour tastes different.',
    author: 'Aditi Sharma',
    date: 'Aug 2026',
    read: '4 min',
    emoji: '🌾',
  },
  {
    cat: 'Sustainability',
    title: 'We Planted 12,000 Trees Last Year',
    excerpt: 'A short report from the field.',
    author: 'Verdora Team',
    date: 'Aug 2026',
    read: '5 min',
    emoji: '🌳',
  },
  {
    cat: 'Recipes',
    title: '5 Breakfasts Built Around Honey',
    excerpt: 'Raw, unfiltered, and endlessly versatile.',
    author: 'Rohit Nair',
    date: 'Jul 2026',
    read: '6 min',
    emoji: '🍯',
  },
];

export default function BlogPage() {
  return (
    <section className="vd-page-section">
      <div className="container">
        {/* Featured post */}
        <div className="vd-blog-featured">
          <div className="vd-blog-featured-media">{featured.emoji}</div>
          <div className="vd-blog-featured-body">
            <span className="vd-blog-featured-cat">{featured.cat}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="vd-blog-meta">
              <span>{featured.author}</span>
              <span className="dot" />
              <span>{featured.date}</span>
              <span className="dot" />
              <span>{featured.read}</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="vd-blog-grid">
          {posts.map((p, i) => (
            <Link href="#" className="vd-journal-card" key={i}>
              <div className="vd-journal-media">
                <span>{p.emoji}</span>
                <span className="vd-journal-cat">{p.cat}</span>
              </div>
              <div className="vd-journal-body">
                <div className="vd-journal-date">
                  {p.date} · {p.read}
                </div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="vd-journal-read">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}