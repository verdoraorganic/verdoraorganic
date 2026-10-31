// app/wishlist/page.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import AuthModal from '../components/AuthModal';
import { useApp } from '../contexts/AppContext';

export default function WishlistPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { products, wishlist, toggleWishlist, addToCart } = useApp();

  const items = products.filter((p) => wishlist?.includes(p.id));

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} onAuthOpen={() => setAuthOpen(true)} />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <main className="wish-page">
        <div className="container">
          <div className="wish-head">
            <span className="eyebrow">Saved Items</span>
            <h1>Your Wishlist</h1>
            <p>
              {items.length === 0
                ? 'Nothing saved yet — start tapping hearts on products you love.'
                : `${items.length} ${items.length === 1 ? 'item' : 'items'} saved`}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="wish-empty">
              <div className="wish-empty-icon">♡</div>
              <h3>Your wishlist is empty</h3>
              <p>Browse our collection and save what catches your eye.</p>
              <Link href="/shop" className="btn btn-primary">Start Shopping →</Link>
            </div>
          ) : (
            <div className="wish-grid">
              {items.map((p) => (
                <div className="wish-item" key={p.id}>
                  <Link href={`/product/${p.id}`} className="wish-item-media">
                    {p.tag && <span className="wish-item-tag">{p.tag}</span>}
                    <span className="wish-item-emoji">{p.emoji}</span>
                  </Link>
                  <button
                    className="wish-item-remove"
                    onClick={() => toggleWishlist(p.id)}
                    aria-label="Remove from wishlist"
                  >
                    ✕
                  </button>
                  <div className="wish-item-body">
                    <div className="wish-item-cat">{p.category}</div>
                    <Link href={`/product/${p.id}`} className="wish-item-name">
                      {p.name}
                    </Link>
                    <div className="wish-item-price">₹{p.price}</div>
                    <div className="wish-item-actions">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => addToCart(p)}
                        disabled={p.stock === 0}
                      >
                        {p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                      <Link href={`/product/${p.id}`} className="btn btn-secondary btn-sm">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}