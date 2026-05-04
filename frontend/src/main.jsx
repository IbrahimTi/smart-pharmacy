import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "white",
              color: "#0f172a",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: { primary: "#059669", secondary: "white" },
            },
            error: {
              iconTheme: { primary: "#dc2626", secondary: "white" },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);