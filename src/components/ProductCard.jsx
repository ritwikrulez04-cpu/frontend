import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: 8,
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: '100%',
              maxHeight: '160px',
              objectFit: 'cover',
              borderRadius: 4,
              marginBottom: '0.75rem',
            }}
          />
        )}
        <h3 style={{ margin: '0.5rem 0', color: '#286f48' }}>{product.name}</h3>
        <p style={{ margin: 0, color: '#f2c94c', fontWeight: 'bold' }}>
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
