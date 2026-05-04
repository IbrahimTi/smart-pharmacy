import axios from "axios";

// This is the base URL of our backend
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// This runs before every request
// It automatically adds the token to every request
// So we don't have to manually add token every time
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginAPI = (data) => API.post("/auth/login", data);
export const registerAPI = (data) => API.post("/auth/register", data);
export const getMeAPI = () => API.get("/auth/me");

// Medicines
export const getMedicinesAPI = (params) => API.get("/medicines", { params });
export const addMedicineAPI = (data) => API.post("/medicines", data);
export const updateMedicineAPI = (id, data) => API.put(`/medicines/${id}`, data);
export const deleteMedicineAPI = (id) => API.delete(`/medicines/${id}`);
export const getLowStockAPI = () => API.get("/medicines/low-stock");
export const getExpiringAPI = () => API.get("/medicines/expiring");

// Sales
export const createSaleAPI = (data) => API.post("/sales", data);
export const getSalesAPI = () => API.get("/sales");
export const getSaleAPI = (id) => API.get(`/sales/${id}`);
export const getStatsAPI = () => API.get("/sales/stats");
export const getCustomerHistoryAPI = (phone) => API.get(`/sales/customer/${phone}`);

// Prescriptions
export const uploadPrescriptionAPI = (data) => API.post("/prescriptions/upload", data);
export const getPrescriptionsAPI = () => API.get("/prescriptions");
export const updatePrescriptionStatusAPI = (id, data) => API.put(`/prescriptions/${id}/status`, data);