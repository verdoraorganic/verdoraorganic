// app/admin/orders/page.js
'use client';
import { useApp } from '../../contexts/AppContext';
import AdminLayout from '../../components/AdminLayout';

export default function AdminOrders() {
  const { orders } = useApp();

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1>📋 Orders</h1>
        <div className="stat-card"><div className="number">{orders.length}</div><div className="label">Total Orders</div></div>
      </div>

      <div className="admin-table">
        {orders.length === 0 ? (
          <p style={{ padding: 40, textAlign: 'center', color: '#999' }}>No orders placed yet</p>
        ) : (
          <table>
            <thead><tr><th>Order ID</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {orders.slice().reverse().map(order => (
                <tr key={order.id}>
                  <td>#OR-{order.id.toString().slice(-6)}</td>
                  <td>{order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}</td>
                  <td>₹{order.total}</td>
                  <td>{new Date(order.date).toLocaleString()}</td>
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