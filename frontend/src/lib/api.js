// API configuration and utilities
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - could redirect to login
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    login: async (email, password) => {
      const response = await axiosInstance.post("/auth/user/login", {
        email,
        password,
      });
      return response.data;
    },

    register: async (fullname, email, password) => {
      const response = await axiosInstance.post("/auth/user/register", {
        fullname,
        email,
        password,
      });
      return response.data;
    },

    logout: async () => {
      const response = await axiosInstance.get("/auth/user/logout");
      return response.data;
    },

    getProfile: async () => {
      const response = await axiosInstance.get("/auth/user/profile");
      return response.data;
    },

    updateProfile: async (profileData) => {
      const response = await axiosInstance.put(
        "/auth/user/profile",
        profileData
      );
      return response.data;
    },

    getImageKitAuth: async () => {
      const response = await axiosInstance.get("/auth/imagekit-auth");
      return response.data;
    },
  },
};

export default api;
