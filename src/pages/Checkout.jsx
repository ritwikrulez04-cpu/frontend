import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const sampleProducts = [
  // ... same six products array as before ...
  {
    id: '1',
    name: 'Ultra Laptop Pro',
    price: 1299.99,
    description:
      'A high‑performance laptop with 16GB RAM, 512GB SSD, and a stunning 15" Retina display.',
    image: 'https://via.placeholder.com/400?text=Laptop+Pro',
  },
  {
    id: '2',
    name: 'Smartphone X',
    price: 999.99,
    description:
      'The latest Smartphone X with quad‑camera system, 5G, and an edge‑to‑edge OLED screen.',
    image: 'https://via.placeholder.com/400?text=Smartphone+X',
  },
  {
    id: '3',
    name: 'Noise‑Cancel Headphones',
    price: 299.99,
    description:
      'Over‑ear wireless headphones with active noise canceling and 30h battery life.',
    image: 'https://via.placeholder.com/400?text=Headphones',
  },
  {
    id: '4',
    name: 'Gaming Mouse',
    price: 59.99,
    description:
      'Ergonomic gaming mouse with customizable RGB lighting and 16000 DPI sensor.',
    image: 'https://via.placeholder.com/400?text=Gaming+Mouse',
  },
  {
    id: '5',
    name: 'Mechanical Keyboard',
    price: 129.99,
    description:
      'Compact mechanical keyboard with hot‑swappable switches and RGB backlighting.',
    image: 'https://via.placeholder.com/400?text=Keyboard',
  },
  {
    id: '6',
    name: '4K Monitor',
    price: 399.99,
    description:
      '27" 4K UHD monitor with HDR support and ultra‑thin bezels for immersive viewing.',
    image: 'https://via.placeholder.com/400?text=4K+Monitor',
  },
];

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = sampleProducts.find((p) => p.id === id);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');

  if (!product) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Product not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add to cart if not there yet
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    // In a real app, process payment here...
    navigate('/success');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Link
        to={`/product/${id}`}
        style={{ marginBottom: '1rem', display: 'inline-block' }}
      >
        ← Back to {product.name}
      </Link>

      <h2>Checkout: {product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '300px', display: 'block', margin: '1rem 0' }}
      />

      <form onSubmit={handleSubmit}>
        {/* Payment Method */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ marginRight: '1rem' }}>Payment Method:</label>
          {['Credit Card', 'PayPal', 'Cash on Delivery'].map((method) => (
            <label key={method} style={{ marginRight: '1rem' }}>
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />{' '}
              {method}
            </label>
          ))}
        </div>

        {/* Conditional Fields */}
        {paymentMethod === 'Credit Card' && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>
                Card Number:
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  style={{ marginLeft: '0.5rem' }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <label>
                Expiry Date:
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  required
                  style={{ marginLeft: '0.5rem' }}
                />
              </label>
            </div>
            <div>
              <label>
                CVV:
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  style={{ marginLeft: '0.5rem' }}
                />
              </label>
            </div>
          </div>
        )}

        {paymentMethod === 'PayPal' && (
          <div style={{ marginBottom: '1rem' }}>
            <label>
              PayPal Email:
              <input
                type="email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                required
                style={{ marginLeft: '0.5rem' }}
              />
            </label>
          </div>
        )}

        {/* Shipping Address */}
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Shipping Address:
            <br />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </label>
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          💳 Confirm Purchase
        </button>
      </form>
    </div>
  );
}