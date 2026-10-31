// app/admin/settings/page.js
'use client';
import { useApp } from '../../contexts/AppContext';
import AdminLayout from '../../components/AdminLayout';

export default function AdminSettings() {
  const { isAdmin, setIsAdmin } = useApp();

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1>⚙️ Settings</h1>
      </div>

      <div style={{ background: 'white', padding: 30, borderRadius: 16, boxShadow: 'var(--shadow)' }}>
        <h3>Admin Access</h3>
        <div className="form-group" style={{ marginTop: 16 }}>
          <button className={`btn-primary ${isAdmin ? '' : 'btn-secondary'}`} onClick={() => setIsAdmin(!isAdmin)}>
            {isAdmin ? '🟢 Admin Mode ON' : '🔴 Admin Mode OFF'}
          </button>
          <p style={{ marginTop: 8, color: '#666' }}>
            {isAdmin ? 'You have full admin access' : 'Switch to admin mode to manage products'}
          </p>
        </div>
        <div className="form-group" style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #eee' }}>
          <h4>Quick Links</h4>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
            <a href="/admin" className="btn-primary" style={{ textDecoration: 'none' }}>📊 Dashboard</a>
            <a href="/admin/products" className="btn-primary" style={{ textDecoration: 'none' }}>📦 Products</a>
            <a href="/admin/orders" className="btn-primary" style={{ textDecoration: 'none' }}>📋 Orders</a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}