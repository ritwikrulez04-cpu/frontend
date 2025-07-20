// src/components/MiniCart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function MiniCart() {
  const { cartItems, updateQuantity } = useCart();
  const visible = cartItems.filter((i) => i.quantity > 0);

  if (visible.length === 0) {
    return <p style={{ color: '#555' }}>Your cart is empty.</p>;
  }

  return (
    <>
      <h2 style={{ color: '#286f48', marginBottom: '1rem' }}>🛒 Your Cart</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {visible.map((item, idx) => (
          <div
            key={item.id ?? idx} /* ← Make sure there *is* a key here */
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <p style={{ margin: 0 }}>{item.name}</p>
              <p style={{ margin: 0, color: '#f2c94c' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                –
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/cart"
        style={{
          display: 'block',
          marginTop: '1rem',
          textAlign: 'center',
          color: '#286f48',
          textDecoration: 'underline',
        }}
      >
        View Full Cart
      </Link>
    </>
  );
}
