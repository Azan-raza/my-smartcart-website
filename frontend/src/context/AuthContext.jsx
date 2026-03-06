import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("smartcart_user");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed === "object" && typeof parsed.token === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("smartcart_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("smartcart_user");
    }
  }, [user]);

  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", payload);
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", payload);
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({ user, loading, register, login, logout, isAdmin: user?.role === "admin" }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
