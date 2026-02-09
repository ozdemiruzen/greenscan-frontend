import React from 'react';
import ReactDOM from 'react-dom/client';
// Dosyalar artık index.js ile aynı klasörde olduğu için doğrudan ./ ile çağırıyoruz
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);