import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (name: string, email: string, password: string) => Promise<string | null>;
  logout: () => void;
  requireAuth: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    if (saved) return JSON.parse(saved);

    // DEVELOPMENT PLACEHOLDER USER
    return {
      id: "dev-001",
      name: "Developer User",
      email: "dev@moviesapp.dev",
    };
  });

  const saveUser = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem("user", JSON.stringify(u));
    else localStorage.removeItem("user");
  };

  const signUp = async (name: string, email: string, password: string) => {
    if (!email.includes("@")) return "Invalid email format.";
    if (password.length < 6) return "Password must be at least 6 characters.";

    const newUser = { id: Date.now().toString(), name, email };
    saveUser(newUser);
    return null;
  };

  const signIn = async (email: string, password: string) => {
    if (!email.includes("@")) return "Invalid email.";
    if (password.length < 6) return "Invalid password.";

    const saved = localStorage.getItem("user");
    if (!saved) return "No user found.";

    const storedUser = JSON.parse(saved);
    if (storedUser.email !== email) return "Email does not match.";

    saveUser(storedUser);
    return null;
  };

  const logout = () => {
    saveUser(null);
    navigate("/");
  };

  const requireAuth = (callback: () => void) => {
    if (user) callback();
    else navigate("/sign-in");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logout, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
