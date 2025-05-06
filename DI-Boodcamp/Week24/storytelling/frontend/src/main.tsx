import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App'; // <--- правильный путь к App.tsx
import './index.css'; // если используешь стили

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);