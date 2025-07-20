import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity } = useCart();
  const navigate = useNavigate();

  const visible = cartItems.filter((i) => i.quantity > 0);
  const total = visible.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (visible.length === 0) {
    return (
      <p style={{ padding: '2rem', textAlign: 'center', color: '#555' }}>
        Your cart is empty.
      </p>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Your Cart</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {visible.map(({ id, name, price, quantity }) => (
          <div
            key={id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <p style={{ margin: 0 }}>{name}</p>
              <p style={{ margin: 0 }}>${(price * quantity).toFixed(2)}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => updateQuantity(id, quantity - 1)}>
                –
              </button>
              <span>{quantity}</span>
              <button onClick={() => updateQuantity(id, quantity + 1)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '1rem',
          textAlign: 'right',
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
      >
        Total: ${total.toFixed(2)}
      </div>

      <button
        onClick={() => navigate('/checkout')}
        style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#286f48',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Proceed to Checkout
      </button>

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Or{' '}
        <Link to="/" style={{ color: '#286f48', textDecoration: 'underline' }}>
          continue shopping
        </Link>
      </p>
    </div>
  );
}
