import React from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>✅ Thank you for your purchase!</h2>
      <p>Your order has been placed successfully.</p>
      <Link to="/">Back to shopping</Link>
    </div>
  );
}