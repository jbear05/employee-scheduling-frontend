import axios from 'axios';

// Create a custom instance of axios
const api = axios.create({
  // **IMPORTANT**: Replace with the URL and port of running Spring Boot backend
  baseURL: 'http://localhost:8080', 
  // Add headers if needed (e.g., for JSON content type or authentication)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;