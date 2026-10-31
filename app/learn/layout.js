// app/learn/layout.js
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import AuthModal from '../components/AuthModal';

const tabs = [
  { href: '/learn/story', label: 'Our Story' },
  { href: '/learn/farming', label: 'Farming' },
  { href: '/learn/recipes', label: 'Recipes' },
  { href: '/learn/blog', label: 'Blog' },
  { href: '/learn/sustainability', label: 'Sustainability' },
  { href: '/learn/faq', label: 'FAQ' },
];

export default function LearnLayout({ children }) {
  const pathname = usePathname();
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Header
        onCartOpen={() => setCartOpen(true)}
        onAuthOpen={() => setAuthOpen(true)}
      />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <section className="vd-learn-hero">
        <div className="container">
          <div className="vd-learn-hero-inner">
            <span className="eyebrow">Learn</span>
            <h1 className="vd-learn-title">
              Roots, Recipes <em>&amp;</em> Real Stories
            </h1>
            <p className="vd-learn-lede">
              Explore how we grow, cook, and think about food — from soil to
              table, every step matters.
            </p>
          </div>
        </div>
      </section>

      <nav className="vd-learn-tabs" aria-label="Learn sections">
        <div className="container">
          <div className="vd-learn-tabs-inner">
            {tabs.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={`vd-learn-tab ${pathname === t.href ? 'active' : ''}`}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="vd-learn-main">{children}</main>
      <Footer />
    </>
  );
}