import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getStatsAPI, getLowStockAPI, getExpiringAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import {
  ShoppingCart, TrendingUp, Users,
  AlertTriangle, Package, Clock, Activity,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [lowStock, setLowStock] = useState([]);
  const [expiring, setExpiring] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, lowStockRes, expiringRes] = await Promise.all([
          getStatsAPI(), getLowStockAPI(), getExpiringAPI(),
        ]);
        setStats(statsRes.data.stats);
        setLowStock(lowStockRes.data.medicines);
        setExpiring(expiringRes.data.medicines);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    {
      title: "Today's Sales",
      value: stats?.today?.sales || 0,
      sub: `৳${stats?.today?.revenue || 0} revenue`,
      icon: ShoppingCart,
      gradient: "linear-gradient(135deg, #2563eb, #1d4ed8)",
      shadow: "rgba(37,99,235,0.25)",
    },
    {
      title: "Monthly Sales",
      value: stats?.thisMonth?.sales || 0,
      sub: `৳${stats?.thisMonth?.revenue || 0} revenue`,
      icon: TrendingUp,
      gradient: "linear-gradient(135deg, #059669, #047857)",
      shadow: "rgba(5,150,105,0.25)",
    },
    {
      title: "Total Customers",
      value: stats?.totalCustomers || 0,
      sub: "Registered customers",
      icon: Users,
      gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)",
      shadow: "rgba(124,58,237,0.25)",
    },
    {
      title: "Low Stock Alerts",
      value: lowStock.length,
      sub: "Need restocking",
      icon: AlertTriangle,
      gradient: "linear-gradient(135deg, #dc2626, #b91c1c)",
      shadow: "rgba(220,38,38,0.25)",
    },
  ];

  if (loading) {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{
          marginLeft: "260px", flex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          height: "100vh", background: "#f8fafc",
        }}>
          <div style={{ textAlign: "center" }}>
            <Activity size={32} color="#2563eb" style={{ margin: "0 auto 12px", display: "block" }} />
            <p style={{ color: "#64748b", fontFamily: "'DM Sans', sans-serif" }}>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", background: "#f8fafc", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: "260px", flex: 1, padding: "32px" }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: "32px",
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "1.6rem", fontWeight: 800, color: "#0f172a",
            }}>
              Dashboard
            </h1>
            <p style={{ color: "#64748b", marginTop: "4px", fontSize: "0.9rem" }}>
              Welcome back, <strong>{user?.name}</strong>! Here's your pharmacy overview.
            </p>
          </div>
          <div style={{
            background: "white", border: "1px solid #e2e8f0",
            borderRadius: "10px", padding: "8px 16px",
            fontSize: "0.8rem", color: "#64748b",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long", year: "numeric",
              month: "long", day: "numeric",
            })}
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px", marginBottom: "28px",
        }}>
          {statCards.map((card, i) => (
            <div
              key={i}
              style={{
                background: "white", borderRadius: "16px",
                padding: "22px", border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease", cursor: "default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 12px 30px ${card.shadow}`;
                e.currentTarget.style.borderColor = "transparent";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              <div style={{ marginBottom: "16px" }}>
                <div style={{
                  width: "46px", height: "46px",
                  background: card.gradient, borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 6px 15px ${card.shadow}`,
                }}>
                  <card.icon size={22} color="white" />
                </div>
              </div>
              <p style={{
                fontFamily: "'Sora', sans-serif", fontSize: "2rem",
                fontWeight: 800, color: "#0f172a", lineHeight: 1,
              }}>
                {card.value}
              </p>
              <p style={{ color: "#374151", fontWeight: 600, fontSize: "0.85rem", marginTop: "6px" }}>
                {card.title}
              </p>
              <p style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "3px" }}>
                {card.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Alerts Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

          {/* Low Stock */}
          <div style={{
            background: "white", borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden",
          }}>
            <div style={{
              padding: "18px 20px", borderBottom: "1px solid #f1f5f9",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "34px", height: "34px", background: "#fef2f2",
                  borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Package size={18} color="#dc2626" />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "0.9rem", fontWeight: 700, color: "#0f172a",
                  }}>
                    Low Stock Alert
                  </h3>
                  <p style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                    Medicines needing restock
                  </p>
                </div>
              </div>
              <span style={{
                background: "#fef2f2", color: "#dc2626",
                fontSize: "0.75rem", fontWeight: 700,
                padding: "3px 10px", borderRadius: "20px",
                border: "1px solid #fecaca",
              }}>
                {lowStock.length} items
              </span>
            </div>
            <div style={{ padding: "12px 16px", maxHeight: "280px", overflowY: "auto" }}>
              {lowStock.length === 0 ? (
                <div style={{ textAlign: "center", padding: "30px", color: "#94a3b8", fontSize: "0.875rem" }}>
                  ✅ All medicines well stocked!
                </div>
              ) : lowStock.map(medicine => (
                <div
                  key={medicine._id}
                  style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px", borderRadius: "10px",
                    background: "#f8fafc", border: "1px solid #f1f5f9",
                    marginBottom: "8px", transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#f8fafc";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#0f172a" }}>
                      {medicine.name}
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "2px" }}>
                      {medicine.category}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 800, color: "#dc2626", fontSize: "1.1rem",
                    }}>
                      {medicine.stock}
                    </p>
                    <p style={{ fontSize: "0.65rem", color: "#94a3b8" }}>remaining</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expiry Alert */}
          <div style={{
            background: "white", borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden",
          }}>
            <div style={{
              padding: "18px 20px", borderBottom: "1px solid #f1f5f9",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "34px", height: "34px", background: "#fffbeb",
                  borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Clock size={18} color="#d97706" />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "0.9rem", fontWeight: 700, color: "#0f172a",
                  }}>
                    Expiry Alert
                  </h3>
                  <p style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                    Expired or expiring soon
                  </p>
                </div>
              </div>
              <span style={{
                background: "#fffbeb", color: "#d97706",
                fontSize: "0.75rem", fontWeight: 700,
                padding: "3px 10px", borderRadius: "20px",
                border: "1px solid #fde68a",
              }}>
                {expiring.length} items
              </span>
            </div>
            <div style={{ padding: "12px 16px", maxHeight: "280px", overflowY: "auto" }}>
              {expiring.length === 0 ? (
                <div style={{ textAlign: "center", padding: "30px", color: "#94a3b8", fontSize: "0.875rem" }}>
                  ✅ No medicines expiring soon!
                </div>
              ) : expiring.map(medicine => (
                <div
                  key={medicine._id}
                  style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px", borderRadius: "10px",
                    background: "#f8fafc", border: "1px solid #f1f5f9",
                    marginBottom: "8px", transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#f8fafc";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#0f172a" }}>
                      {medicine.name}
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "2px" }}>
                      {medicine.category}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontWeight: 700, color: "#d97706", fontSize: "0.8rem" }}>
                      {new Date(medicine.expiryDate).toLocaleDateString()}
                    </p>
                    <p style={{ fontSize: "0.65rem", color: "#94a3b8" }}>expiry date</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;