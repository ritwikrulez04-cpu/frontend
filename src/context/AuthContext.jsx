// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
axios.defaults.baseURL = API;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// If token exists in localStorage, attach it now
const existingToken = localStorage.getItem('token');
if (existingToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${existingToken}`;
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Re‑attach token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, []);

  const register = async ({ username, email, password }) => {
    const { data } = await axios.post('/api/auth/register', {
      username,
      email,
      password,
    });
    return data.message;
  };

  const verify = async ({ email, code }) => {
    const { data } = await axios.post('/api/auth/verify-email', {
      email,
      code,
    });
    return data.message;
  };

  const login = async ({ email, password }) => {
    const { data } = await axios.post('/api/auth/login', {
      email,
      password,
    });
    // store and attach
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    setUser(data.user);
  };

  const logout = () => {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, verify, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
