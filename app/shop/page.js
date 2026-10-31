// app/shop/page.js
'use client';
import { Suspense, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import AuthModal from '../components/AuthModal';
import ProductGrid from '../components/ProductGrid';
import { useApp } from '../contexts/AppContext';

function ShopPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const catParam = searchParams.get('cat') || '';
  const tagParam = searchParams.get('tag') || '';

  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { products } = useApp();

  const [sortBy, setSortBy] = useState('popular');
  const activeCat = catParam;

  const categories = useMemo(
    () => ['All', ...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  );

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCat && activeCat !== 'All') {
      list = list.filter((p) => p.category?.toLowerCase() === activeCat.toLowerCase());
    }

    if (tagParam === 'sale') {
      list = list.filter((p) => p.oldPrice);
    } else if (tagParam === 'new') {
      list = list.slice(-6);
    } else if (tagParam === 'bestsellers') {
      list = list.filter((p) => p.tag === 'Bestseller' || p.rating >= 4.8);
    }

    if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, activeCat, tagParam, sortBy]);

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} onAuthOpen={() => setAuthOpen(true)} />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <main className="shop-page">
        <div className="container">
          <div className="shop-head">
            <span className="eyebrow">Shop</span>
            <h1>Every Product We Make</h1>
            <p>Small batches, hand-checked, shipped fresh.</p>
          </div>

          <div className="shop-layout">
            {/* Filters sidebar */}
            <aside className="shop-filters">
              <div className="shop-filter-group">
                <h4>Category</h4>
                <div className="shop-filter-list">
                  {categories.map((c) => (
                    <button
                      key={c}
                      className={`shop-filter-btn ${activeCat === c || (c === 'All' && !activeCat) ? 'active' : ''}`}
                      onClick={() => router.push(c === 'All' ? '/shop' : `/shop?cat=${encodeURIComponent(c.toLowerCase())}`)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products */}
            <div className="shop-main">
              <div className="shop-toolbar">
                <div className="shop-count">
                  <strong>{filtered.length}</strong> products
                </div>
                <div className="shop-sort">
                  <label>Sort:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="popular">Popular</option>
                    <option value="price-low">Price: Low → High</option>
                    <option value="price-high">Price: High → Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="shop-empty">
                  <h3>No products found</h3>
                  <p>Try a different category.</p>
                </div>
              ) : (
                <ProductGrid items={filtered} showHeader={false} />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<main className="shop-page"><div className="container shop-empty"><p>Loading the shop…</p></div></main>}>
      <ShopPageContent />
    </Suspense>
  );
}
