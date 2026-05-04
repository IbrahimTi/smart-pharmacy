import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { createSaleAPI, getSalesAPI, getMedicinesAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Plus, Trash2, X, ShoppingCart } from "lucide-react";

const Sales = () => {
  const { user } = useAuth();
  const [sales, setSales] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    customerName: "", customerPhone: "",
    discount: 0, paymentMethod: "Cash", notes: "",
  });
  const [items, setItems] = useState([
    { medicineId: "", quantity: 1, price: 0, subtotal: 0 },
  ]);

  useEffect(() => { fetchSales(); fetchMedicines(); }, []);

  const fetchSales = async () => {
    try {
      const res = await getSalesAPI();
      setSales(res.data.sales);
    } catch (error) {
      toast.error("Failed to fetch sales");
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicines = async () => {
    try {
      const res = await getMedicinesAPI();
      setMedicines(res.data.medicines);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMedicineSelect = (index, medicineId) => {
    const medicine = medicines.find(m => m._id === medicineId);
    const newItems = [...items];
    newItems[index] = {
      medicineId, quantity: 1,
      price: medicine?.price || 0,
      subtotal: medicine?.price || 0,
    };
    setItems(newItems);
  };

  const handleQuantityChange = (index, quantity) => {
    const newItems = [...items];
    newItems[index].quantity = quantity;
    newItems[index].subtotal = newItems[index].price * quantity;
    setItems(newItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);
  const finalAmount = totalAmount - (form.discount || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSaleAPI({
        ...form,
        items: items.map(item => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
        })),
      });
      toast.success("Sale created successfully!");
      setShowForm(false);
      fetchSales();
      setForm({ customerName: "", customerPhone: "", discount: 0, paymentMethod: "Cash", notes: "" });
      setItems([{ medicineId: "", quantity: 1, price: 0, subtotal: 0 }]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create sale");
    }
  };

  const inputStyle = {
    width: "100%", background: "#f8fafc",
    border: "2px solid #e2e8f0", borderRadius: "8px",
    padding: "9px 12px", fontSize: "0.85rem",
    color: "#0f172a", outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    boxSizing: "border-box", transition: "all 0.2s",
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>
              Sales & Billing
            </h1>
            <p style={{ color: "#64748b", marginTop: "4px", fontSize: "0.875rem" }}>
              {sales.length} total transactions
            </p>
          </div>
          {user?.role === "pharmacist" && (
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #059669, #047857)",
                color: "white", border: "none", padding: "10px 20px",
                borderRadius: "10px", fontSize: "0.875rem", fontWeight: 600,
                cursor: "pointer", fontFamily: "'Sora', sans-serif",
                boxShadow: "0 4px 12px rgba(5,150,105,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <Plus size={16} /> New Sale
            </button>
          )}
        </div>

        {/* New Sale Form */}
        {showForm && (
          <div style={{
            background: "white", borderRadius: "16px",
            padding: "24px", border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: "24px",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
                Create New Sale
              </h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Customer */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>Customer Name *</label>
                  <input
                    placeholder="Rahman Ali"
                    value={form.customerName}
                    onChange={e => setForm({ ...form, customerName: e.target.value })}
                    required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>Phone Number *</label>
                  <input
                    placeholder="01712345678"
                    value={form.customerPhone}
                    onChange={e => setForm({ ...form, customerPhone: e.target.value })}
                    required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
                </div>
              </div>

              {/* Items */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#374151" }}>Medicine Items</label>
                  <button
                    type="button"
                    onClick={() => setItems([...items, { medicineId: "", quantity: 1, price: 0, subtotal: 0 }])}
                    style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      background: "#eff6ff", color: "#2563eb",
                      border: "1px solid #bfdbfe", padding: "4px 10px",
                      borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    <Plus size={12} /> Add Item
                  </button>
                </div>

                {items.map((item, index) => (
                  <div key={index} style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr auto", gap: "10px", marginBottom: "8px", alignItems: "center" }}>
                    <select
                      value={item.medicineId}
                      onChange={e => handleMedicineSelect(index, e.target.value)}
                      required style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                      onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                    >
                      <option value="">Select Medicine</option>
                      {medicines.map(m => (
                        <option key={m._id} value={m._id}>
                          {m.name} — ৳{m.price} (Stock: {m.stock})
                        </option>
                      ))}
                    </select>
                    <input
                      type="number" min="1"
                      value={item.quantity}
                      onChange={e => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                      onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                    />
                    <div style={{
                      background: "#f0fdf4", border: "1px solid #bbf7d0",
                      borderRadius: "8px", padding: "9px 12px",
                      fontSize: "0.875rem", fontWeight: 700, color: "#16a34a",
                    }}>
                      ৳{item.subtotal}
                    </div>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setItems(items.filter((_, i) => i !== index))}
                        style={{
                          background: "#fef2f2", border: "1px solid #fecaca",
                          color: "#dc2626", padding: "8px", borderRadius: "8px",
                          cursor: "pointer", display: "flex", alignItems: "center",
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Total */}
              <div style={{
                background: "#f8fafc", borderRadius: "12px",
                padding: "16px", border: "1px solid #e2e8f0", marginBottom: "16px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "#64748b", fontSize: "0.875rem" }}>Total Amount</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>৳{totalAmount}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ color: "#64748b", fontSize: "0.875rem" }}>Discount (৳)</span>
                  <input
                    type="number" min="0"
                    value={form.discount}
                    onChange={e => setForm({ ...form, discount: parseInt(e.target.value) || 0 })}
                    style={{ ...inputStyle, width: "100px", textAlign: "right" }}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", borderTop: "2px solid #e2e8f0" }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: "#0f172a" }}>Final Amount</span>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "#059669" }}>৳{finalAmount}</span>
                </div>
              </div>

              {/* Payment */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>Payment Method</label>
                  <select
                    value={form.paymentMethod}
                    onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Mobile Banking">Mobile Banking</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>Notes</label>
                  <input
                    placeholder="Optional notes..."
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{
                  background: "linear-gradient(135deg, #059669, #047857)",
                  color: "white", border: "none", padding: "11px 28px",
                  borderRadius: "8px", fontSize: "0.875rem", fontWeight: 700,
                  cursor: "pointer", fontFamily: "'Sora', sans-serif",
                  boxShadow: "0 4px 12px rgba(5,150,105,0.25)",
                }}>
                  Complete Sale
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{
                  background: "#f1f5f9", color: "#64748b",
                  border: "1px solid #e2e8f0", padding: "11px 24px",
                  borderRadius: "8px", fontSize: "0.875rem", fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Sora', sans-serif",
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Sales Table */}
        <div style={{
          background: "white", borderRadius: "16px",
          border: "1px solid #e2e8f0", overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                {["Invoice", "Customer", "Items", "Amount", "Payment", "Pharmacist", "Date"].map(h => (
                  <th key={h} style={{
                    textAlign: "left", padding: "13px 16px",
                    fontSize: "0.72rem", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>Loading...</td></tr>
              ) : sales.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                  <ShoppingCart size={32} color="#e2e8f0" style={{ margin: "0 auto 10px", display: "block" }} />
                  No sales yet
                </td></tr>
              ) : sales.map(sale => (
                <tr
                  key={sale._id}
                  style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
                  onMouseLeave={e => e.currentTarget.style.background = "white"}
                >
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      fontFamily: "monospace", fontSize: "0.8rem", fontWeight: 700,
                      color: "#2563eb", background: "#eff6ff",
                      padding: "3px 8px", borderRadius: "6px",
                    }}>
                      {sale.invoiceNumber}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#0f172a" }}>{sale.customer?.name}</p>
                    <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "2px" }}>{sale.customer?.phone}</p>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{ background: "#f1f5f9", color: "#64748b", fontSize: "0.72rem", fontWeight: 600, padding: "3px 8px", borderRadius: "6px" }}>
                      {sale.items?.length} item(s)
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, color: "#059669", fontSize: "0.95rem" }}>
                      ৳{sale.finalAmount}
                    </span>
                    {sale.discount > 0 && (
                      <p style={{ fontSize: "0.65rem", color: "#94a3b8" }}>-৳{sale.discount} off</p>
                    )}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      fontSize: "0.72rem", fontWeight: 600, padding: "3px 10px", borderRadius: "20px",
                      background: paymentColors[sale.paymentMethod]?.bg || "#f1f5f9",
                      color: paymentColors[sale.paymentMethod]?.color || "#64748b",
                    }}>
                      {sale.paymentMethod}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "0.85rem", color: "#374151" }}>
                    {sale.pharmacist?.name}
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: "0.8rem", color: "#64748b" }}>
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales;