import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Cambiamos HashRouter por BrowserRouter
import App from './App';
import './styles/global.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Registrar el Service Worker en producción
if (import.meta.env.PROD) {
  serviceWorkerRegistration.register();
}