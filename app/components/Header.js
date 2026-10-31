// app/components/Header.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useApp } from '../contexts/AppContext';

export default function Header({ onCartOpen, onAuthOpen }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const { totalItems, isAdmin, wishlist } = useApp();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenu]);

  useEffect(() => {
    const onClick = (e) => {
      if (mobileMenu && headerRef.current && !headerRef.current.contains(e.target)) {
        setMobileMenu(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [mobileMenu]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileMenu(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const closeMobile = () => setMobileMenu(false);

  return (
    <div ref={headerRef}>
      {/* Marquee */}
      <div className="vd-marquee" aria-hidden="true">
        <div className="vd-marquee-track">
          {[...Array(2)].map((_, dup) => (
            <div className="vd-marquee-group" key={dup}>
              <span>Certified Organic</span>
              <span className="vd-dot">◆</span>
              <span>Free Shipping Over ₹999</span>
              <span className="vd-dot">◆</span>
              <span>Zero Chemicals</span>
              <span className="vd-dot">◆</span>
              <span>Farm-Direct Since 2015</span>
              <span className="vd-dot">◆</span>
              <span>Loved by 50,000+ Families</span>
              <span className="vd-dot">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className={`vd-header ${scrolled ? 'vd-header-scrolled' : ''}`}>
        <div className="vd-header-inner">
          {/* Logo */}
          <Link href="/" className="vd-logo" onClick={closeMobile}>
            <span className="vd-logo-mark">
              <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
                <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4z" fill="#1a3d28" />
                <path d="M24 12c-4 3-6 7-6 11 0 3 1 5 3 6-1-3-1-6 0-9 1-3 3-6 6-8-1 4-1 8 1 11 2-3 3-6 2-9-1-3-3-6-6-8z" fill="#fbfaf7" />
                <path d="M22 29c0 2 1 4 3 5-2 1-5 1-7-1 1-1 2-3 4-4z" fill="#9bbfa4" />
              </svg>
            </span>
            <span className="vd-logo-type">
              <span className="vd-logo-name">Verdora</span>
              <span className="vd-logo-sub">ORGANIC · SINCE 2015</span>
            </span>
          </Link>

          {/* Nav — all clickable, real routes */}
          <nav className="vd-nav" aria-label="Primary">
            <div className="vd-nav-item vd-has-drop">
              <span>Shop</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div className="vd-dropdown">
                <div className="vd-drop-col">
                  <div className="vd-drop-title">By Category</div>
                  <Link href="/shop?cat=ghee">Ghee &amp; Oils</Link>
                  <Link href="/shop?cat=honey">Honey &amp; Sweeteners</Link>
                  <Link href="/shop?cat=grains">Grains &amp; Flour</Link>
                  <Link href="/shop?cat=spices">Spices &amp; Masala</Link>
                  <Link href="/shop?cat=dryfruits">Dry Fruits</Link>
                </div>
                <div className="vd-drop-col">
                  <div className="vd-drop-title">Collections</div>
                  <Link href="/shop?tag=bestsellers">Bestsellers</Link>
                  <Link href="/shop?tag=new">New Arrivals</Link>
                  <Link href="/shop?tag=sale">Sale</Link>
                </div>
                <div className="vd-drop-feature">
                  <div className="vd-drop-feature-emoji">🧈</div>
                  <div>
                    <strong>Bilona A2 Ghee</strong>
                    <p>Made the traditional way</p>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/shop" className="vd-nav-item">Shop All</Link>

            <div className="vd-nav-item vd-has-drop">
              <Link href="/learn">Learn</Link>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div className="vd-dropdown vd-dropdown-sm">
                <Link href="/learn/story">Our Story</Link>
                <Link href="/learn/farming">Farming Practices</Link>
                <Link href="/learn/recipes">Recipes</Link>
                <Link href="/learn/blog">Blog</Link>
                <Link href="/learn/sustainability">Sustainability</Link>
                <Link href="/learn/faq">FAQ</Link>
              </div>
            </div>

            <Link href="/wholesale" className="vd-nav-item">Wholesale</Link>
            <Link href="/gift-cards" className="vd-nav-item">Gift Cards</Link>
            <Link href="/offers" className="vd-nav-item vd-nav-highlight">Offers</Link>
          </nav>

          {/* Actions */}
          <div className="vd-actions">
            <button className="vd-icon-btn" onClick={() => setSearchOpen((v) => !v)} aria-label="Search" aria-expanded={searchOpen}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            <button className="vd-icon-btn" onClick={onAuthOpen} aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-1a7 7 0 0114 0v1" />
              </svg>
            </button>

            <Link href="/wishlist" className="vd-icon-btn vd-wish" aria-label="Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
              </svg>
              {wishlist?.length > 0 && <span className="vd-badge">{wishlist.length}</span>}
            </Link>

            <button className="vd-cart-btn" onClick={onCartOpen} aria-label={`Cart, ${totalItems} items`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="vd-cart-label">Cart</span>
              {totalItems > 0 && <span className="vd-cart-count">{totalItems}</span>}
            </button>

            {isAdmin && (
              <Link href="/admin" className="vd-admin-pill">Admin</Link>
            )}

            <button className="vd-burger" onClick={() => setMobileMenu((v) => !v)} aria-label="Menu" aria-expanded={mobileMenu}>
              <span className={mobileMenu ? 'open' : ''}></span>
              <span className={mobileMenu ? 'open' : ''}></span>
            </button>
          </div>
        </div>

        {/* Search Drawer */}
        <div className={`vd-search-drawer ${searchOpen ? 'open' : ''}`}>
          <div className="vd-search-inner">
            <svg className="vd-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search ghee, honey, spices..." autoFocus={searchOpen} />
            <button className="vd-search-close" onClick={() => setSearchOpen(false)}>Close ✕</button>
          </div>
          <div className="vd-search-tags">
            <span>Popular:</span>
            <Link href="/shop?cat=ghee"><button>Bilona Ghee</button></Link>
            <Link href="/shop?cat=honey"><button>Forest Honey</button></Link>
            <Link href="/shop?cat=spices"><button>Turmeric</button></Link>
            <Link href="/shop?cat=grains"><button>Brown Rice</button></Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`vd-mobile ${mobileMenu ? 'open' : ''}`}>
          <Link href="/shop" onClick={closeMobile}>Shop All</Link>
          <Link href="/shop?tag=new" onClick={closeMobile}>New Arrivals</Link>
          <Link href="/learn/story" onClick={closeMobile}>Our Story</Link>
          <Link href="/learn/farming" onClick={closeMobile}>Farming</Link>
          <Link href="/learn/recipes" onClick={closeMobile}>Recipes</Link>
          <Link href="/learn/blog" onClick={closeMobile}>Blog</Link>
          <Link href="/learn/sustainability" onClick={closeMobile}>Sustainability</Link>
          <Link href="/learn/faq" onClick={closeMobile}>FAQ</Link>
          <Link href="/wholesale" onClick={closeMobile}>Wholesale</Link>
          <Link href="/gift-cards" onClick={closeMobile}>Gift Cards</Link>
          <Link href="/offers" onClick={closeMobile}>Offers</Link>
          <Link href="/wishlist" onClick={closeMobile}>Wishlist</Link>
          <div className="vd-mobile-foot">
            <button onClick={() => { onAuthOpen(); closeMobile(); }}>Sign In</button>
            <button onClick={() => { onCartOpen(); closeMobile(); }}>Cart ({totalItems})</button>
          </div>
        </div>
      </header>
    </div>
  );
}
