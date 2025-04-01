// Este archivo maneja el registro del service worker para la PWA
// Para entornos de desarrollo y producción

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register() {
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    // La URL del service worker se construye con la URL base
    const publicUrl = new URL(import.meta.env.BASE_URL, window.location.href);
    
    if (publicUrl.origin !== window.location.origin) {
      // Si la URL base está en un origen diferente, no podremos registrar el service worker
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${import.meta.env.BASE_URL}sw.js`;

      if (isLocalhost) {
        // Estamos en localhost, verificaremos si existe el service worker
        checkValidServiceWorker(swUrl);

        navigator.serviceWorker.ready.then(() => {
          console.log('Esta aplicación web está siendo servida por un service worker en desarrollo.');
        });
      } else {
        // No estamos en localhost, simplemente registramos el service worker
        registerValidSW(swUrl);
      }
    });
  } 
  // Para forzar el registro en desarrollo (solo para pruebas)
  else if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js';  // Ruta al service worker
      registerValidSW(swUrl);
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('Service Worker registrado con éxito');
      
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // En este punto, el contenido precargado ha sido obtenido,
              // pero el service worker anterior seguirá sirviendo el
              // contenido antiguo hasta que todas las pestañas cliente se cierren.
              console.log('Nuevo contenido disponible. Por favor actualiza la página.');
              
              // Opcionalmente, mostrar notificación de actualización
              if (window.confirm('Nueva versión disponible. ¿Actualizar ahora?')) {
                window.location.reload();
              }
            } else {
              // En este punto, todo ha sido precargado.
              console.log('Contenido almacenado en caché para uso sin conexión.');
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error durante el registro del Service Worker:', error);
    });
}

function checkValidServiceWorker(swUrl) {
  // Verificar si el service worker se puede encontrar
  fetch(swUrl)
    .then((response) => {
      // Asegurarse de que el service worker exista y que estamos recibiendo un archivo JS
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No se encontró el service worker. Probablemente sea otra aplicación
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker encontrado. Proceder normalmente
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log('No hay conexión a Internet. La aplicación se ejecuta en modo offline.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}