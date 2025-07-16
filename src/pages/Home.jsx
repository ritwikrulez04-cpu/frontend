// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const sampleProducts = [
  {
    id: 1,
    name: 'Ultra Laptop Pro',
    price: 1299.99,
    image: 'https://via.placeholder.com/200?text=Laptop+Pro',
  },
  {
    id: 2,
    name: 'Smartphone X',
    price: 999.99,
    image: 'https://via.placeholder.com/200?text=Smartphone+X',
  },
  {
    id: 3,
    name: 'Headphones',
    price: 299.99,
    image: 'https://via.placeholder.com/200?text=Headphones',
  },
  {
    id: 4,
    name: 'Gaming Mouse',
    price: 59.99,
    image: 'https://via.placeholder.com/200?text=Gaming+Mouse',
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://via.placeholder.com/200?text=Keyboard',
  },
  {
    id: 6,
    name: '4K Monitor',
    price: 399.99,
    image: 'https://via.placeholder.com/200?text=4K+Monitor',
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = sampleProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>

      {/* ─── Search Box ─── */}
      <input
        type="text"
        placeholder="Search products…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '0.5rem',
          margin: '1rem 0',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {filtered.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <ProductCard product={p} />
          </Link>
        ))}
      </div>
    </div>
  );
}
