import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// Register PWA service worker for offline asset caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Offline fallback handling
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
