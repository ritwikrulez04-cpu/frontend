// src/pages/Cart.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Your Cart</h2>
        <p>
          Your cart is empty. <Link to="/">Go shopping</Link>.
        </p>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
            background: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
            <p style={{ margin: '0.5rem 0' }}>
              ${item.price.toFixed(2)} × {item.quantity} = $
              {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>

          {/* ─── Quantity Controls ─── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              −
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              style={{ width: '50px', textAlign: 'center' }}
            />
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
          </div>

          <div style={{ marginLeft: '1rem' }}>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}

      <h3 style={{ textAlign: 'right' }}>Total: ${total.toFixed(2)}</h3>

      <div style={{ textAlign: 'right', marginTop: '1rem' }}>
        <button
          onClick={() => navigate(`/checkout/${cartItems[0].id}`)}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
