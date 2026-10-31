// app/components/CartSidebar.js
'use client';
import { useApp } from '../contexts/AppContext';

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, placeOrder } = useApp();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>🛒 Your Cart ({totalItems})</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 48 }}>🛍️</div>
            <h3>Your cart is empty</h3>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div style={{ fontSize: 28 }}>{item.emoji}</div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <div>₹{item.price}</div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#d32f2f' }}>✕</button>
              </div>
            ))}
            <div className="cart-footer">
              <div className="total"><span>Total:</span><span>₹{totalPrice}</span></div>
              <button className="checkout-btn" onClick={() => { placeOrder(); onClose(); alert('✅ Order placed!'); }}>Proceed to Checkout →</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}