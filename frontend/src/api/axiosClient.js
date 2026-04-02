import axios from 'axios';

// Create an Axios instance
const axiosClient = axios.create({
  // Points to local dev proxy or direct URL
  baseURL: 'https://taskmanager-react-production.up.railway.app/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT to every request if it exists
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Typical Bearer token convention
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
