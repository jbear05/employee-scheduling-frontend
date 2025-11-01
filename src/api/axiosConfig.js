import axios from 'axios';

// Create a custom instance of axios
const api = axios.create({
  //baseURL can be set to the backend API URL
  baseURL: 'http://localhost:8080', 
  // Headers for all requests, can be overridden in individual calls if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;