import { useNavigate } from "react-router-dom";
import {
  Shield, Package, TrendingUp, FileText,
  Users, Bell, ChevronRight, Check,
  Phone, Mail, MapPin, Clock, Star,
  Pill, ArrowRight
} from "lucide-react";

const ShebaLanding = () => {
  const navigate = useNavigate();

  const services = [
    { icon: Package, title: "Medicine Supply", desc: "Complete range of prescription and OTC medicines always available.", color: "#2563eb", bg: "#eff6ff" },
    { icon: Shield, title: "Quality Assured", desc: "All medicines sourced from certified manufacturers with quality checks.", color: "#7c3aed", bg: "#f5f3ff" },
    { icon: FileText, title: "Prescription Service", desc: "Digital prescription management with doctor verification system.", color: "#059669", bg: "#f0fdf4" },
    { icon: TrendingUp, title: "Inventory Control", desc: "Real-time stock management with automated alerts and tracking.", color: "#0891b2", bg: "#ecfeff" },
    { icon: Users, title: "Customer Care", desc: "Dedicated staff to help you find the right medicines and health products.", color: "#d97706", bg: "#fffbeb" },
    { icon: Bell, title: "Expiry Tracking", desc: "Advanced system to ensure all medicines are within safe expiry dates.", color: "#dc2626", bg: "#fef2f2" },
  ];

  const stats = [
    { value: "10+", label: "Years of Service" },
    { value: "5000+", label: "Medicines Available" },
    { value: "50000+", label: "Happy Customers" },
    { value: "24/7", label: "Emergency Service" },
  ];

  

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
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "42px", height: "42px",
            background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
            borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
          }}>
            <Pill size={22} color="white" />
          </div>
          <div>
            <span style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 800,
              fontSize: "1.1rem", color: "#0f172a",
            }}>
              Sheba Pharmacy
            </span>
            <span style={{
              display: "block", fontSize: "0.65rem",
              color: "#64748b", fontWeight: 500,
            }}>
              Your Trusted Health Partner
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {["Services", "About Us", "Contact"].map(item => (
            <a
              key={item}
              href={"#" + item.toLowerCase().replace(" ", "-")}
              style={{
                color: "#64748b", textDecoration: "none",
                fontSize: "0.875rem", fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.target.style.color = "#2563eb"}
              onMouseLeave={e => e.target.style.color = "#64748b"}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "transparent", border: "2px solid #e2e8f0",
              color: "#0f172a", padding: "8px 18px", borderRadius: "8px",
              fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
              fontFamily: "'Sora', sans-serif", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "#2563eb"; e.target.style.color = "#2563eb"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.color = "#0f172a"; }}
          >
            Staff Login
          </button>
          <button
            onClick={() => navigate("/register")}
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              border: "none", color: "white", padding: "8px 18px",
              borderRadius: "8px", fontSize: "0.875rem", fontWeight: 600,
              cursor: "pointer", fontFamily: "'Sora', sans-serif",
              boxShadow: "0 4px 12px rgba(37,99,235,0.25)", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Register Staff
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #1d4ed8 70%, #0284c7 100%)",
        padding: "90px 40px", position: "relative", overflow: "hidden",
      }}>
        {/* Decorations */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: "-100px", left: "-60px",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

            {/* Left Content */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px", padding: "6px 16px", marginBottom: "24px",
              }}>
                <Star size={14} color="#fbbf24" fill="#fbbf24" />
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", fontWeight: 500 }}>
                  Trusted Pharmacy Since 2015
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "3rem", fontWeight: 800,
                color: "white", lineHeight: 1.15, marginBottom: "20px",
              }}>
                Welcome to
                <span style={{
                  display: "block",
                  background: "linear-gradient(135deg, #60a5fa, #38bdf8)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  Sheba Pharmacy
                </span>
              </h1>

              <p style={{
                color: "rgba(255,255,255,0.75)", fontSize: "1.05rem",
                lineHeight: 1.75, marginBottom: "16px", maxWidth: "480px",
              }}>
                Sheba Pharmacy is your trusted healthcare partner providing quality medicines,
                professional pharmaceutical services, and compassionate care to our community.
              </p>

              <p style={{
                color: "rgba(255,255,255,0.5)", fontSize: "0.875rem",
                lineHeight: 1.6, marginBottom: "36px", maxWidth: "450px",
              }}>
                Our digital management system ensures accurate inventory tracking,
                prescription validation, and efficient service for all our customers.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button
                  onClick={() => navigate("/login")}
                  style={{
                    background: "white", color: "#2563eb",
                    border: "none", padding: "13px 26px",
                    borderRadius: "10px", fontSize: "0.9rem",
                    fontWeight: 700, cursor: "pointer",
                    fontFamily: "'Sora', sans-serif",
                    display: "flex", alignItems: "center", gap: "8px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  Staff Portal <ArrowRight size={17} />
                </button>
                <button
                  onClick={() => {
                    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    background: "transparent", color: "white",
                    border: "2px solid rgba(255,255,255,0.4)",
                    padding: "13px 26px", borderRadius: "10px",
                    fontSize: "0.9rem", fontWeight: 600,
                    cursor: "pointer", fontFamily: "'Sora', sans-serif",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
                >
                  Our Services
                </button>
              </div>

              {/* Trust badges */}
              <div style={{ display: "flex", gap: "20px", marginTop: "36px", flexWrap: "wrap" }}>
                {["Licensed Pharmacy", "Quality Certified", "24/7 Emergency"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Check size={14} color="#34d399" />
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Info Card */}
            <div>
              <div style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "20px", padding: "28px",
                backdropFilter: "blur(20px)",
              }}>
                <h3 style={{
                  fontFamily: "'Sora', sans-serif", color: "white",
                  fontWeight: 700, fontSize: "1rem", marginBottom: "20px",
                }}>
                  Pharmacy Management System
                </h3>

                {/* System Features */}
                {[
                  { label: "Medicine Inventory", status: "Active", color: "#34d399" },
                  { label: "Sales & Billing", status: "Active", color: "#34d399" },
                  { label: "Prescription System", status: "Active", color: "#34d399" },
                  { label: "Stock Alerts", status: "Active", color: "#34d399" },
                  { label: "Customer Records", status: "Active", color: "#34d399" },
                  { label: "Fraud Detection", status: "Active", color: "#34d399" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    marginBottom: "8px",
                  }}>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>
                      {item.label}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{
                        width: "6px", height: "6px",
                        background: item.color, borderRadius: "50%",
                        boxShadow: `0 0 6px ${item.color}`,
                      }} />
                      <span style={{ color: item.color, fontSize: "0.75rem", fontWeight: 600 }}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => navigate("/login")}
                  style={{
                    width: "100%", marginTop: "16px",
                    background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                    color: "white", border: "none", padding: "12px",
                    borderRadius: "10px", fontSize: "0.875rem", fontWeight: 700,
                    cursor: "pointer", fontFamily: "'Sora', sans-serif",
                    boxShadow: "0 4px 15px rgba(37,99,235,0.4)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  Access Staff Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{
        background: "white", padding: "50px 40px",
        borderBottom: "1px solid #e2e8f0",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                textAlign: "center", padding: "24px",
                borderRadius: "16px", border: "1px solid #e2e8f0",
                background: "#f8fafc", transition: "all 0.3s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 25px rgba(37,99,235,0.1)"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.2)"; e.currentTarget.style.background = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc"; }}
              >
                <p style={{
                  fontFamily: "'Sora', sans-serif", fontSize: "2.2rem", fontWeight: 800,
                  background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {stat.value}
                </p>
                <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "4px", fontWeight: 500 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "90px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "55px" }}>
            <span style={{
              background: "#eff6ff", color: "#2563eb",
              padding: "6px 16px", borderRadius: "20px",
              fontSize: "0.8rem", fontWeight: 600,
            }}>
              Our Services
            </span>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontSize: "2rem",
              fontWeight: 800, color: "#0f172a", marginTop: "16px",
            }}>
              Everything Managed
              <span style={{
                display: "block",
                background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                by Sheba Pharmacy
              </span>
            </h2>
            <p style={{ color: "#64748b", marginTop: "12px", fontSize: "0.95rem", maxWidth: "480px", margin: "12px auto 0" }}>
              Our digital management system powers every aspect of our pharmacy operations.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {services.map((service, i) => (
              <div
                key={i}
                style={{
                  background: "white", borderRadius: "16px",
                  padding: "26px", border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 16px 35px rgba(37,99,235,0.1)";
                  e.currentTarget.style.borderColor = "rgba(37,99,235,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                <div style={{
                  width: "48px", height: "48px", background: service.bg,
                  borderRadius: "12px", display: "flex",
                  alignItems: "center", justifyContent: "center", marginBottom: "14px",
                }}>
                  <service.icon size={22} color={service.color} />
                </div>
                <h3 style={{
                  fontFamily: "'Sora', sans-serif", fontSize: "0.95rem",
                  fontWeight: 700, color: "#0f172a", marginBottom: "8px",
                }}>
                  {service.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about-us" style={{ padding: "90px 40px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

            {/* Left */}
            <div>
              <span style={{
                background: "#f0fdf4", color: "#16a34a",
                padding: "6px 16px", borderRadius: "20px",
                fontSize: "0.8rem", fontWeight: 600,
              }}>
                About Us
              </span>
              <h2 style={{
                fontFamily: "'Sora', sans-serif", fontSize: "2rem",
                fontWeight: 800, color: "#0f172a", marginTop: "16px", marginBottom: "16px",
              }}>
                Serving Our Community
                <span style={{
                  display: "block",
                  background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  Since 2015
                </span>
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "20px" }}>
                Sheba Pharmacy was established with a vision to provide accessible, affordable,
                and quality healthcare to our community. Over the years, we have grown to become
                one of the most trusted pharmacies in the region.
              </p>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "28px" }}>
                Our team of qualified pharmacists and healthcare professionals are dedicated to
                ensuring that every customer receives the best possible care and advice.
              </p>

              {[
                "Licensed and certified pharmacy",
                "Qualified and experienced pharmacists",
                "Wide range of medicines and health products",
                "Digital prescription management system",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div style={{
                    width: "20px", height: "20px", background: "#eff6ff",
                    borderRadius: "50%", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Check size={11} color="#2563eb" />
                  </div>
                  <span style={{ color: "#374151", fontSize: "0.875rem", fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>

           
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "90px 40px", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <span style={{
              background: "#eff6ff", color: "#2563eb",
              padding: "6px 16px", borderRadius: "20px",
              fontSize: "0.8rem", fontWeight: 600,
            }}>
              Contact Us
            </span>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontSize: "2rem",
              fontWeight: 800, color: "#0f172a", marginTop: "16px",
            }}>
              Visit Sheba Pharmacy
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {[
              { icon: MapPin, label: "Address", value: "123 Main Road, Dhaka, Bangladesh", color: "#2563eb", bg: "#eff6ff" },
              { icon: Phone, label: "Phone", value: "+880 1712-345678", color: "#059669", bg: "#f0fdf4" },
              { icon: Mail, label: "Email", value: "info@shebapharmacy.com", color: "#7c3aed", bg: "#f5f3ff" },
              { icon: Clock, label: "Hours", value: "Sat-Thu: 8AM-10PM\nFri: 2PM-10PM", color: "#d97706", bg: "#fffbeb" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "white", borderRadius: "14px",
                  padding: "22px", border: "1px solid #e2e8f0",
                  textAlign: "center", transition: "all 0.3s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  width: "44px", height: "44px", background: item.bg,
                  borderRadius: "12px", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  margin: "0 auto 12px",
                }}>
                  <item.icon size={20} color={item.color} />
                </div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: "#0f172a", fontSize: "0.85rem", marginBottom: "6px" }}>
                  {item.label}
                </p>
                <p style={{ color: "#64748b", fontSize: "0.8rem", lineHeight: 1.5, whiteSpace: "pre-line" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
        padding: "70px 40px", textAlign: "center",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Sora', sans-serif", fontSize: "2rem",
            fontWeight: 800, color: "white", marginBottom: "14px",
          }}>
            Staff Access Portal
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginBottom: "28px" }}>
            Login to manage inventory, process sales, and track prescriptions.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "white", color: "#2563eb",
                border: "none", padding: "13px 26px",
                borderRadius: "10px", fontSize: "0.9rem",
                fontWeight: 700, cursor: "pointer",
                fontFamily: "'Sora', sans-serif",
                display: "inline-flex", alignItems: "center", gap: "8px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Staff Login <ChevronRight size={17} />
            </button>
            <button
              onClick={() => navigate("/register")}
              style={{
                background: "transparent", color: "white",
                border: "2px solid rgba(255,255,255,0.4)",
                padding: "13px 26px", borderRadius: "10px",
                fontSize: "0.9rem", fontWeight: 600,
                cursor: "pointer", fontFamily: "'Sora', sans-serif",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
            >
              Register Staff
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "#0f172a", padding: "32px 40px",
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
              borderRadius: "8px", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}>
              <Pill size={16} color="white" />
            </div>
            <div>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: "white", fontSize: "0.9rem" }}>
                Sheba Pharmacy
              </span>
              <p style={{ color: "#475569", fontSize: "0.65rem", marginTop: "1px" }}>
                Your Trusted Health Partner
              </p>
            </div>
          </div>
          <p style={{ color: "#475569", fontSize: "0.8rem" }}>
            © 2026 Sheba Pharmacy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ShebaLanding;