// app/components/ProductCard.js
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false);
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-card fade-in">
      <Link href={`/product/${product.id}`}>
        <div className="product-image">
          <span>{product.emoji}</span>
          {isOutOfStock && <span className="tag out-of-stock">Out of Stock</span>}
          {product.tag && !isOutOfStock && <span className="tag">{product.tag}</span>}
        </div>
      </Link>
      
      <div className="product-info">
        <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>{product.name}</h3>
        </Link>
        <div className="subtitle">{product.subtitle}</div>
        <div>
          <span className="price">₹{product.price}</span>
          {product.oldPrice && <span className="old-price">₹{product.oldPrice}</span>}
        </div>
        <div className={`stock ${isOutOfStock ? 'out-of-stock' : isLowStock ? 'low-stock' : 'in-stock'}`}>
          {isOutOfStock ? '❌ Out of Stock' : isLowStock ? `⚠️ Only ${product.stock} left` : `✅ ${product.stock} in stock`}
        </div>
        <button className="add-btn" onClick={handleAdd} disabled={isOutOfStock}>
          {isOutOfStock ? 'Out of Stock' : added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}