import axios from 'axios';

// Get the backend URL from the environment variable
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
console.log("API Base URL:", BASE_URL);
console.log("API Base URL is defined:", !!BASE_URL);

// Create a custom instance of Axios with a base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;