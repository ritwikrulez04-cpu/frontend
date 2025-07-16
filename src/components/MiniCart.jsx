// src/components/MiniCart.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function MiniCart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { pathname } = useLocation();

  // Don’t render the mini‑cart when on the full cart page
  if (pathname === '/cart') return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <aside className="mini-cart">
      <h4>🛒 Your Cart</h4>

      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mini-list">
            {cartItems.map((item) => (
              <li key={item.id} className="mini-item">
                {/* Thumbnail */}
                <img src={item.image} alt={item.name} className="mini-thumb" />

                {/* Details */}
                <div className="mini-details">
                  <p className="mini-name">{item.name}</p>
                  <div className="mini-qty-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="mini-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove */}
                <button
                  className="mini-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <p className="mini-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </p>
          <Link to="/cart" className="mini-checkout-btn">
            View Full Cart
          </Link>
        </>
      )}
    </aside>
  );
}
