// src/pages/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const msg = await register(form);
      setSuccess(msg || 'Registration successful!');
      // after registering, send user to login
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const container = {
    maxWidth: 400,
    margin: '4rem auto',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };
  const input = {
    padding: '0.5rem',
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: '1rem',
  };
  const button = {
    marginTop: '0.5rem',
    padding: '0.75rem',
    backgroundColor: '#286f48',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: '1rem',
  };

  return (
    <div style={container}>
      <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Register</h2>
      {success && (
        <div
          style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}
        >
          {success}
        </div>
      )}
      {error && (
        <div
          style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}
        >
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
      >
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          autoComplete="username"
          style={input}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          style={input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
          style={input}
        />
        <button type="submit" disabled={loading} style={button}>
          {loading ? 'Registering…' : 'Register'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#286f48', fontWeight: 'bold' }}>
          Log in
        </Link>
      </p>
    </div>
  );
}
