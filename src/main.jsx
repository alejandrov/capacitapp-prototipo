import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Make sure this import is correct
import App from './App';
import './styles/global.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// Comentamos el registro del Service Worker por ahora para evitar errores en desarrollo
// En producción, descomenta esta parte para habilitar las funcionalidades de PWA
/*
if (import.meta.env.PROD) {
  serviceWorkerRegistration.register();
} else {
  try {
    serviceWorkerRegistration.register();
    console.log('Service Worker registrado en modo desarrollo');
  } catch (error) {
    console.log('Service Worker no registrado en desarrollo:', error);
  }
}
*/