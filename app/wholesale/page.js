// app/wholesale/page.js
'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import AuthModal from '../components/AuthModal';

export default function WholesalePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    business: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    category: 'restaurant',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} onAuthOpen={() => setAuthOpen(true)} />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      <main>
        {/* Hero */}
        <section className="wh-hero">
          <div className="container">
            <span className="eyebrow">Wholesale Club</span>
            <h1 className="wh-title">
              Bulk pricing for<br />
              <em>serious kitchens.</em>
            </h1>
            <p className="wh-lede">
              Restaurants, cafés, hotels, and health-food stores — get
              farm-direct organic ingredients at wholesale rates, delivered
              on a schedule that works for you.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Why Join</span>
              <h2>Built for businesses that care</h2>
            </div>

            <div className="wh-benefits">
              {[
                { icon: '💰', title: 'Up to 35% Off', desc: 'Volume-based pricing that scales with your order size.' },
                { icon: '📦', title: 'Priority Shipping', desc: 'Orders above ₹10,000 ship free — pan-India, within 72 hours.' },
                { icon: '🧾', title: 'GST Invoicing', desc: 'Proper GST invoices for accounting and input credit.' },
                { icon: '🤝', title: 'Dedicated Manager', desc: 'One point of contact. Not a ticket queue.' },
                { icon: '📅', title: 'Scheduled Delivery', desc: 'Weekly or monthly — you pick the rhythm.' },
                { icon: '🔬', title: 'Batch Traceability', desc: 'Full farm-to-kitchen traceability for every batch.' },
              ].map((b, i) => (
                <div className="wh-benefit" key={i}>
                  <div className="wh-benefit-icon">{b.icon}</div>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="section-sm" style={{ background: 'var(--paper-warm)' }}>
          <div className="container">
            <div className="wh-form-wrap">
              <div className="wh-form-head">
                <span className="eyebrow">Get Started</span>
                <h2>Request wholesale pricing</h2>
                <p>Fill this once. We&apos;ll send you a price list within 24 hours.</p>
              </div>

              {submitted ? (
                <div className="wh-success">
                  <div className="wh-success-icon">✓</div>
                  <h3>Request received</h3>
                  <p>
                    Thanks {form.name.split(' ')[0]} — we&apos;ve got your
                    details. Expect a wholesale price list at {form.email}{' '}
                    within 24 hours.
                  </p>
                </div>
              ) : (
                <form className="wh-form" onSubmit={handleSubmit}>
                  <div className="wh-form-row">
                    <div className="field">
                      <label>Business Name *</label>
                      <input
                        required
                        value={form.business}
                        onChange={(e) => setForm({ ...form, business: e.target.value })}
                        placeholder="e.g. The Green Table"
                      />
                    </div>
                    <div className="field">
                      <label>Your Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name"
                      />
                    </div>
                  </div>

                  <div className="wh-form-row">
                    <div className="field">
                      <label>Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@business.com"
                      />
                    </div>
                    <div className="field">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 ..."
                      />
                    </div>
                  </div>

                  <div className="wh-form-row">
                    <div className="field">
                      <label>City *</label>
                      <input
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="Mumbai, Delhi..."
                      />
                    </div>
                    <div className="field">
                      <label>Business Type</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                      >
                        <option value="restaurant">Restaurant / Café</option>
                        <option value="hotel">Hotel</option>
                        <option value="store">Health Food Store</option>
                        <option value="cloud">Cloud Kitchen</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label>Tell us about your needs</label>
                    <textarea
                      rows="4"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Which products, what quantities, how often?"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg wh-submit">
                    Request Wholesale Pricing →
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}