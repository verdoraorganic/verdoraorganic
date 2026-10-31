// app/components/FeaturedProducts.js
'use client';
import Link from 'next/link';
import { useApp } from '../contexts/AppContext';

export default function FeaturedProducts() {
  const { products } = useApp();
  const featured = products.slice(0, 6);

  return (
    <section className="vd-pg-wrap" id="featured-products">
      <div className="vd-pg-head">
        <div>
          <div className="vd-pg-eyebrow">Featured This Week</div>
          <h2 className="vd-pg-title">Best of the Harvest</h2>
        </div>
        <Link href="/shop" className="vd-pg-viewall">
          View All <span>→</span>
        </Link>
      </div>

      <div className="vd-pg-grid">
        {featured.map((p) => {
          const isOut = p.stock === 0;
          const isLow = p.stock > 0 && p.stock <= 5;
          return (
            <Link href={`/product/${p.id}`} className="vd-pc" key={p.id}>
              <div className="vd-pc-media">
                {p.tag && <span className={`vd-pc-tag ${p.tag === 'Sale' ? 'sale' : ''}`}>{p.tag}</span>}
                <div className="vd-pc-emoji">{p.emoji}</div>
                <div className={`vd-pc-stock ${isOut ? 'out' : isLow ? 'low' : 'in'}`}>
                  {isOut ? 'Out of Stock' : isLow ? `Only ${p.stock} left` : 'In Stock'}
                </div>
              </div>
              <div className="vd-pc-body">
                <div className="vd-pc-cat">{p.category}</div>
                <h3 className="vd-pc-name">{p.name}</h3>
                <p className="vd-pc-sub">{p.subtitle}</p>
                <div className="vd-pc-price-row">
                  <span className="vd-pc-price">₹{p.price}</span>
                  {p.oldPrice && <span className="vd-pc-old">₹{p.oldPrice}</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}