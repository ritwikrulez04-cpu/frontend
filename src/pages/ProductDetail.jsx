import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const sampleProducts = [
  {
    _id: '1',
    name: 'Ultra Laptop Pro',
    price: 1299.99,
    description:
      'A high‑performance laptop with 16GB RAM, 512GB SSD, and a stunning 15" Retina display.',
    imageUrl: '/images/laptop.jpeg',
  },
  {
    _id: '2',
    name: 'Smartphone X',
    price: 999.99,
    description:
      'The latest Smartphone X with quad‑camera system, 5G, and an edge‑to‑edge OLED screen.',
    imageUrl: '/images/smartphone.jpeg',
  },
  {
    _id: '3',
    name: 'Noise‑Cancel Headphones',
    price: 299.99,
    description:
      'Over‑ear wireless headphones with active noise canceling and 30h battery life.',
    imageUrl: '/images/headphones.jpeg',
  },
  {
    _id: '4',
    name: 'Gaming Mouse',
    price: 59.99,
    description:
      'Ergonomic gaming mouse with customizable RGB lighting and 16000 DPI sensor.',
    imageUrl: '/images/mouse.jpeg',
  },
  {
    _id: '5',
    name: 'Mechanical Keyboard',
    price: 129.99,
    description:
      'Compact mechanical keyboard with hot‑swappable switches and RGB backlighting.',
    imageUrl: '/images/keyboard.jpeg',
  },
  {
    _id: '6',
    name: '4K Monitor',
    price: 399.99,
    description:
      '27" 4K UHD monitor with HDR support and ultra‑thin bezels for immersive viewing.',
    imageUrl: '/images/monitor.jpeg',
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = sampleProducts.find((p) => p._id === id);

  if (!product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/" style={{ color: '#286f48', textDecoration: 'underline' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: 800,
        margin: '2rem auto',
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}
    >
      <Link to="/" style={{ color: '#286f48', textDecoration: 'underline' }}>
        ← Back to Products
      </Link>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: '100%',
            maxWidth: 400,
            borderRadius: 4,
            margin: '1rem 0',
            objectFit: 'cover',
          }}
        />
      )}

      <h2 style={{ marginBottom: '1rem' }}>{product.name}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: 1.5 }}>
        {product.description}
      </p>
      <p
        style={{
          fontWeight: 'bold',
          fontSize: '1.25rem',
          marginBottom: '1.5rem',
          color: '#286f48',
        }}
      >
        ${product.price.toFixed(2)}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button
          onClick={() =>
            addToCart({
              id: product._id,
              name: product.name,
              price: product.price,
            })
          }
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#286f48',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          ➕ Add to Cart
        </button>

        <button
          onClick={() => navigate('/checkout')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f2c94c',
            color: '#000',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          💳 Buy Now
        </button>
      </div>
    </div>
  );
}
