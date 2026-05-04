import { createContext, useContext, useState, useEffect } from "react";
import { getMeAPI } from "../utils/api";

// Context is like a global variable
// Any component can access user data without passing props
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in when app starts
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await getMeAPI();
          setUser(res.data.user);
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  // Save token and user after login
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // Clear token and user after logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);