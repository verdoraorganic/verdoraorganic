// app/components/ProductGrid.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../contexts/AppContext';

export default function ProductGrid({ category = null, items, showHeader = true }) {
  const { products, addToCart, toggleWishlist, wishlist } = useApp();
  const [added, setAdded] = useState({});

  const filtered = items ?? (category
    ? products.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
    : products);

  const handleAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded({ ...added, [product.id]: true });
    setTimeout(() => setAdded({ ...added, [product.id]: false }), 1500);
  };

  const isLiked = (id) => wishlist?.includes(id) || false;

  return (
    <div className="vd-pg-wrap">
      {showHeader && (
        <div className="vd-pg-head">
          <div>
            <div className="vd-pg-eyebrow">Handpicked For You</div>
            <h2 className="vd-pg-title">Most Loved Products</h2>
          </div>
          <Link href="/shop" className="vd-pg-viewall">
            View All <span>→</span>
          </Link>
        </div>
      )}

      <div className="vd-pg-grid">
        {filtered.map((p) => {
          const isOut = p.stock === 0;
          const isLow = p.stock > 0 && p.stock <= 5;
          return (
            <Link
              href={`/product/${p.id}`}
              className="vd-pc"
              key={p.id}
            >
              {/* Media — emoji always visible */}
              <div className="vd-pc-media">
                {p.tag && <span className={`vd-pc-tag ${p.tag === 'Sale' ? 'sale' : ''}`}>{p.tag}</span>}

                <button
                  className={`vd-pc-wish ${isLiked(p.id) ? 'liked' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(p.id);
                  }}
                  aria-label="Wishlist"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked(p.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
                  </svg>
                </button>

                <div className="vd-pc-emoji">{p.emoji}</div>

                <div className={`vd-pc-stock ${isOut ? 'out' : isLow ? 'low' : 'in'}`}>
                  {isOut ? 'Out of Stock' : isLow ? `Only ${p.stock} left` : 'In Stock'}
                </div>
              </div>

              {/* Body */}
              <div className="vd-pc-body">
                <div className="vd-pc-cat">{p.category}</div>
                <h3 className="vd-pc-name">{p.name}</h3>
                <p className="vd-pc-sub">{p.subtitle}</p>

                <div className="vd-pc-rating">
                  <span className="vd-pc-stars">★★★★★</span>
                  <span className="vd-pc-rev">{p.rating} ({p.reviews})</span>
                </div>

                <div className="vd-pc-price-row">
                  <span className="vd-pc-price">₹{p.price}</span>
                  {p.oldPrice && <span className="vd-pc-old">₹{p.oldPrice}</span>}
                  {p.oldPrice && (
                    <span className="vd-pc-off">
                      {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% off
                    </span>
                  )}
                </div>
              </div>

              {/* Hover overlay — TEXT ONLY, hides emoji */}
              <div className="vd-pc-hover">
                <div className="vd-pc-hover-inner">
                  <div className="vd-pc-hover-title">{p.name}</div>
                  <p className="vd-pc-hover-desc">{p.description}</p>

                  <div className="vd-pc-hover-meta">
                    <div>
                      <span>Category</span>
                      <strong>{p.category}</strong>
                    </div>
                    <div>
                      <span>Rating</span>
                      <strong>★ {p.rating}</strong>
                    </div>
                    <div>
                      <span>Stock</span>
                      <strong>{p.stock} units</strong>
                    </div>
                  </div>

                  <button
                    className={`vd-pc-hover-add ${added[p.id] ? 'added' : ''}`}
                    onClick={(e) => handleAdd(e, p)}
                    disabled={isOut}
                  >
                    {isOut ? 'Out of Stock' : added[p.id] ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>

                  <div className="vd-pc-hover-hint">Click anywhere for full details →</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
