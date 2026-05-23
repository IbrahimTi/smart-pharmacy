import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginAPI } from "../utils/api";
import toast from "react-hot-toast";
import { Eye, EyeOff, Pill, Shield, Users } from "lucide-react";

const Login = () => {
  const [adminForm, setAdminForm] = useState({ email: "", password: "" });
  const [staffForm, setStaffForm] = useState({ email: "", password: "" });
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [showStaffPass, setShowStaffPass] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [staffLoading, setStaffLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData, setLoading, expectedRole) => {
    setLoading(true);
    try {
      const res = await loginAPI(formData);
      if (res.data.user.role !== expectedRole) {
        toast.error(`This login is for ${expectedRole}s only!`);
        setLoading(false);
        return;
      }
      login(res.data.token, res.data.user);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", background: "#f8fafc",
    border: "2px solid #e2e8f0", borderRadius: "10px",
    padding: "11px 14px", fontSize: "0.875rem",
    color: "#0f172a", outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s ease", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column" }}>

      {/* Navbar */}
      <nav style={{
        background: "white", borderBottom: "1px solid #e2e8f0",
        padding: "0 40px", height: "65px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div style={{
            width: "36px", height: "36px",
            background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
            borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Pill size={18} color="white" />
          </div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>
            Smart Pharmacy 
          </span>
        </div>
        <button
          onClick={() => navigate("/register")}
          style={{
            background: "transparent", border: "2px solid #e2e8f0",
            color: "#0f172a", padding: "7px 18px", borderRadius: "8px",
            fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
            fontFamily: "'Sora', sans-serif", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = "#2563eb"; e.target.style.color = "#2563eb"; }}
          onMouseLeave={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.color = "#0f172a"; }}
        >
          Register
        </button>
      </nav>

      {/* Content */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "40px 20px",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>
            Welcome Back
          </h1>
          <p style={{ color: "#64748b", marginTop: "8px", fontSize: "0.95rem" }}>
            Select your role and sign in to your account
          </p>
        </div>

        {/* Two Login Panels */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "24px", width: "100%", maxWidth: "860px",
        }}>

          {/* ADMIN PANEL */}
          <div style={{
            background: "white", borderRadius: "20px",
            padding: "36px", border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "14px",
              marginBottom: "28px", paddingBottom: "20px",
              borderBottom: "1px solid #f1f5f9",
            }}>
              <div style={{
                width: "48px", height: "48px",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 6px 15px rgba(37,99,235,0.25)",
              }}>
                <Shield size={22} color="white" />
              </div>
              <div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>
                  Admin Login
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "2px" }}>
                  Manager & Administrator
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder=""
                  value={adminForm.email}
                  onChange={e => setAdminForm({ ...adminForm, email: e.target.value })}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; e.target.style.boxShadow = "0 0 0 4px rgba(37,99,235,0.08)"; }}
                  onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showAdminPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={adminForm.password}
                    onChange={e => setAdminForm({ ...adminForm, password: e.target.value })}
                    style={{ ...inputStyle, paddingRight: "44px" }}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; e.target.style.boxShadow = "0 0 0 4px rgba(37,99,235,0.08)"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; e.target.style.boxShadow = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPass(!showAdminPass)}
                    style={{
                      position: "absolute", right: "12px", top: "50%",
                      transform: "translateY(-50%)", background: "none",
                      border: "none", cursor: "pointer", color: "#94a3b8",
                      display: "flex", alignItems: "center",
                    }}
                  >
                    {showAdminPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleLogin(adminForm, setAdminLoading, "admin")}
                disabled={adminLoading}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "white", border: "none", padding: "12px",
                  borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700,
                  cursor: adminLoading ? "not-allowed" : "pointer",
                  fontFamily: "'Sora', sans-serif",
                  boxShadow: "0 4px 15px rgba(37,99,235,0.3)",
                  opacity: adminLoading ? 0.7 : 1,
                  transition: "all 0.3s ease", marginTop: "4px",
                }}
                onMouseEnter={e => { if (!adminLoading) e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                {adminLoading ? "Signing in..." : "Sign In as Admin"}
              </button>
            </div>

     
          </div>

          {/* STAFF PANEL */}
          <div style={{
            background: "white", borderRadius: "20px",
            padding: "36px", border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "14px",
              marginBottom: "28px", paddingBottom: "20px",
              borderBottom: "1px solid #f1f5f9",
            }}>
              <div style={{
                width: "48px", height: "48px",
                background: "linear-gradient(135deg, #059669, #047857)",
                borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 6px 15px rgba(5,150,105,0.25)",
              }}>
                <Users size={22} color="white" />
              </div>
              <div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>
                  Staff Login
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "2px" }}>
                   Salesman
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder=""
                  value={staffForm.email}
                  onChange={e => setStaffForm({ ...staffForm, email: e.target.value })}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = "#059669"; e.target.style.background = "white"; e.target.style.boxShadow = "0 0 0 4px rgba(5,150,105,0.08)"; }}
                  onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showStaffPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={staffForm.password}
                    onChange={e => setStaffForm({ ...staffForm, password: e.target.value })}
                    style={{ ...inputStyle, paddingRight: "44px" }}
                    onFocus={e => { e.target.style.borderColor = "#059669"; e.target.style.background = "white"; e.target.style.boxShadow = "0 0 0 4px rgba(5,150,105,0.08)"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; e.target.style.boxShadow = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowStaffPass(!showStaffPass)}
                    style={{
                      position: "absolute", right: "12px", top: "50%",
                      transform: "translateY(-50%)", background: "none",
                      border: "none", cursor: "pointer", color: "#94a3b8",
                      display: "flex", alignItems: "center",
                    }}
                  >
                    {showStaffPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleLogin(staffForm, setStaffLoading, "pharmacist")}
                disabled={staffLoading}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #059669, #047857)",
                  color: "white", border: "none", padding: "12px",
                  borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700,
                  cursor: staffLoading ? "not-allowed" : "pointer",
                  fontFamily: "'Sora', sans-serif",
                  boxShadow: "0 4px 15px rgba(5,150,105,0.3)",
                  opacity: staffLoading ? 0.7 : 1,
                  transition: "all 0.3s ease", marginTop: "4px",
                }}
                onMouseEnter={e => { if (!staffLoading) e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                {staffLoading ? "Signing in..." : "Sign In as Staff"}
              </button>
            </div>

            
          </div>
        </div>

        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "24px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#2563eb", fontWeight: 600, cursor: "pointer" }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;