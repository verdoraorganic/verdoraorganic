// app/admin/products/page.js
'use client';
import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import AdminLayout from '../../components/AdminLayout';

export default function AdminProducts() {
  const { products, addProduct, deleteProduct, updateProductStock } = useApp();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '', subtitle: '', price: '', stock: '', emoji: '🛒', category: '', description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...form,
      price: Number(form.price),
      stock: Math.max(0, Number(form.stock)),
      rating: 4.5,
      reviews: 0,
      id: editing === 'new' ? Date.now() : editing
    };
    addProduct(productData);
    setForm({ name: '', subtitle: '', price: '', stock: '', emoji: '🛒', category: '', description: '' });
    setEditing(null);
  };

  const handleEdit = (product) => {
    setEditing(product.id);
    setForm({
      name: product.name,
      subtitle: product.subtitle,
      price: product.price.toString(),
      stock: product.stock.toString(),
      emoji: product.emoji,
      category: product.category || '',
      description: product.description || ''
    });
  };

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1>📦 Manage Products</h1>
        <button className="btn-primary" onClick={() => setEditing('new')}>+ Add New</button>
      </div>

      {(editing === 'new' || editing) && (
        <div className="admin-form" style={{ marginBottom: 30, background: 'white', padding: 30, borderRadius: 16, boxShadow: 'var(--shadow)' }}>
          <h3>{editing === 'new' ? 'Add New Product' : 'Edit Product'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name</label>
              <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input type="number" min="0" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input type="number" min="0" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} placeholder="e.g. Spices" required />
            </div>
            <div className="form-group">
              <label>Emoji</label>
              <input value={form.emoji} onChange={(e) => setForm({...form, emoji: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows="3" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="btn-primary">{editing === 'new' ? 'Add Product' : 'Update'}</button>
              <button type="button" className="btn-secondary" onClick={() => { setEditing(null); setForm({ name: '', subtitle: '', price: '', stock: '', emoji: '🛒', category: '', description: '' }); }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table">
        <table>
          <thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={{ fontSize: 32 }}>{p.emoji}</td>
                <td><strong>{p.name}</strong></td>
                <td>₹{p.price}</td>
                <td>
                  <input type="number" min="0" value={p.stock} onChange={(e) => updateProductStock(p.id, Math.max(0, Number(e.target.value) || 0))} style={{ width: 60, padding: 4, borderRadius: 6, border: '1px solid #ddd' }} />
                </td>
                <td><span className={`status-badge ${p.stock > 0 ? 'active' : 'inactive'}`}>{p.stock > 0 ? 'In Stock' : 'Out'}</span></td>
                <td>
                  <button className="btn-primary" onClick={() => handleEdit(p)} style={{ padding: '4px 12px', marginRight: 8 }}>✏️</button>
                  <button className="delete-btn" onClick={() => { if (window.confirm(`Delete ${p.name}? This cannot be undone.`)) deleteProduct(p.id); }} style={{ padding: '4px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
