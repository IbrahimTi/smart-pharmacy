import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, Pill, ShoppingCart,
  FileText, Users, LogOut, Activity,
} from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/medicines", icon: Pill, label: "Medicines" },
    { to: "/sales", icon: ShoppingCart, label: "Sales" },
    { to: "/customers", icon: Users, label: "Customers" },
  ];

  return (
    <div style={{
      position: "fixed", left: 0, top: 0,
      width: "240px", height: "100vh",
      background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      display: "flex", flexDirection: "column",
      zIndex: 50, boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
    }}>

      {/* Logo */}
      <div style={{
        padding: "20px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(37,99,235,0.08)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "38px", height: "38px",
            background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
            borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(37,99,235,0.4)",
            flexShrink: 0,
          }}>
            <Activity size={20} color="white" />
          </div>
          <div>
            <p style={{
              fontFamily: "'Sora', sans-serif",
              color: "white", fontWeight: 700, fontSize: "0.85rem",
              lineHeight: 1.2,
            }}>
              Smart Pharmacy
            </p>
            <p style={{ color: "#475569", fontSize: "0.65rem", marginTop: "2px" }}>
              Management System
            </p>
          </div>
        </div>
      </div>

      {/* User Card */}
      <div style={{ padding: "12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "10px", padding: "12px",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <div style={{
            width: "34px", height: "34px",
            background: user?.role === "admin"
              ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
              : "linear-gradient(135deg, #059669, #047857)",
            borderRadius: "8px", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Sora', sans-serif",
            color: "white", fontWeight: 700, fontSize: "0.9rem",
            boxShadow: user?.role === "admin"
              ? "0 4px 10px rgba(37,99,235,0.3)"
              : "0 4px 10px rgba(5,150,105,0.3)",
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <p style={{
              color: "white", fontWeight: 600, fontSize: "0.8rem",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {user?.name}
            </p>
            <span style={{
              display: "inline-block",
              background: user?.role === "admin"
                ? "rgba(37,99,235,0.2)"
                : "rgba(5,150,105,0.2)",
              color: user?.role === "admin" ? "#60a5fa" : "#34d399",
              fontSize: "0.6rem", fontWeight: 700,
              padding: "2px 7px", borderRadius: "10px",
              textTransform: "uppercase", letterSpacing: "0.05em",
              marginTop: "3px", display: "block", width: "fit-content",
              border: `1px solid ${user?.role === "admin" ? "rgba(37,99,235,0.3)" : "rgba(5,150,105,0.3)"}`,
            }}>
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        <p style={{
          color: "#334155", fontSize: "0.6rem", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.1em",
          padding: "0 8px", marginBottom: "6px",
        }}>
          Navigation
        </p>

        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 12px", borderRadius: "10px",
              color: isActive ? "white" : "#64748b",
              textDecoration: "none", fontSize: "0.85rem",
              fontWeight: isActive ? 600 : 500,
              marginBottom: "3px",
              background: isActive
                ? "linear-gradient(135deg, rgba(37,99,235,0.3), rgba(37,99,235,0.15))"
                : "transparent",
              border: isActive
                ? "1px solid rgba(37,99,235,0.3)"
                : "1px solid transparent",
              transition: "all 0.2s ease",
              boxShadow: isActive ? "0 2px 8px rgba(37,99,235,0.15)" : "none",
            })}
            onMouseEnter={e => {
              const isActive = e.currentTarget.style.background.includes("0.3");
              if (!isActive) {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "#e2e8f0";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateX(3px)";
              }
            }}
            onMouseLeave={e => {
              const isActive = e.currentTarget.style.background.includes("0.3");
              if (!isActive) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#64748b";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }
            }}
          >
            <div style={{
              width: "30px", height: "30px",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "7px",
              background: "rgba(255,255,255,0.05)",
              flexShrink: 0,
            }}>
              <link.icon size={16} />
            </div>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{
        padding: "12px 10px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.1)",
      }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 12px", borderRadius: "10px",
            color: "#64748b", background: "transparent",
            border: "1px solid transparent", fontSize: "0.85rem",
            fontWeight: 500, cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(239,68,68,0.12)";
            e.currentTarget.style.color = "#f87171";
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)";
            e.currentTarget.style.transform = "translateX(3px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#64748b";
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <div style={{
            width: "30px", height: "30px",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: "7px", background: "rgba(255,255,255,0.05)", flexShrink: 0,
          }}>
            <LogOut size={16} />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;