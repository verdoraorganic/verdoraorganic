// app/components/AdminLayout.js
'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../contexts/AppContext';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { isAdmin } = useApp();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('isAdmin');
      if (!isAdmin && !saved) {
        router.push('/admin/login');
      }
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return (
      <div style={{ padding: 60, textAlign: 'center' }}>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          🌱 VERDORA<span>ORGANIC</span>
        </div>
        <nav>
          <Link href="/admin" className="admin-nav-item">📊 Dashboard</Link>
          <Link href="/admin/products" className="admin-nav-item">📦 Products</Link>
          <Link href="/admin/orders" className="admin-nav-item">📋 Orders</Link>
          <Link href="/admin/settings" className="admin-nav-item">⚙️ Settings</Link>
          <Link href="/" className="admin-nav-item" style={{ marginTop: 40, color: 'rgba(255,255,255,0.4)' }}>← Back to Store</Link>
        </nav>
      </aside>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}