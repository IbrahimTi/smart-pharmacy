import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getPrescriptionsAPI, updatePrescriptionStatusAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FileText, CheckCircle, XCircle, Clock } from "lucide-react";

const Prescriptions = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPrescriptions(); }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await getPrescriptionsAPI();
      setPrescriptions(res.data.prescriptions);
    } catch (error) {
      toast.error("Failed to fetch prescriptions");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updatePrescriptionStatusAPI(id, { status });
      toast.success(`Prescription ${status}!`);
      fetchPrescriptions();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const statusConfig = {
    Pending: { bg: "#fffbeb", color: "#d97706", border: "#fde68a", icon: Clock },
    Approved: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", icon: CheckCircle },
    Rejected: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca", icon: XCircle },
  };

  return (
    <div style={{ display: "flex", background: "#f8fafc", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: "260px", flex: 1, padding: "32px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>
            Prescriptions
          </h1>
          <p style={{ color: "#64748b", marginTop: "4px", fontSize: "0.875rem" }}>
            {prescriptions.length} total prescriptions
          </p>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {[
            { label: "Pending", count: prescriptions.filter(p => p.status === "Pending").length, ...statusConfig.Pending },
            { label: "Approved", count: prescriptions.filter(p => p.status === "Approved").length, ...statusConfig.Approved },
            { label: "Rejected", count: prescriptions.filter(p => p.status === "Rejected").length, ...statusConfig.Rejected },
          ].map((item, i) => (
            <div key={i} style={{
              background: "white", borderRadius: "12px",
              padding: "18px", border: `1px solid ${item.border}`,
              display: "flex", alignItems: "center", gap: "14px",
            }}>
              <div style={{
                width: "42px", height: "42px",
                background: item.bg, borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <item.icon size={20} color={item.color} />
              </div>
              <div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>
                  {item.count}
                </p>
                <p style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>{item.label}</p>
              </div>
            </div>
          ))}
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
                {["Customer", "Doctor", "Hospital", "Uploaded By", "Status", "Date", user?.role === "admin" && "Actions"].filter(Boolean).map(h => (
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
              ) : prescriptions.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                  <FileText size={32} color="#e2e8f0" style={{ margin: "0 auto 10px", display: "block" }} />
                  No prescriptions yet
                </td></tr>
              ) : prescriptions.map(p => {
                const config = statusConfig[p.status] || statusConfig.Pending;
                return (
                  <tr
                    key={p._id}
                    style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
                    onMouseLeave={e => e.currentTarget.style.background = "white"}
                  >
                    <td style={{ padding: "13px 16px" }}>
                      <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#0f172a" }}>{p.customer?.name}</p>
                      <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "2px" }}>{p.customer?.phone}</p>
                    </td>
                    <td style={{ padding: "13px 16px", fontSize: "0.875rem", color: "#374151", fontWeight: 500 }}>
                      {p.doctorName}
                    </td>
                    <td style={{ padding: "13px 16px", fontSize: "0.85rem", color: "#64748b" }}>
                      {p.hospitalName || "—"}
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{
                        background: "#f1f5f9", color: "#475569",
                        fontSize: "0.75rem", fontWeight: 600,
                        padding: "3px 10px", borderRadius: "20px",
                      }}>
                        {p.uploadedBy?.name}
                      </span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{
                        background: config.bg, color: config.color,
                        border: `1px solid ${config.border}`,
                        fontSize: "0.72rem", fontWeight: 700,
                        padding: "4px 10px", borderRadius: "20px",
                      }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: "13px 16px", fontSize: "0.8rem", color: "#64748b" }}>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    {user?.role === "admin" && (
                      <td style={{ padding: "13px 16px" }}>
                        {p.status === "Pending" ? (
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => handleStatus(p._id, "Approved")}
                              style={{
                                display: "flex", alignItems: "center", gap: "4px",
                                background: "#f0fdf4", color: "#16a34a",
                                border: "1px solid #bbf7d0", padding: "5px 10px",
                                borderRadius: "6px", fontSize: "0.75rem",
                                fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.color = "white"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.color = "#16a34a"; }}
                            >
                              <CheckCircle size={13} /> Approve
                            </button>
                            <button
                              onClick={() => handleStatus(p._id, "Rejected")}
                              style={{
                                display: "flex", alignItems: "center", gap: "4px",
                                background: "#fef2f2", color: "#dc2626",
                                border: "1px solid #fecaca", padding: "5px 10px",
                                borderRadius: "6px", fontSize: "0.75rem",
                                fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.color = "white"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.color = "#dc2626"; }}
                            >
                              <XCircle size={13} /> Reject
                            </button>
                          </div>
                        ) : (
                          <span style={{ color: "#94a3b8", fontSize: "0.8rem" }}>—</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;