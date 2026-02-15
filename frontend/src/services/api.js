import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use(
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

// Auth APIs
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  verifyToken: () => api.get("/auth/verify"),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) => api.put("/users/profile", data),
  getAllUsers: () => api.get("/users"),
  getUsersByType: (userType) => api.get(`/users/type/${userType}`),
};

// Complaint APIs
export const complaintAPI = {
  createComplaint: (data) => api.post("/complaints", data),
  getUserComplaints: () => api.get("/complaints/my-complaints"),
  getComplaintById: (id) => api.get(`/complaints/${id}`),
  updateComplaint: (id, data) => api.put(`/complaints/${id}`, data),
  getAllComplaints: (params) => api.get("/complaints", { params }),
  assignComplaint: (data) => api.post("/complaints/assign", data),
};

// Agent APIs
export const agentAPI = {
  getAssignedComplaints: () => api.get("/agents/assigned"),
  updateComplaintStatus: (data) => api.put("/agents/status", data),
  getWorkload: () => api.get("/agents/workload"),
};

// Message APIs
export const messageAPI = {
  sendMessage: (data) => api.post("/messages/send", data),
  getMessages: (complaintId) => api.get(`/messages/${complaintId}`),
  markAsRead: (complaintId) => api.put(`/messages/${complaintId}/read`),
};

// Admin APIs
export const adminAPI = {
  getDashboardStats: () => api.get("/admin/dashboard/stats"),
  getAllComplaints: (params) => api.get("/admin/complaints", { params }),
  reassignComplaint: (data) => api.put("/admin/complaints/reassign", data),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  getAgentStats: () => api.get("/admin/agents/stats"),
};

export default api;
