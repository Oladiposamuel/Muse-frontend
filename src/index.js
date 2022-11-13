import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { IsTopProvider } from './context/isTopContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IsTopProvider>
      <App />
    </IsTopProvider>
  </React.StrictMode>
);

