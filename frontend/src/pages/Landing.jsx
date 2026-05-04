import { useNavigate } from "react-router-dom";
import {
  Shield, Package, TrendingUp, FileText,
  Users, Bell, ChevronRight, Check,
  Activity, Star, ArrowRight, Pill
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Package, title: "Smart Inventory", desc: "Real-time stock tracking with automated low-stock and expiry alerts.", color: "#2563eb", bg: "#eff6ff" },
    { icon: Shield, title: "Secure Authentication", desc: "Role-based access for admins and pharmacists with JWT security.", color: "#7c3aed", bg: "#f5f3ff" },
    { icon: TrendingUp, title: "Sales & Analytics", desc: "Complete billing system with invoice generation and revenue tracking.", color: "#0891b2", bg: "#ecfeff" },
    { icon: FileText, title: "Prescription Management", desc: "Digital prescription upload, validation and fraud detection system.", color: "#059669", bg: "#f0fdf4" },
    { icon: Users, title: "Customer History", desc: "Track every customer purchase history and spending patterns.", color: "#d97706", bg: "#fffbeb" },
    { icon: Bell, title: "Smart Alerts", desc: "Automated notifications for expiring medicines and low stock levels.", color: "#dc2626", bg: "#fef2f2" },
  ];

  const stats = [
    { value: "500+", label: "Medicines Managed" },
    { value: "99.9%", label: "System Uptime" },
    { value: "50+", label: "Pharmacies Trust Us" },
    { value: "24/7", label: "Support Available" },
  ];

  const steps = [
    { step: "01", title: "Register Your Pharmacy", desc: "Create your admin account and set up your pharmacy profile in minutes." },
    { step: "02", title: "Add Your Inventory", desc: "Import or manually add your medicine inventory with all details." },
    { step: "03", title: "Manage & Track", desc: "Start processing sales, tracking stock, and generating reports instantly." },
  ];

  const btnPrimary = {
    background: "white", color: "#2563eb",
    border: "none", padding: "14px 28px",
    borderRadius: "10px", fontSize: "0.95rem",
    fontWeight: 700, cursor: "pointer",
    fontFamily: "'Sora', sans-serif",
    display: "flex", alignItems: "center", gap: "8px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  };

  const btnOutline = {
    background: "transparent", color: "white",
    border: "2px solid rgba(255,255,255,0.4)",
    padding: "14px 28px", borderRadius: "10px",
    fontSize: "0.95rem", fontWeight: 600,
    cursor: "pointer", fontFamily: "'Sora', sans-serif",
    transition: "all 0.3s ease",
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{
        background: "white", borderBottom: "1px solid #e2e8f0",
        padding: "0 40px", height: "70px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "38px", height: "38px",
            background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
            borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Pill size={20} color="white" />
          </div>
          <div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#0f172a" }}>
              Smart Pharmacy
            </span>
            <span style={{ display: "block", fontSize: "0.65rem", color: "#64748b", fontWeight: 500 }}>
              Management System
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {["Features", "How It Works"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} style={{
              color: "#64748b", textDecoration: "none",
              fontSize: "0.875rem", fontWeight: 500,
            }}>
              {item}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "transparent", border: "2px solid #e2e8f0",
              color: "#0f172a", padding: "8px 20px", borderRadius: "8px",
              fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
              fontFamily: "'Sora', sans-serif", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "#2563eb"; e.target.style.color = "#2563eb"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.color = "#0f172a"; }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              border: "none", color: "white", padding: "8px 20px",
              borderRadius: "8px", fontSize: "0.875rem", fontWeight: 600,
              cursor: "pointer", fontFamily: "'Sora', sans-serif",
              boxShadow: "0 4px 12px rgba(37,99,235,0.25)", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(37,99,235,0.25)"; }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #1d4ed8 75%, #0284c7 100%)",
        padding: "100px 40px", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-100px", right: "-100px",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: "-150px", left: "-100px",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

            {/* Left */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px", padding: "6px 16px", marginBottom: "24px",
              }}>
                <Star size={14} color="#fbbf24" fill="#fbbf24" />
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", fontWeight: 500 }}>
                  #1 Pharmacy Management System
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "3.2rem", fontWeight: 800,
                color: "white", lineHeight: 1.15, marginBottom: "20px",
              }}>
                Smart Pharmacy
                <span style={{
                  display: "block",
                  background: "linear-gradient(135deg, #60a5fa, #38bdf8)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  Management System
                </span>
              </h1>

              <p style={{
                color: "rgba(255,255,255,0.7)", fontSize: "1.1rem",
                lineHeight: 1.7, marginBottom: "36px", maxWidth: "480px",
              }}>
                Digitize and optimize your pharmacy operations. Manage inventory,
                track sales, handle prescriptions, and grow your business all in one powerful platform.
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button
                  onClick={() => navigate("/register")}
                  style={btnPrimary}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  Start Free Today <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate("/login")}
                  style={btnOutline}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
                >
                  Sign In
                </button>
              </div>

              <div style={{ display: "flex", gap: "24px", marginTop: "40px" }}>
                {["Secure & Encrypted", "Real-time Updates", "24/7 Access"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Check size={14} color="#34d399" />
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Dashboard Preview */}
            <div>
              <div style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "20px", padding: "24px",
                backdropFilter: "blur(20px)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <span style={{ color: "white", fontFamily: "'Sora', sans-serif", fontWeight: 600 }}>Today's Overview</span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>Live</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                  {[
                    { label: "Sales Today", value: "৳12,450", change: "+12%", color: "#34d399" },
                    { label: "Medicines", value: "284", change: "Active", color: "#60a5fa" },
                    { label: "Customers", value: "48", change: "Today", color: "#a78bfa" },
                    { label: "Low Stock", value: "3", change: "Alert", color: "#fb923c" },
                  ].map(item => (
                    <div key={item.label} style={{
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "12px", padding: "16px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", marginBottom: "6px" }}>{item.label}</p>
                      <p style={{ color: "white", fontFamily: "'Sora', sans-serif", fontSize: "1.3rem", fontWeight: 700 }}>{item.value}</p>
                      <p style={{ color: item.color, fontSize: "0.7rem", marginTop: "4px" }}>{item.change}</p>
                    </div>
                  ))}
                </div>

                {/* Mini Chart */}
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "14px" }}>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", marginBottom: "12px" }}>Weekly Sales</p>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "50px" }}>
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} style={{ flex: 1 }}>
                        <div style={{
                          width: "100%", height: `${h}%`,
                          background: i === 5
                            ? "linear-gradient(180deg, #60a5fa, #2563eb)"
                            : "rgba(255,255,255,0.15)",
                          borderRadius: "4px 4px 0 0",
                        }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span key={i} style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", flex: 1, textAlign: "center" }}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "white", padding: "60px 40px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px" }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <p style={{
                  fontFamily: "'Sora', sans-serif", fontSize: "2.5rem", fontWeight: 800,
                  background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {stat.value}
                </p>
                <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "4px", fontWeight: 500 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span style={{
              background: "#eff6ff", color: "#2563eb",
              padding: "6px 16px", borderRadius: "20px",
              fontSize: "0.8rem", fontWeight: 600,
            }}>
              Features
            </span>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontSize: "2.2rem",
              fontWeight: 800, color: "#0f172a", marginTop: "16px",
            }}>
              Everything You Need to Run
              <span style={{
                display: "block",
                background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                a Modern Pharmacy
              </span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {features.map((feature, i) => (
              <div
                key={i}
                style={{
                  background: "white", borderRadius: "16px",
                  padding: "28px", border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease", cursor: "default",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(37,99,235,0.1)";
                  e.currentTarget.style.borderColor = "rgba(37,99,235,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                <div style={{
                  width: "50px", height: "50px", background: feature.bg,
                  borderRadius: "12px", display: "flex", alignItems: "center",
                  justifyContent: "center", marginBottom: "16px",
                }}>
                  <feature.icon size={24} color={feature.color} />
                </div>
                <h3 style={{
                  fontFamily: "'Sora', sans-serif", fontSize: "1rem",
                  fontWeight: 700, color: "#0f172a", marginBottom: "8px",
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "100px 40px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span style={{
              background: "#f0fdf4", color: "#16a34a",
              padding: "6px 16px", borderRadius: "20px",
              fontSize: "0.8rem", fontWeight: 600,
            }}>
              How It Works
            </span>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontSize: "2.2rem",
              fontWeight: 800, color: "#0f172a", marginTop: "16px",
            }}>
              Get Started in 3 Simple Steps
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
            {steps.map((step, i) => (
              <div key={i} style={{ textAlign: "center", position: "relative" }}>
                {i < steps.length - 1 && (
                  <div style={{
                    position: "absolute", top: "30px", right: "-20px",
                    width: "40px", height: "2px",
                    background: "linear-gradient(90deg, #2563eb, #0ea5e9)",
                  }} />
                )}
                <div style={{
                  width: "60px", height: "60px",
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  borderRadius: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 8px 20px rgba(37,99,235,0.25)",
                }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", color: "white", fontSize: "1.2rem", fontWeight: 800 }}>
                    {step.step}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "'Sora', sans-serif", fontSize: "1.1rem",
                  fontWeight: 700, color: "#0f172a", marginBottom: "10px",
                }}>
                  {step.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
        padding: "80px 40px", textAlign: "center",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Sora', sans-serif", fontSize: "2.2rem",
            fontWeight: 800, color: "white", marginBottom: "16px",
          }}>
            Ready to Transform Your Pharmacy?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginBottom: "32px" }}>
            Join pharmacies already using Smart Pharmacy to streamline their operations.
          </p>
          <button
            onClick={() => navigate("/register")}
            style={{
              background: "white", color: "#2563eb",
              border: "none", padding: "14px 28px",
              borderRadius: "10px", fontSize: "0.95rem",
              fontWeight: 700, cursor: "pointer",
              fontFamily: "'Sora', sans-serif",
              display: "inline-flex", alignItems: "center", gap: "8px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            Get Started Free <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "#0f172a", padding: "40px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px",
              background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Pill size={16} color="white" />
            </div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: "white", fontSize: "0.9rem" }}>
              Smart Pharmacy
            </span>
          </div>
          <p style={{ color: "#475569", fontSize: "0.8rem" }}>
            © 2026 Smart Pharmacy Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;