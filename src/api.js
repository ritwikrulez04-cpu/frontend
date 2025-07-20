// src/api.js
const BASE = import.meta.env.VITE_API_BASE_URL || '';
console.log('⛓️  API base URL is:', BASE || '(empty, using same origin)');

export async function fetchProducts() {
  const url = `${BASE}/api/products`;
  console.log('🔍  fetchProducts calling:', url);
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    console.error('❌  fetchProducts failed:', res.status, text);
    throw new Error(`Failed to fetch products (${res.status})`);
  }
  const data = await res.json();
  console.log('✅  fetchProducts got data:', data);
  return data;
}

// …rest of your functions unchanged…
