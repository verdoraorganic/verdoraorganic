// app/components/Footer.js
'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-text">🌿 Verdora</div>
            <p>
              Pure, organic, and fresh from farm to home. Every product 
              is grown with love and harvested with care.
            </p>
            <div className="footer-social">
              <a href="mailto:hello@verdora.com" aria-label="Email Verdora">✉️</a>
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            <Link href="/shop?cat=ghee">Ghee</Link>
            <Link href="/shop?cat=honey">Honey</Link>
            <Link href="/shop?cat=oils">Oils</Link>
            <Link href="/shop?cat=grains">Grains</Link>
            <Link href="/shop?cat=spices">Spices</Link>
          </div>
          <div>
            <h4>About</h4>
            <Link href="/learn/story">Our Story</Link>
            <Link href="/learn/farming">Farmers</Link>
            <Link href="/learn/sustainability">Sustainability</Link>
            <Link href="/learn/blog">Blog</Link>
          </div>
          <div>
            <h4>Support</h4>
            <a href="mailto:hello@verdora.com">Contact Us</a>
            <Link href="/learn/faq">FAQ</Link>
            <Link href="/learn/faq">Returns</Link>
            <Link href="/learn/faq">Shipping</Link>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Verdora Organic Foods. Made with 💚 in India.
        </div>
      </div>
    </footer>
  );
}
