import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { getCustomerHistoryAPI } from "../utils/api";
import toast from "react-hot-toast";
import { Search, User, ShoppingBag, Phone, TrendingUp } from "lucide-react";

const Customers = () => {
  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await getCustomerHistoryAPI(phone);
      setCustomer(res.data.customer);
      setSales(res.data.sales);
    } catch (error) {
      toast.error("Customer not found");
      setCustomer(null);
      setSales([]);
    } finally {
      setLoading(false);
    }
  };

  const paymentColors = {
    Cash: { bg: "#f0fdf4", color: "#16a34a" },
    Card: { bg: "#eff6ff", color: "#2563eb" },
    "Mobile Banking": { bg: "#f5f3ff", color: "#7c3aed" },
  };

  return (
    <div style={{ display: "flex", background: "#f8fafc", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: "260px", flex: 1, padding: "32px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "1.6rem", fontWeight: 800, color: "#0f172a",
          }}>
            Customer History
          </h1>
          <p style={{ color: "#64748b", marginTop: "4px", fontSize: "0.875rem" }}>
            Search customer purchase history by phone number
          </p>
        </div>

        {/* Search Box */}
        <div style={{
          background: "white", borderRadius: "16px",
          padding: "24px", border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          marginBottom: "24px",
        }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <Phone size={16} color="#94a3b8" style={{
                position: "absolute", left: "14px",
                top: "50%", transform: "translateY(-50%)",
              }} />
              <input
                placeholder="Enter customer phone number (e.g. 01712345678)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{
                  width: "100%", background: "#f8fafc",
                  border: "2px solid #e2e8f0", borderRadius: "10px",
                  padding: "11px 14px 11px 40px",
                  fontSize: "0.875rem", color: "#0f172a",
                  outline: "none", fontFamily: "'DM Sans', sans-serif",
                  boxSizing: "border-box", transition: "all 0.2s",
                }}
                onFocus={e => {
                  e.target.style.borderColor = "#2563eb";
                  e.target.style.background = "white";
                  e.target.style.boxShadow = "0 0 0 4px rgba(37,99,235,0.08)";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.background = "#f8fafc";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "white", border: "none", padding: "11px 24px",
                borderRadius: "10px", fontSize: "0.875rem", fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Sora', sans-serif",
                boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
                opacity: loading ? 0.7 : 1, transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <Search size={16} />
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        {/* No Results */}
        {searched && !customer && !loading && (
          <div style={{
            background: "white", borderRadius: "16px",
            padding: "48px", border: "1px solid #e2e8f0",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}>
            <User size={48} color="#e2e8f0" style={{ margin: "0 auto 16px", display: "block" }} />
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "1rem" }}>
              Customer Not Found
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginTop: "6px" }}>
              No customer found with phone number "{phone}"
            </p>
          </div>
        )}

        {/* Customer Found */}
        {customer && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Customer Profile Card */}
            <div style={{
              background: "white", borderRadius: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}>
              {/* Blue Header */}
              <div style={{
                background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                padding: "24px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{
                    width: "60px", height: "60px",
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: "16px", border: "2px solid rgba(255,255,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "1.5rem", fontWeight: 800, color: "white",
                  }}>
                    {customer.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "1.3rem", fontWeight: 800, color: "white",
                    }}>
                      {customer.name}
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", marginTop: "3px" }}>
                      📞 {customer.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                borderTop: "1px solid #e2e8f0",
              }}>
                {[
                  { label: "Total Purchases", value: customer.totalPurchases, icon: ShoppingBag, color: "#2563eb", bg: "#eff6ff" },
                  { label: "Total Spent", value: `৳${customer.totalSpent}`, icon: TrendingUp, color: "#059669", bg: "#f0fdf4" },
                  { label: "Member Since", value: new Date(customer.createdAt).toLocaleDateString(), icon: User, color: "#7c3aed", bg: "#f5f3ff" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "20px 24px",
                      borderRight: i < 2 ? "1px solid #e2e8f0" : "none",
                      display: "flex", alignItems: "center", gap: "14px",
                    }}
                  >
                    <div style={{
                      width: "40px", height: "40px",
                      background: stat.bg, borderRadius: "10px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <stat.icon size={18} color={stat.color} />
                    </div>
                    <div>
                      <p style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: "1.2rem", fontWeight: 800, color: "#0f172a",
                      }}>
                        {stat.value}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase History */}
            <div style={{
              background: "white", borderRadius: "16px",
              border: "1px solid #e2e8f0", overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}>
              <div style={{
                padding: "18px 20px", borderBottom: "1px solid #f1f5f9",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <div style={{
                  width: "34px", height: "34px", background: "#eff6ff",
                  borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <ShoppingBag size={17} color="#2563eb" />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "0.9rem", fontWeight: 700, color: "#0f172a",
                  }}>
                    Purchase History
                  </h3>
                  <p style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                    {sales.length} transactions
                  </p>
                </div>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    {["Invoice", "Medicines", "Amount", "Payment", "Date"].map(h => (
                      <th key={h} style={{
                        textAlign: "left", padding: "11px 16px",
                        fontSize: "0.72rem", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sales.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "#94a3b8", fontSize: "0.875rem" }}>
                      No purchases yet
                    </td></tr>
                  ) : sales.map(sale => (
                    <tr
                      key={sale._id}
                      style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
                      onMouseLeave={e => e.currentTarget.style.background = "white"}
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          fontFamily: "monospace", fontSize: "0.8rem",
                          fontWeight: 700, color: "#2563eb",
                          background: "#eff6ff", padding: "3px 8px", borderRadius: "6px",
                        }}>
                          {sale.invoiceNumber}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {sale.items?.map((item, i) => (
                          <span
                            key={i}
                            style={{
                              display: "inline-block",
                              background: "#f1f5f9", color: "#475569",
                              fontSize: "0.72rem", fontWeight: 500,
                              padding: "2px 8px", borderRadius: "4px",
                              marginRight: "4px", marginBottom: "2px",
                            }}
                          >
                            {item.medicineName} ×{item.quantity}
                          </span>
                        ))}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          fontFamily: "'Sora', sans-serif",
                          fontWeight: 800, color: "#059669", fontSize: "0.95rem",
                        }}>
                          ৳{sale.finalAmount}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          fontSize: "0.72rem", fontWeight: 600,
                          padding: "3px 10px", borderRadius: "20px",
                          background: paymentColors[sale.paymentMethod]?.bg || "#f1f5f9",
                          color: paymentColors[sale.paymentMethod]?.color || "#64748b",
                        }}>
                          {sale.paymentMethod}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "0.8rem", color: "#64748b" }}>
                        {new Date(sale.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;