// app/learn/faq/page.js
'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'What makes Verdora different from other organic brands?',
    a: 'We work directly with 240+ smallholder farmers. No middlemen, no aggregators. Every batch is hand-checked by our team before it ships.',
  },
  {
    q: 'Do you use preservatives?',
    a: 'Never. Our products are preserved naturally through methods like solar drying, cold pressing, and traditional fermentation.',
  },
  {
    q: 'How do you ensure freshness?',
    a: 'We produce in small batches and ship within 72 hours of packing. That is why we do not stockpile inventory.',
  },
  {
    q: 'What is bilona ghee?',
    a: 'Bilona is the traditional method of churning cultured dahi (yogurt) to extract butter, which is then slow-simmered into ghee. It is more labor-intensive than modern methods but preserves A2 nutrition.',
  },
  {
    q: 'Where do you source your honey?',
    a: 'From wild forest hives in the Western Ghats and Himalayan foothills, harvested by tribal cooperatives using traditional, non-destructive methods.',
  },
  {
    q: 'Is your packaging recyclable?',
    a: 'Yes — glass, tin, and compostable paper. We use zero plastic in our packaging chain.',
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState(0);

  return (
    <section className="vd-page-section">
      <div className="container-narrow">
        <div className="vd-prose vd-prose-center">
          <p className="vd-prose-lede">
            Everything you want to know — answered plainly.
          </p>
        </div>

        <div className="vd-faq-list">
          {faqs.map((f, i) => (
            <div className={`vd-faq-item ${open === i ? 'open' : ''}`} key={i}>
              <button
                className="vd-faq-q"
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span>{f.q}</span>
                <span className="vd-faq-icon">+</span>
              </button>
              <div className="vd-faq-a">
                <div className="vd-faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}