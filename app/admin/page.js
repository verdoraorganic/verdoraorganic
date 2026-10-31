// app/admin/page.js
'use client';
import { useApp } from '../contexts/AppContext';
import AdminLayout from '../components/AdminLayout';

export default function AdminDashboard() {
  const { products, orders } = useApp();
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockItems = products.filter(p => p.stock > 0 && p.stock <= 5).length;
  const outOfStockItems = products.filter(p => p.stock === 0).length;

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1>📊 Dashboard</h1>
        <div className="admin-stats">
          <div className="stat-card"><div className="number">{totalProducts}</div><div className="label">Products</div></div>
          <div className="stat-card"><div className="number">{totalOrders}</div><div className="label">Orders</div></div>
          <div className="stat-card"><div className="number">₹{totalRevenue}</div><div className="label">Revenue</div></div>
          <div className="stat-card"><div className="number" style={{ color: lowStockItems > 0 ? '#f39c12' : '#27ae60' }}>{lowStockItems}</div><div className="label">Low Stock</div></div>
          <div className="stat-card"><div className="number" style={{ color: outOfStockItems > 0 ? '#e74c3c' : '#27ae60' }}>{outOfStockItems}</div><div className="label">Out of Stock</div></div>
        </div>
      </div>

      <div className="admin-table">
        <h3>📦 Recent Orders</h3>
        {orders.length === 0 ? (
          <p style={{ padding: 20, color: '#999' }}>No orders yet</p>
        ) : (
          <table>
            <thead><tr><th>Order ID</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {orders.slice(-5).reverse().map(order => (
                <tr key={order.id}>
                  <td>#OR-{order.id.toString().slice(-6)}</td>
                  <td>{order.items.length} items</td>
                  <td>₹{order.total}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td><span className="status-badge active">{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}