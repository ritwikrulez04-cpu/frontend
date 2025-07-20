// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({ cardNumber: '', expiry: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) navigate('/login');
    if (cartItems.length === 0) navigate('/');
  }, [user, cartItems, navigate]);

  const validate = () => {
    const errs = {};
    if (!/^\d{16}$/.test(form.cardNumber))
      errs.cardNumber = 'Card must be 16 digits';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry))
      errs.expiry = 'Expiry must be MM/YY';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    clearCart();
    navigate('/success');
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      {['cardNumber', 'expiry'].map((field) => (
        <div key={field} className="mb-3">
          <label className="block mb-1">
            {field === 'cardNumber' ? 'Card Number' : 'Expiry Date (MM/YY)'}
          </label>
          <input
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors[field] && <p className="text-red-600">{errors[field]}</p>}
        </div>
      ))}
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Pay $
        {cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
      </button>
    </form>
  );
}
