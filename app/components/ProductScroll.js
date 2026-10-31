// app/components/ProductScroll.js
'use client';
import { useState } from 'react';
import { useApp } from '../contexts/AppContext';

export default function ProductScroll({ title, tag }) {
  const { products, addToCart } = useApp();
  const [added, setAdded] = useState({});

  const handleAdd = (product) => {
    addToCart(product);
    setAdded({ ...added, [product.id]: true });
    setTimeout(() => setAdded({ ...added, [product.id]: false }), 2000);
  };

  const featuredProducts = products.slice(0, 8);

  return (
    <div className="product-scroll-section fade-in delay-2">
      <div className="section-title">
        {title || 'Most Loved'} <span>{tag || 'Bestsellers'}</span>
      </div>
      <div className="product-scroll">
        {featuredProducts.map((p) => (
          <div className="product-scroll-card zoom-in" key={p.id} style={{ animationDelay: `${p.id * 0.05}s` }}>
            <div className="image">
              {p.emoji}
              {p.tag && <span className="tag">{p.tag}</span>}
            </div>
            <div className="info">
              <h4>{p.name}</h4>
              <div>
                <span className="price">₹{p.price}</span>
                {p.oldPrice && <span className="old-price">₹{p.oldPrice}</span>}
              </div>
              <button className="add-btn" onClick={() => handleAdd(p)}>
                {added[p.id] ? '✓ Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}