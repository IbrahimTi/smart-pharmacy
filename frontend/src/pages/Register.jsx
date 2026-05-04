import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../utils/api";
import toast from "react-hot-toast";
import { Eye, EyeOff, Pill, Shield, Users, Check } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "", role: "pharmacist",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await registerAPI({ name: form.name, email: form.email, password: form.password, role: form.role });
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
          onClick={() => navigate("/login")}
          style={{
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            border: "none", color: "white", padding: "7px 18px",
            borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600,
            cursor: "pointer", fontFamily: "'Sora', sans-serif",
          }}
        >
          Login
        </button>
      </nav>

      {/* Content */}
      <div style={{
        flex: 1, display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: "40px 20px",
      }}>
        <div style={{
          width: "100%", maxWidth: "900px",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "40px", alignItems: "center",
        }}>

          {/* Left Info */}
          <div>
            <h1 style={{
              fontFamily: "'Sora', sans-serif", fontSize: "2rem",
              fontWeight: 800, color: "#0f172a", marginBottom: "16px",
            }}>
              Join Smart Pharmacy
              <span style={{
                display: "block",
                background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Management System
              </span>
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "32px" }}>
              Create your account and start managing your pharmacy efficiently today.
            </p>

            {[
              "Full inventory management",
              "Real-time stock tracking",
              "Sales and billing system",
              "Customer history tracking",
              "Automated alerts and reports",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{
                  width: "22px", height: "22px",
                  background: "#eff6ff", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Check size={12} color="#2563eb" />
                </div>
                <span style={{ color: "#374151", fontSize: "0.875rem", fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Register Form */}
          <div style={{
            background: "white", borderRadius: "20px",
            padding: "36px", border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontSize: "1.3rem",
              fontWeight: 700, color: "#0f172a", marginBottom: "24px",
            }}>
              Create Account
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Name */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                  Full Name
                </label>
                <input
                  type="text" placeholder="John Doe"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; e.target.style.boxShadow = "0 0 0 4px rgba(37,99,235,0.08)"; }}
                  onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                  Email Address
                </label>
                <input
                  type="email" placeholder="john@pharmacy.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; e.target.style.boxShadow = "0 0 0 4px rgba(37,99,235,0.08)"; }}
                  onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              {/* Role */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "8px" }}>
                  Select Role
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {[
                    { value: "admin", label: "Admin", desc: "Full control", icon: Shield, color: "#2563eb", bg: "#eff6ff" },
                    { value: "pharmacist", label: "Pharmacist", desc: "Sales and stock", icon: Users, color: "#059669", bg: "#f0fdf4" },
                  ].map((role) => (
                    <div
                      key={role.value}
                      onClick={() => setForm({ ...form, role: role.value })}
                      style={{
                        padding: "12px", borderRadius: "10px", cursor: "pointer",
                        border: `2px solid ${form.role === role.value ? role.color : "#e2e8f0"}`,
                        background: form.role === role.value ? role.bg : "white",
                        transition: "all 0.2s ease",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", gap: "6px",
                      }}
                    >
                      <role.icon size={20} color={form.role === role.value ? role.color : "#94a3b8"} />
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: form.role === role.value ? role.color : "#374151" }}>
                        {role.label}
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{role.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Min 6 characters"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    style={{ ...inputStyle, paddingRight: "44px" }}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; e.target.style.boxShadow = "0 0 0 4px rgba(37,99,235,0.08)"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; e.target.style.boxShadow = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: "absolute", right: "12px", top: "50%",
                      transform: "translateY(-50%)", background: "none",
                      border: "none", cursor: "pointer", color: "#94a3b8",
                      display: "flex", alignItems: "center",
                    }}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
                  Confirm Password
                </label>
                <input
                  type="password" placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; e.target.style.boxShadow = "0 0 0 4px rgba(37,99,235,0.08)"; }}
                  onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "white", border: "none", padding: "12px",
                  borderRadius: "10px", fontSize: "0.9rem",
                  fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Sora', sans-serif",
                  boxShadow: "0 4px 15px rgba(37,99,235,0.3)",
                  opacity: loading ? 0.7 : 1, transition: "all 0.3s ease",
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.85rem", marginTop: "20px" }}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{ color: "#2563eb", fontWeight: 600, cursor: "pointer" }}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;