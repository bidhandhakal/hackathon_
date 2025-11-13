// API configuration and utilities

const API_BASE_URL = "http://localhost:8000/api";

export const api = {
  auth: {
    login: async (email, password) => {
      const response = await fetch(`${API_BASE_URL}/auth/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      return response;
    },

    register: async (fullname, email, password) => {
      const response = await fetch(`${API_BASE_URL}/auth/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ fullname, email, password }),
      });
      return response;
    },

    logout: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/user/logout`, {
        method: "GET",
        credentials: "include",
      });
      return response;
    },

    getProfile: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/auth/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      return response;
    },
  },
};

export default api;
