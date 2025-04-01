// Configuración del servicio API
// Simulación básica de un servicio API para el prototipo

const BASE_URL = 'https://api.example.com'; // Reemplaza con tu API real cuando esté disponible

// Token de autenticación simulado - en una app real vendrá de un login exitoso
let authToken = localStorage.getItem('auth_token');

// Configuración básica para todas las peticiones
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Agregar token de autenticación si existe
const withAuth = (options = {}) => {
  if (authToken) {
    return {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${authToken}`,
      },
    };
  }
  return options;
};

// Funciones auxiliares para peticiones HTTP
async function handleResponse(response) {
  const text = await response.text();
  let data;
  try {
    data = text && JSON.parse(text);
  } catch (error) {
    data = text;
  }

  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}

// Servicio API con métodos para interactuar con el backend
const apiService = {
  // Autenticación
  auth: {
    login: async (email, password) => {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      const data = await handleResponse(response);
      
      // Guardar token en localStorage
      if (data && data.token) {
        authToken = data.token;
        localStorage.setItem('auth_token', data.token);
      }
      
      return data;
    },
    
    register: async (userData) => {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify(userData),
      });
      
      return handleResponse(response);
    },
    
    logout: () => {
      // Limpiar token
      authToken = null;
      localStorage.removeItem('auth_token');
    },
    
    forgotPassword: async (email) => {
      const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      
      return handleResponse(response);
    },
  },
  
  // Usuarios
  users: {
    getProfile: async () => {
      const response = await fetch(`${BASE_URL}/users/profile`, withAuth(defaultOptions));
      return handleResponse(response);
    },
    
    updateProfile: async (userData) => {
      const response = await fetch(`${BASE_URL}/users/profile`, {
        ...withAuth(defaultOptions),
        method: 'PUT',
        body: JSON.stringify(userData),
      });
      
      return handleResponse(response);
    },
  },
  
  // Aquí puedes agregar más endpoints según las necesidades de tu aplicación
};

export default apiService;