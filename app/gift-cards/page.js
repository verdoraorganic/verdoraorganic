// app/gift-cards/page.js
'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import AuthModal from '../components/AuthModal';
import { useApp } from '../contexts/AppContext';

const cardValues = [500, 1000, 2000, 5000];

export default function GiftCardsPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selected, setSelected] = useState(1000);
  const [custom, setCustom] = useState('');
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [added, setAdded] = useState(false);
  const { addToCart } = useApp();

  const value = custom ? parseInt(custom) : selected;

  const handleAdd = () => {
    if (!value || value < 100) return;
    addToCart({
      id: `gift-${Date.now()}`,
      name: `Verdora Gift Card ₹${value}`,
      price: value,
      emoji: '🎁',
      isGiftCard: true,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} onAuthOpen={() => setAuthOpen(true)} />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <main>
        <section className="gc-hero">
          <div className="container">
            <span className="eyebrow">Gift Cards</span>
            <h1 className="gc-title">
              Give good food.<br />
              <em>Give good health.</em>
            </h1>
            <p className="gc-lede">
              A thoughtful gift for anyone who cares about what they eat.
              Delivered by email, valid for 12 months.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="gc-grid">
              {/* Left: card preview */}
              <div className="gc-preview">
                <div className="gc-preview-card">
                  <div className="gc-preview-top">
                    <div className="gc-preview-brand">Verdora</div>
                    <div className="gc-preview-label">GIFT CARD</div>
                  </div>
                  <div className="gc-preview-value">₹{value || '0'}</div>
                  <div className="gc-preview-bottom">
                    <div className="gc-preview-recipient">
                      {recipient ? `For ${recipient}` : 'For someone you love'}
                    </div>
                    <div className="gc-preview-date">Valid 12 months</div>
                  </div>
                </div>
                {message && (
                  <div className="gc-preview-note">
                    <div className="gc-preview-note-label">Your message</div>
                    <div className="gc-preview-note-text">&ldquo;{message}&rdquo;</div>
                    {sender && <div className="gc-preview-note-from">— {sender}</div>}
                  </div>
                )}
              </div>

              {/* Right: form */}
              <div className="gc-form">
                <div className="gc-form-head">
                  <h2>Send a Gift Card</h2>
                  <p>Pick an amount, add a note, we&apos;ll send it by email.</p>
                </div>

                {/* Value */}
                <div className="field">
                  <label>Choose amount *</label>
                  <div className="gc-values">
                    {cardValues.map((v) => (
                      <button
                        key={v}
                        type="button"
                        className={`gc-value ${!custom && selected === v ? 'active' : ''}`}
                        onClick={() => { setSelected(v); setCustom(''); }}
                      >
                        ₹{v}
                      </button>
                    ))}
                    <input
                      type="number"
                      className="gc-value-custom"
                      placeholder="Custom ₹"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      min="100"
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Recipient name</label>
                  <input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="e.g. Priya"
                  />
                </div>

                <div className="field">
                  <label>Your name</label>
                  <input
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="e.g. Aman"
                  />
                </div>

                <div className="field">
                  <label>Personal message (optional)</label>
                  <textarea
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a note to go with the gift..."
                  />
                </div>

                <button
                  type="button"
                  className={`btn btn-primary btn-lg btn-block ${added ? 'added' : ''}`}
                  onClick={handleAdd}
                  disabled={!value || value < 100}
                >
                  {added ? '✓ Added to Cart' : `Add Gift Card — ₹${value || 0}`}
                </button>

                <p className="gc-note">
                  Gift cards are delivered by email within 5 minutes of order.
                  They never expire unused balance after activation — only
                  the card itself expires after 12 months.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}