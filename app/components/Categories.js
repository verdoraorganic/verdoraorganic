// app/components/Categories.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/utils/products';

export default function Categories() {
  const [active, setActive] = useState('All');
  return (
    <div className="categories fade-in delay-1">
      <div className="section-header">
        <h2>Most Loved</h2>
        <Link href="/shop">View All →</Link>
      </div>
      <div className="category-tabs">
        {categories.map((cat, i) => (
          <button key={i} className={`category-tab ${active === cat ? 'active' : ''}`} onClick={() => setActive(cat)}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
