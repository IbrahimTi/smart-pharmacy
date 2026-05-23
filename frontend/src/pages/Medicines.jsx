import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getMedicinesAPI, addMedicineAPI, updateMedicineAPI, deleteMedicineAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Plus, Search, Trash2, X, Pill, Pencil, MapPin } from "lucide-react";

const categories = [
  "Antibiotic", "Painkiller", "Antacid", "Vitamin",
  "Antidiabetic", "Antihypertensive", "Antihistamine", "Antiseptic", "Other"
];

const emptyForm = {
  name: "",
  genericName: "",
  category: "Painkiller",
  manufacturer: "",
  price: "",
  stock: "",
  lowStockThreshold: 10,
  expiryDate: "",
  requiresPrescription: false,
  description: "",
  location: {
    row: "",
    column: "",
  },
};

const Medicines = () => {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchMedicines = async () => {
    try {
      const res = await getMedicinesAPI({ search, category });
      setMedicines(res.data.medicines);
    } catch (error) {
      toast.error("Failed to fetch medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMedicines(); }, [search, category]);

  const handleEdit = (medicine) => {
    setEditingId(medicine._id);
    setForm({
      name: medicine.name,
      genericName: medicine.genericName || "",
      category: medicine.category,
      manufacturer: medicine.manufacturer,
      price: medicine.price,
      stock: medicine.stock,
      lowStockThreshold: medicine.lowStockThreshold,
      expiryDate: medicine.expiryDate?.split("T")[0] || "",
      requiresPrescription: medicine.requiresPrescription,
      description: medicine.description || "",
      location: {
        row: medicine.location?.row || "",
        column: medicine.location?.column || "",
      },
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMedicineAPI(editingId, form);
        toast.success("Medicine updated!");
      } else {
        await addMedicineAPI(form);
        toast.success("Medicine added!");
      }
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchMedicines();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save medicine");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;
    try {
      await deleteMedicineAPI(id);
      toast.success("Medicine deleted!");
      fetchMedicines();
    } catch (error) {
      toast.error("Failed to delete");
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

  const labelStyle = {
    fontSize: "0.75rem", fontWeight: 600,
    color: "#374151", display: "block", marginBottom: "5px"
  };

  return (
    <div style={{ display: "flex", background: "#f8fafc", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: "240px", flex: 1, padding: "32px" }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: "28px",
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "1.6rem", fontWeight: 800, color: "#0f172a",
            }}>
              Medicine Inventory
            </h1>
            <p style={{ color: "#64748b", marginTop: "4px", fontSize: "0.875rem" }}>
              {medicines.length} medicines in stock
            </p>
          </div>
          {user?.role === "admin" && (
            <button
              onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "white", border: "none", padding: "10px 20px",
                borderRadius: "10px", fontSize: "0.875rem", fontWeight: 600,
                cursor: "pointer", fontFamily: "'Sora', sans-serif",
                boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <Plus size={16} /> Add Medicine
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div style={{
            background: "white", borderRadius: "16px",
            padding: "24px", border: `1px solid ${editingId ? "#bfdbfe" : "#e2e8f0"}`,
            boxShadow: editingId ? "0 4px 20px rgba(37,99,235,0.1)" : "0 4px 20px rgba(0,0,0,0.06)",
            marginBottom: "24px",
          }}>
            {/* Form Header */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between", marginBottom: "20px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "34px", height: "34px",
                  background: editingId ? "#eff6ff" : "#f0fdf4",
                  borderRadius: "8px", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  {editingId
                    ? <Pencil size={16} color="#2563eb" />
                    : <Plus size={16} color="#059669" />
                  }
                </div>
                <h2 style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "1rem", fontWeight: 700, color: "#0f172a",
                }}>
                  {editingId ? "Edit Medicine" : "Add New Medicine"}
                </h2>
              </div>
              <button
                onClick={handleCancel}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM STARTS HERE */}
            <form onSubmit={handleSubmit}>

              {/* Row 1 — Name, Generic, Category */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: "14px", marginBottom: "14px",
              }}>
                <div>
                  <label style={labelStyle}>Medicine Name *</label>
                  <input
                    placeholder="Paracetamol"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Generic Name</label>
                  <input
                    placeholder="Acetaminophen"
                    value={form.genericName}
                    onChange={e => setForm({ ...form, genericName: e.target.value })}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Category *</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 2 — Manufacturer, Price, Stock */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: "14px", marginBottom: "14px",
              }}>
                <div>
                  <label style={labelStyle}>Manufacturer *</label>
                  <input
                    placeholder="Square Pharma"
                    value={form.manufacturer}
                    onChange={e => setForm({ ...form, manufacturer: e.target.value })}
                    required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Price (৳) *</label>
                  <input
                    type="number" placeholder="10"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Stock *</label>
                  <input
                    type="number" placeholder="100"
                    value={form.stock}
                    onChange={e => setForm({ ...form, stock: e.target.value })}
                    required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
                </div>
              </div>

              {/* Row 3 — Low Stock, Expiry, Prescription */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: "14px", marginBottom: "14px",
              }}>
                <div>
                  <label style={labelStyle}>Low Stock Alert</label>
                  <input
                    type="number" placeholder="10"
                    value={form.lowStockThreshold}
                    onChange={e => setForm({ ...form, lowStockThreshold: e.target.value })}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Expiry Date *</label>
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={e => setForm({ ...form, expiryDate: e.target.value })}
                    required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                    onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "20px" }}>
                  <input
                    type="checkbox" id="rx"
                    checked={form.requiresPrescription}
                    onChange={e => setForm({ ...form, requiresPrescription: e.target.checked })}
                    style={{ width: "16px", height: "16px", accentColor: "#2563eb" }}
                  />
                  <label htmlFor="rx" style={{ fontSize: "0.8rem", color: "#374151", fontWeight: 500, cursor: "pointer" }}>
                    Requires Prescription
                  </label>
                </div>
              </div>

              {/* Row 4 — Location (NEW) */}
              <div style={{
                background: "#f0f9ff",
                border: "1px solid #bae6fd",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                  <MapPin size={14} color="#0284c7" />
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0284c7" }}>
                    Shelf Location (helps pharmacist find medicine quickly)
                  </label>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ ...labelStyle, color: "#0369a1" }}>Row (e.g. A, B, C)</label>
                    <input
                      placeholder="e.g. A"
                      value={form.location?.row || ""}
                      onChange={e => setForm({
                        ...form,
                        location: { ...form.location, row: e.target.value }
                      })}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = "#0284c7"; e.target.style.background = "white"; }}
                      onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                    />
                  </div>
                  <div>
                    <label style={{ ...labelStyle, color: "#0369a1" }}>Column (e.g. 1, 2, 3)</label>
                    <input
                      placeholder="e.g. 3"
                      value={form.location?.column || ""}
                      onChange={e => setForm({
                        ...form,
                        location: { ...form.location, column: e.target.value }
                      })}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = "#0284c7"; e.target.style.background = "white"; }}
                      onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <textarea
                placeholder="Description (optional)"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                style={{ ...inputStyle, height: "70px", resize: "vertical", marginBottom: "16px" }}
                onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.background = "white"; }}
                onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
              />

              {/* Buttons */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{
                  background: editingId
                    ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
                    : "linear-gradient(135deg, #059669, #047857)",
                  color: "white", border: "none", padding: "10px 24px",
                  borderRadius: "8px", fontSize: "0.875rem", fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Sora', sans-serif",
                  boxShadow: editingId
                    ? "0 4px 12px rgba(37,99,235,0.25)"
                    : "0 4px 12px rgba(5,150,105,0.25)",
                }}>
                  {editingId ? "Save Changes" : "Add Medicine"}
                </button>
                <button
                  type="button" onClick={handleCancel}
                  style={{
                    background: "#f1f5f9", color: "#64748b",
                    border: "1px solid #e2e8f0", padding: "10px 24px",
                    borderRadius: "8px", fontSize: "0.875rem", fontWeight: 600,
                    cursor: "pointer", fontFamily: "'Sora', sans-serif",
                  }}
                >
                  Cancel
                </button>
              </div>

            </form>
            {/* FORM ENDS HERE */}

          </div>
        )}

        {/* Search & Filter */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={16} color="#94a3b8" style={{
              position: "absolute", left: "12px",
              top: "50%", transform: "translateY(-50%)",
            }} />
            <input
              placeholder="Search medicines..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                ...inputStyle, paddingLeft: "38px",
                background: "white", border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
              onFocus={e => { e.target.style.borderColor = "#2563eb"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.08)"; }}
              onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; }}
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{
              ...inputStyle, width: "180px",
              background: "white", border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)", cursor: "pointer",
            }}
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{
          background: "white", borderRadius: "16px",
          border: "1px solid #e2e8f0", overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                {["Medicine", "Category", "Manufacturer", "Price", "Stock", "Location", "Expiry", "Type",
                  user?.role === "admin" && "Actions"].filter(Boolean).map(h => (
                  <th key={h} style={{
                    textAlign: "left", padding: "13px 16px",
                    fontSize: "0.72rem", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                    Loading...
                  </td>
                </tr>
              ) : medicines.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                    <Pill size={32} color="#e2e8f0" style={{ margin: "0 auto 10px", display: "block" }} />
                    No medicines found
                  </td>
                </tr>
              ) : medicines.map(m => (
                <tr
                  key={m._id}
                  style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
                  onMouseLeave={e => e.currentTarget.style.background = "white"}
                >
                  {/* Medicine Name */}
                  <td style={{ padding: "13px 16px" }}>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#0f172a" }}>{m.name}</p>
                    <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "2px" }}>{m.genericName}</p>
                  </td>

                  {/* Category */}
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      background: "#eff6ff", color: "#2563eb",
                      fontSize: "0.72rem", fontWeight: 600,
                      padding: "3px 10px", borderRadius: "20px",
                    }}>
                      {m.category}
                    </span>
                  </td>

                  {/* Manufacturer */}
                  <td style={{ padding: "13px 16px", fontSize: "0.85rem", color: "#374151" }}>
                    {m.manufacturer}
                  </td>

                  {/* Price */}
                  <td style={{ padding: "13px 16px", fontSize: "0.875rem", fontWeight: 700, color: "#0f172a" }}>
                    ৳{m.price}
                  </td>

                  {/* Stock */}
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1rem",
                      color: m.stock <= m.lowStockThreshold ? "#dc2626" : "#16a34a",
                    }}>
                      {m.stock}
                    </span>
                    {m.stock <= m.lowStockThreshold && (
                      <span style={{ display: "block", fontSize: "0.65rem", color: "#dc2626", fontWeight: 600 }}>
                        LOW STOCK
                      </span>
                    )}
                  </td>

                  {/* Location (NEW COLUMN) */}
                  <td style={{ padding: "13px 16px" }}>
                    {m.location?.row || m.location?.column ? (
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: "4px",
                        background: "#f0f9ff", border: "1px solid #bae6fd",
                        borderRadius: "8px", padding: "4px 10px",
                      }}>
                        <MapPin size={11} color="#0284c7" />
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0284c7" }}>
                          {m.location?.row ? `R${m.location.row}` : ""}
                          {m.location?.row && m.location?.column ? "-" : ""}
                          {m.location?.column ? `C${m.location.column}` : ""}
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>—</span>
                    )}
                  </td>

                  {/* Expiry */}
                  <td style={{ padding: "13px 16px", fontSize: "0.8rem", color: "#64748b" }}>
                    {new Date(m.expiryDate).toLocaleDateString()}
                  </td>

                  {/* Type */}
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      fontSize: "0.72rem", fontWeight: 600,
                      padding: "3px 10px", borderRadius: "20px",
                      background: m.requiresPrescription ? "#fffbeb" : "#f0fdf4",
                      color: m.requiresPrescription ? "#d97706" : "#16a34a",
                    }}>
                      {m.requiresPrescription ? "Rx" : "OTC"}
                    </span>
                  </td>

                  {/* Actions */}
                  {user?.role === "admin" && (
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => handleEdit(m)}
                          style={{
                            background: "#eff6ff", border: "1px solid #bfdbfe",
                            color: "#2563eb", padding: "6px", borderRadius: "8px",
                            cursor: "pointer", display: "flex", alignItems: "center",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.color = "white"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#2563eb"; }}
                          title="Edit Medicine"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(m._id)}
                          style={{
                            background: "#fef2f2", border: "1px solid #fecaca",
                            color: "#dc2626", padding: "6px", borderRadius: "8px",
                            cursor: "pointer", display: "flex", alignItems: "center",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.color = "white"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.color = "#dc2626"; }}
                          title="Delete Medicine"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Medicines;