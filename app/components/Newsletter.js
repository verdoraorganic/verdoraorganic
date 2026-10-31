// app/components/Newsletter.js
'use client';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content fade-in">
          <div className="script">Join Our Community</div>
          <h2>Get 10% Off Your First Order</h2>
          <p>Subscribe for organic tips, recipes, and exclusive offers.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" placeholder="Enter your email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <button type="submit">Subscribe →</button>
          </form>
          <p className="newsletter-status" aria-live="polite">
            {submitted ? 'Thanks — your welcome offer is on its way.' : ''}
          </p>
        </div>
      </div>
    </section>
  );
}
