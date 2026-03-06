import axios from "axios";

const normalizedBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: normalizedBaseUrl
});

// Attach JWT automatically for protected endpoints.
api.interceptors.request.use((config) => {
  try {
    const userData = localStorage.getItem("smartcart_user");
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
  } catch {
    // Ignore malformed storage data to avoid runtime crashes.
  }

  return config;
});

export default api;
