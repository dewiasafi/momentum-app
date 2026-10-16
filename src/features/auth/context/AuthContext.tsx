import { createContext, useContext, useState, type ReactNode } from "react";
import { MOCK_USERS } from "../data/mockUsers";
import type { AuthContextValue, AuthUser } from "../types";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Cek apakah user sudah login sebelumnya (simpan di sessionStorage)
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = sessionStorage.getItem("momentum_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string): Promise<AuthUser> => {
    // Simulasi network delay
    await new Promise((res) => setTimeout(res, 800));

    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      throw new Error("Email atau password salah.");
    }

    const authUser: AuthUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
    };

    sessionStorage.setItem("momentum_user", JSON.stringify(authUser));
    setUser(authUser);
    return authUser;
  };

  const logout = () => {
    sessionStorage.removeItem("momentum_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: Boolean(user), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook agar mudah dipakai di komponen
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  }
  return ctx;
};

