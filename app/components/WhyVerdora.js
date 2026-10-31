// app/components/WhyVerdora.js
'use client';
import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import Link from 'next/link';

const statements = [
  {
    id: 'native',
    title: 'Native Ingredients.',
    subtitle: 'No Substitutes.',
    desc: 'Heirloom seeds, indigenous breeds, and time-tested methods — nothing artificial ever enters our kitchen.',
  },
  {
    id: 'perfect',
    title: 'Only Perfect',
    subtitle: 'Makes The Cut.',
    desc: "Every batch is hand-inspected. If it doesn't meet our standard, it never reaches your home.",
  },
  {
    id: 'farm',
    title: 'Farm to Table,',
    subtitle: 'Within Days.',
    desc: 'We cut out middlemen so your food travels shorter — fresher taste, fairer prices for farmers.',
  },
];

const categoryIcons = [
  { id: 'ghee', label: 'Ghee', emoji: '🧈', match: 'Ghee' },
  { id: 'honey', label: 'Honey', emoji: '🍯', match: 'Honey' },
  { id: 'oils', label: 'Cold-Pressed Oils', emoji: '🥥', match: 'Oils' },
  { id: 'grains', label: 'Grains', emoji: '🌾', match: 'Grains' },
  { id: 'spices', label: 'Spices', emoji: '🌶️', match: 'Spices' },
  { id: 'dryfruits', label: 'Dry Fruits', emoji: '🥜', match: 'Dry Fruits' },
];

export default function WhyVerdora() {
  const { products } = useApp();
  const [activeCat, setActiveCat] = useState('ghee');
  const [activeStatement, setActiveStatement] = useState('native');

  const activeMeta = categoryIcons.find((c) => c.id === activeCat);
  const shown = products.filter(
    (p) => p.category?.toLowerCase() === activeMeta.match.toLowerCase()
  );

  return (
    <section className="vd-why">
      {/* Big heading */}
      <div className="vd-why-head">
        <div className="vd-why-eyebrow">Why Choose Verdora?</div>
        <h2 className="vd-why-title">
          Four generations of care,<br />
          <em>in every single batch.</em>
        </h2>
      </div>

      {/* 3 statements */}
      <div className="vd-why-statements">
        {statements.map((s) => (
          <button
            key={s.id}
            className={`vd-why-stmt ${activeStatement === s.id ? 'active' : ''}`}
            onClick={() => setActiveStatement(s.id)}
          >
            <div className="vd-why-stmt-title">{s.title}</div>
            <div className="vd-why-stmt-sub">{s.subtitle}</div>
            <p className="vd-why-stmt-desc">{s.desc}</p>
          </button>
        ))}
      </div>

      {/* Category chips */}
      <div className="vd-why-catrow">
        {categoryIcons.map((c) => (
          <button
            key={c.id}
            className={`vd-why-cat ${activeCat === c.id ? 'active' : ''}`}
            onClick={() => setActiveCat(c.id)}
          >
            <span className="vd-why-cat-emoji">{c.emoji}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Product strip */}
      <div className="vd-why-products">
        <div className="vd-why-products-head">
          <div>
            <div className="vd-why-prod-eyebrow">In Focus</div>
            <h3 className="vd-why-prod-title">Our {activeMeta.label}</h3>
          </div>
          <Link href={`/shop?cat=${activeCat}`} className="vd-why-prod-viewall">
            View All <span>→</span>
          </Link>
        </div>

        {shown.length === 0 ? (
          <div className="vd-why-empty">
            No products in this category yet — check back soon.
          </div>
        ) : (
          <div className="vd-why-prodgrid">
            {shown.slice(0, 4).map((p) => (
              <Link href={`/product/${p.id}`} className="vd-why-pc" key={p.id}>
                <div className="vd-why-pc-media">
                  <span className="vd-why-pc-emoji">{p.emoji}</span>
                  {p.tag && <span className="vd-why-pc-tag">{p.tag}</span>}
                </div>
                <div className="vd-why-pc-body">
                  <div className="vd-why-pc-name">{p.name}</div>
                  <div className="vd-why-pc-sub">{p.subtitle}</div>
                  <div className="vd-why-pc-price">
                    ₹{p.price}
                    {p.oldPrice && <span className="vd-why-pc-old">₹{p.oldPrice}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}