// src/components/Layout.jsx
import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MiniCart from './MiniCart';

export default function Layout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const hideMini = ['/login', '/register', '/verify'];

  const doLogout = () => {
    logout();
    nav('/');
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '80px',
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    zIndex: 1000,
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };
  const navStyle = { display: 'flex', gap: '2rem', fontSize: '1.1rem' };
  const linkStyle = { color: '#fff', textDecoration: 'none' };
  const logoutBtn = {
    backgroundColor: '#f2c94c',
    color: '#000',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const containerStyle = {
    paddingTop: '80px',
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f0f4f1',
  };

  const mainStyle = { flex: 1, padding: '2rem' };
  const sidebarStyle = {
    width: '300px',
    backgroundColor: '#fff',
    borderLeft: '4px solid #f2c94c',
    padding: '1rem',
    position: 'sticky',
    top: '100px',
    height: 'calc(100vh - 100px)',
    overflowY: 'auto',
  };

  return (
    <div>
      <header style={headerStyle}>
        <Link to="/" style={logoStyle}>
          🛍️ ShoppyGlobe
        </Link>
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <Link to="/cart" style={linkStyle}>
            Cart
          </Link>
          {!user ? (
            <>
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
              <Link to="/register" style={linkStyle}>
                Register
              </Link>
            </>
          ) : (
            <>
              <span>Hi, {user.username}</span>
              <button style={logoutBtn} onClick={doLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>

      <div style={containerStyle}>
        <main style={mainStyle}>
          <Outlet />
        </main>

        {!hideMini.includes(pathname) && (
          <aside style={sidebarStyle}>
            <MiniCart />
          </aside>
        )}
      </div>
    </div>
  );
}
