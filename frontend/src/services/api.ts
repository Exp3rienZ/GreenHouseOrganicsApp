// frontend/src/services/api.ts
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request-Interceptor für Auth-Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response-Interceptor für Fehlerbehandlung
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Globale Fehlerbehandlung kann hier implementiert werden
        return Promise.reject(error);
    }
);

export default api;