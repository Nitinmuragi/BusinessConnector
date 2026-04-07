import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'  // Make sure this points to the file with @tailwind directives

const PROD_API_BASE_URL = 'https://businessconnector.onrender.com';
const DEFAULT_API_BASE_URL = import.meta.env.PROD ? PROD_API_BASE_URL : 'http://localhost:8080';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');
const LOCAL_BACKEND = 'http://localhost:8080';

const originalFetch = window.fetch.bind(window);
window.fetch = (input, init) => {
  if (typeof input === 'string' && input.startsWith(LOCAL_BACKEND)) {
    const rewrittenUrl = `${API_BASE_URL}${input.slice(LOCAL_BACKEND.length)}`;
    return originalFetch(rewrittenUrl, init);
  }

  if (input instanceof Request && input.url.startsWith(LOCAL_BACKEND)) {
    const rewrittenRequest = new Request(
      `${API_BASE_URL}${input.url.slice(LOCAL_BACKEND.length)}`,
      input
    );
    return originalFetch(rewrittenRequest, init);
  }

  return originalFetch(input, init);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)