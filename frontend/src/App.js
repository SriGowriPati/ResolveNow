import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";

// Components
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreateComplaint from "./pages/CreateComplaint";
import CustomerDashboard from "./pages/CustomerDashboard";
import ComplaintDetails from "./pages/ComplaintDetails";
import AgentDashboard from "./pages/AgentDashboard";
import AgentComplaintManager from "./pages/AgentComplaintManager";
import AdminDashboard from "./pages/AdminDashboard";

// Styles
import "./styles/home.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/complaint.css";
import "./styles/profile.css";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AppContent = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
        />

        {/* Protected Routes - Customer */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute requiredRole="customer">
              <CustomerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/complaints"
          element={
            <PrivateRoute requiredRole="customer">
              <CustomerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-complaint"
          element={
            <PrivateRoute requiredRole="customer">
              <CreateComplaint />
            </PrivateRoute>
          }
        />
        <Route
          path="/complaint/:id"
          element={
            <PrivateRoute requiredRole="customer">
              <ComplaintDetails />
            </PrivateRoute>
          }
        />

        {/* Protected Routes - Agent */}
        <Route
          path="/agent-dashboard"
          element={
            <PrivateRoute requiredRole="agent">
              <AgentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/agent-complaints"
          element={
            <PrivateRoute requiredRole="agent">
              <AgentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/agent/complaint/:id"
          element={
            <PrivateRoute requiredRole="agent">
              <AgentComplaintManager />
            </PrivateRoute>
          }
        />

        {/* Protected Routes - Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-complaints"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Profile Route (All Authenticated Users) */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* 404 - Not Found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
