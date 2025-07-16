
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const sampleProducts = [
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

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = sampleProducts.find((p) => p.id === id);
  if (!product) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Product not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/" style={{ marginBottom: '1rem', display: 'inline-block' }}>
        ← Back to Products
      </Link>

      <h2>{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '400px', display: 'block', margin: '1rem 0' }}
      />
      <p>{product.description}</p>
      <p style={{ fontWeight: 'bold' }}>Price: ${product.price.toFixed(2)}</p>

      <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
          })
        }
        style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}
      >
        ➕ Add to Cart
      </button>

      <button
        onClick={() => navigate(`/checkout/${product.id}`)}
        style={{ padding: '0.5rem 1rem' }}
      >
        💳 Buy Now
      </button>
    </div>
  );
}
