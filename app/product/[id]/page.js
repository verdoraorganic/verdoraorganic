// app/product/[id]/page.js
'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../contexts/AppContext';
import Header from '../../components/Header';
import CartSidebar from '../../components/CartSidebar';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, wishlist } = useApp();
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const productId = Number(id);
  const product = Number.isFinite(productId)
    ? products.find((p) => String(p.id) === String(productId))
    : null;

  if (!product) {
    return (
      <>
        <Header onCartOpen={() => setCartOpen(true)} onAuthOpen={() => setAuthOpen(true)} />
        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        <main className="pdp-empty">
          <div className="container">
            <div className="pdp-empty-icon">🔍</div>
            <h1>Product not found</h1>
            <p>The product you are looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/shop" className="btn btn-primary">
              Browse Shop →
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isLiked = wishlist?.includes(product.id);
  const stock = Number(product.stock) || 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    for (let i = 0; i < Math.min(quantity, stock); i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => setCartOpen(true), 200);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const fillRelated = [...relatedProducts];
  if (fillRelated.length < 4) {
    const others = products.filter(
      (p) => p.id !== product.id && !fillRelated.find((r) => r.id === p.id)
    );
    fillRelated.push(...others.slice(0, 4 - fillRelated.length));
  }

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} onAuthOpen={() => setAuthOpen(true)} />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <main className="pdp">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="pdp-crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/shop">Shop</Link>
            <span>/</span>
            <Link href={`/shop?cat=${product.category?.toLowerCase()}`}>
              {product.category}
            </Link>
            <span>/</span>
            <span className="pdp-crumb-current">{product.name}</span>
          </nav>

          {/* Product grid */}
          <div className="pdp-grid">
            {/* Gallery */}
            <div className="pdp-gallery">
              <div className="pdp-main-image">
                {product.tag && (
                  <span className={`pdp-image-tag ${product.tag === 'Sale' ? 'sale' : ''}`}>
                    {product.tag}
                  </span>
                )}
                <span className="pdp-image-emoji">{product.emoji}</span>
              </div>

              <div className="pdp-thumbs">
                {[product.emoji, '📦', '🌿', '✨'].map((img, i) => (
                  <button
                    key={i}
                    className={`pdp-thumb ${i === 0 ? 'active' : ''}`}
                    aria-label={`View ${i + 1}`}
                  >
                    {img}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="pdp-info">
              <div className="pdp-cat">{product.category}</div>
              <h1 className="pdp-title">{product.name}</h1>
              <p className="pdp-subtitle">{product.subtitle}</p>

              <div className="pdp-rating">
                <span className="pdp-stars">★★★★★</span>
                <span className="pdp-rating-num">{product.rating}</span>
                <span className="pdp-reviews">({product.reviews} reviews)</span>
              </div>

              <div className="pdp-price-row">
                <span className="pdp-price">₹{product.price}</span>
                {product.oldPrice && (
                  <>
                    <span className="pdp-old-price">₹{product.oldPrice}</span>
                    <span className="pdp-discount">
                      {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              <div
                className={`pdp-stock ${
                  isOutOfStock ? 'out' : isLowStock ? 'low' : 'in'
                }`}
              >
                {isOutOfStock ? (
                  <>Out of Stock</>
                ) : isLowStock ? (
                  <>Only {stock} left — order soon</>
                ) : (
                  <>In Stock — {stock} available</>
                )}
              </div>

              <p className="pdp-desc">{product.description}</p>

              {/* Quantity + actions */}
              <div className="pdp-actions">
                <div className="pdp-qty">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(quantity + 1, stock))}
                    disabled={quantity >= stock}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  className={`pdp-add ${added ? 'added' : ''}`}
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                >
                  {isOutOfStock ? 'Out of Stock' : added ? '✓ Added to Cart' : 'Add to Cart'}
                </button>

                <button
                  className={`pdp-wish ${isLiked ? 'liked' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Add to wishlist"
                >
                  {isLiked ? '❤️' : '♡'}
                </button>
              </div>

              {!isOutOfStock && (
                <button className="pdp-buy-now" onClick={handleBuyNow}>
                  Buy Now →
                </button>
              )}

              {/* Trust row */}
              <div className="pdp-trust">
                <div className="pdp-trust-item">
                  <span className="pdp-trust-icon">🚚</span>
                  <div>
                    <strong>Free Shipping</strong>
                    <small>Orders ₹999+</small>
                  </div>
                </div>
                <div className="pdp-trust-item">
                  <span className="pdp-trust-icon">🔄</span>
                  <div>
                    <strong>Easy Returns</strong>
                    <small>30-day policy</small>
                  </div>
                </div>
                <div className="pdp-trust-item">
                  <span className="pdp-trust-icon">🌿</span>
                  <div>
                    <strong>100% Organic</strong>
                    <small>Certified</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="pdp-tabs">
            <div className="pdp-tabs-header">
              <button
                className={`pdp-tab ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`pdp-tab ${activeTab === 'benefits' ? 'active' : ''}`}
                onClick={() => setActiveTab('benefits')}
              >
                Benefits
              </button>
              <button
                className={`pdp-tab ${activeTab === 'shipping' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping &amp; Returns
              </button>
            </div>

            <div className="pdp-tabs-body">
              {activeTab === 'description' && (
                <div className="pdp-prose">
                  <h3>About {product.name}</h3>
                  <p>{product.description}</p>
                  <p>
                    Sourced directly from our partner farms and processed
                    using traditional, chemical-free methods. Every batch is
                    hand-checked before it leaves our warehouse.
                  </p>
                  <ul>
                    <li>100% organic &amp; natural ingredients</li>
                    <li>No chemicals, no preservatives, no additives</li>
                    <li>Small-batch production for maximum freshness</li>
                    <li>Packed in recyclable glass or tin</li>
                  </ul>
                </div>
              )}

              {activeTab === 'benefits' && (
                <div className="pdp-prose">
                  <h3>Health benefits</h3>
                  <ul>
                    <li>Rich in essential nutrients and antioxidants</li>
                    <li>Supports heart health and immunity</li>
                    <li>Aids digestion and gut health</li>
                    <li>Free from refined sugars and trans fats</li>
                    <li>Safe for daily consumption, all ages</li>
                  </ul>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="pdp-prose">
                  <h3>Shipping &amp; returns</h3>
                  <ul>
                    <li>Free shipping on orders above ₹999</li>
                    <li>Dispatch within 24 hours, delivery 3–5 business days</li>
                    <li>30-day easy returns &amp; exchange</li>
                    <li>Secure payment — UPI, cards, netbanking</li>
                    <li>Customer support: hello@verdora.com</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Related products */}
          {fillRelated.length > 0 && (
            <section className="pdp-related">
              <div className="pdp-related-head">
                <div>
                  <div className="pdp-related-eyebrow">You may also like</div>
                  <h2 className="pdp-related-title">Similar products</h2>
                </div>
                <Link href="/shop" className="pdp-related-viewall">
                  View All →
                </Link>
              </div>

              <div className="vd-pg-grid" style={{ padding: 0 }}>
                {fillRelated.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="vd-pc"
                  >
                    <div className="vd-pc-media">
                      {p.tag && (
                        <span className={`vd-pc-tag ${p.tag === 'Sale' ? 'sale' : ''}`}>
                          {p.tag}
                        </span>
                      )}
                      <div className="vd-pc-emoji">{p.emoji}</div>
                    </div>
                    <div className="vd-pc-body">
                      <div className="vd-pc-cat">{p.category}</div>
                      <h3 className="vd-pc-name">{p.name}</h3>
                      <p className="vd-pc-sub">{p.subtitle}</p>
                      <div className="vd-pc-price-row">
                        <span className="vd-pc-price">₹{p.price}</span>
                        {p.oldPrice && (
                          <span className="vd-pc-old">₹{p.oldPrice}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
