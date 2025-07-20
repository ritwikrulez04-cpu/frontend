// src/pages/Verify.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Verify() {
  const { verify } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledEmail = location.state?.email || '';
  const [form, setForm] = useState({ email: prefilledEmail, code: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (prefilledEmail) {
      setForm((f) => ({ ...f, email: prefilledEmail }));
    }
  }, [prefilledEmail]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const msg = await verify(form);
      setMessage(msg);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      {message && <div className="mb-2 text-green-600">{message}</div>}
      {error && <div className="mb-2 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Verification Code"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Verify Email
        </button>
      </form>
      <p className="mt-4 text-center">
        Didn’t get a code?{' '}
        <Link to="/register" className="text-blue-600 underline">
          Register again
        </Link>
      </p>
    </div>
  );
}
