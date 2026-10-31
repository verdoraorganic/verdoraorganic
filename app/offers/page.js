// app/offers/page.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import AuthModal from '../components/AuthModal';
import { useApp } from '../contexts/AppContext';

const offers = [
  {
    id: 'welcome',
    code: 'WELCOME10',
    title: '10% off your first order',
    desc: 'First-time customers — save 10% on any order above ₹500.',
    tag: 'NEW',
    min: 500,
    off: '10%',
  },
  {
    id: 'bulk',
    code: 'BULK20',
    title: '20% off bulk ghee & oils',
    desc: 'Order 4+ jars of ghee or oil, save 20% on those items.',
    tag: 'BULK',
    min: 2000,
    off: '20%',
  },
  {
    id: 'festive',
    code: 'DIWALI15',
    title: 'Festive 15% off',
    desc: 'Celebrate the season with 15% off across all sweets & dry fruits.',
    tag: 'FESTIVE',
    min: 1000,
    off: '15%',
  },
  {
    id: 'honey',
    code: 'HONEY30',
    title: 'Buy 2 get 1 free — honey',
    desc: 'Order any 3 jars of honey, pay for 2. Forest-fresh.',
    tag: 'BOGO',
    min: 0,
    off: '33%',
  },
  {
    id: 'refer',
    code: 'REFER500',
    title: 'Refer a friend — ₹500 off',
    desc: 'You and your friend each get ₹500 off your next order.',
    tag: 'REFERRAL',
    min: 500,
    off: '₹500',
  },
];

export default function OffersPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [copied, setCopied] = useState(null);
  const { products } = useApp();

  const copyCode = async (code) => {
    try {
      await navigator.clipboard?.writeText(code);
    } catch {
      // Clipboard access is optional; the visible code remains selectable.
    }
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} onAuthOpen={() => setAuthOpen(true)} />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <main>
        <section className="off-hero">
          <div className="container">
            <span className="eyebrow">Current Offers</span>
            <h1 className="off-title">
              Save on the things<br />
              <em>you already love.</em>
            </h1>
            <p className="off-lede">
              Live coupons, seasonal deals, and bulk savings. Copy a code,
              paste it at checkout, done.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="off-grid">
              {offers.map((o) => (
                <div className="off-card" key={o.id}>
                  <div className="off-card-tag">{o.tag}</div>
                  <div className="off-card-discount">{o.off}</div>
                  <h3 className="off-card-title">{o.title}</h3>
                  <p className="off-card-desc">{o.desc}</p>
                  {o.min > 0 && (
                    <div className="off-card-min">Min. order ₹{o.min}</div>
                  )}
                  <div className="off-card-code">
                    <code>{o.code}</code>
                    <button
                      type="button"
                      className="off-card-copy"
                      onClick={() => copyCode(o.code)}
                    >
                      {copied === o.code ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* On-sale products */}
        <section className="section-sm" style={{ background: 'var(--paper-warm)' }}>
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">On Sale Now</span>
              <h2>Products with current discounts</h2>
            </div>

            <div className="vd-pg-grid">
              {products
                .filter((p) => p.oldPrice)
                .slice(0, 6)
                .map((p) => (
                  <Link href={`/product/${p.id}`} className="vd-pc" key={p.id}>
                    <div className="vd-pc-media">
                      <span className="vd-pc-tag sale">SALE</span>
                      <div className="vd-pc-emoji">{p.emoji}</div>
                    </div>
                    <div className="vd-pc-body">
                      <div className="vd-pc-cat">{p.category}</div>
                      <h3 className="vd-pc-name">{p.name}</h3>
                      <div className="vd-pc-price-row">
                        <span className="vd-pc-price">₹{p.price}</span>
                        <span className="vd-pc-old">₹{p.oldPrice}</span>
                        <span className="vd-pc-off">
                          {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% off
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
