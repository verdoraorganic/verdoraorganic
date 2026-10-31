// app/components/Hero.js
'use client';
export default function Hero() {
  return (
    <section className="hero fade-in">
      <div className="hero-badge">✨ Pure & Organic Since 2015</div>
      <h1>Farm Fresh,<br /><span>Direct to Your Home</span></h1>
      <p>Clean food, deep purpose — grown with love by farmers who care about your health.</p>
      <div className="hero-buttons">
        <button className="btn-primary">🛒 Explore Products</button>
        <button className="btn-secondary">📖 Our Story</button>
      </div>
    </section>
  );
}