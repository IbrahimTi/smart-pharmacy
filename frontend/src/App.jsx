import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import Sales from "./pages/Sales";
import Prescriptions from "./pages/Prescriptions";
import Customers from "./pages/Customers";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "center", height: "100vh",
        background: "#f8fafc",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "40px", height: "40px",
            border: "3px solid #e2e8f0",
            borderTop: "3px solid #2563eb",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 12px",
          }} />
          <p style={{ color: "#64748b", fontFamily: "'DM Sans', sans-serif" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/medicines" element={<ProtectedRoute><Medicines /></ProtectedRoute>} />
      <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
      <Route path="/prescriptions" element={<ProtectedRoute><Prescriptions /></ProtectedRoute>} />
      <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;