
import React, { useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MiniCart from './MiniCart';

export default function Layout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: '#333',
          color: '#fff',
        }}
      >
        <h1 style={{ margin: 0 }}>🛍️ ShoppyGlobe</h1>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link
            to="/"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Home
          </Link>
          <Link
            to="/cart"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Cart
          </Link>
          {!user && (
            <>
              <Link
                to="/login"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Register
              </Link>
            </>
          )}
        </nav>
        {user && (
          <div>
            <span style={{ marginRight: '1rem' }}>
              Welcome, {user.username}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>

      <main style={{ display: 'flex', marginTop: 0 }}>
        <div style={{ flex: 1, padding: '20px' }}>
          <Outlet />
        </div>
        {pathname !== '/cart' && <MiniCart />}
      </main>
    </div>
  );
}
