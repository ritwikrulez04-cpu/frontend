import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const sampleProducts = [
  {
    _id: '1',
    name: 'Ultra Laptop Pro',
    price: 1299.99,
    imageUrl: '/images/laptop.jpeg',
  },
  {
    _id: '2',
    name: 'Smartphone X',
    price: 999.99,
    imageUrl: '/images/smartphone.jpeg',
  },
  {
    _id: '3',
    name: 'Noise‑Cancel Headphones',
    price: 299.99,
    imageUrl: '/images/headphones.jpeg',
  },
  {
    _id: '4',
    name: 'Gaming Mouse',
    price: 59.99,
    imageUrl: '/images/mouse.jpeg',
  },
  {
    _id: '5',
    name: 'Mechanical Keyboard',
    price: 129.99,
    imageUrl: '/images/keyboard.jpeg',
  },
  {
    _id: '6',
    name: '4K Monitor',
    price: 399.99,
    imageUrl: '/images/monitor.jpeg',
  },
];

export default function Home() {
  const [products] = useState(sampleProducts);
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Search products…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '0.75rem',
          margin: '0 0 1.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '1rem',
        }}
      />

      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>No products found.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
