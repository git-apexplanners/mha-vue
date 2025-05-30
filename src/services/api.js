import axios from 'axios';
// Create an axios instance with default config
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(function (config) {
    var token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = "Bearer ".concat(token);
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
// Add a response interceptor to handle common errors
api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
export default api;
