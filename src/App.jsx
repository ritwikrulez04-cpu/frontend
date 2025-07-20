// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { fetchProducts } from './api';

export default function App() {
  const { user, logout } = useAuth();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => console.error('Error loading products:', err));
  }, []);

  // Only show items with qty > 0
  const visibleCartItems = cartItems.filter((item) => item.quantity > 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* ─── HEADER ──────────────────────────────────────────────────────────────── */}
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-green-800">🛍️ ShoppyGlobe</h1>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">Hi, {user.username}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 underline">
                Login
              </Link>
              <Link to="/register" className="text-green-600 underline">
                Register
              </Link>
            </>
          )}
          <Link
            to="/cart"
            className="bg-purple-600 text-white px-3 py-1 rounded"
          >
            Cart ({visibleCartItems.reduce((sum, i) => sum + i.quantity, 0)})
          </Link>
        </div>
      </header>

      {/* ─── MAIN CONTENT (PRODUCTS + MINI CART) ───────────────────────────────── */}
      <div className="flex gap-6">
        {/* ── Products Grid ── */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <p className="text-gray-600">Loading products...</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded p-4 shadow hover:shadow-md flex flex-col items-center text-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-semibold text-green-800">
                  {product.name}
                </h3>
                <p className="font-bold text-yellow-600 mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </main>

        {/* ── Mini Cart Sidebar ── */}
        <aside className="w-80 border-l-4 border-yellow-500 p-4 sticky top-6 bg-white">
          <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>

          {visibleCartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col space-y-4">
              {visibleCartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      {item.name} × {item.quantity}
                    </p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <Link to="/cart" className="mt-4 text-blue-600 underline">
                Go to full cart
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
