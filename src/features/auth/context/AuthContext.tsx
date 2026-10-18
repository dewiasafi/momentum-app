import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { authApi } from "../api/auth.api";
import type {
  AuthContextValue,
  LoginPayload,
  LoginResponseData,
  User,
} from "../types";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    return Boolean(localStorage.getItem("token"));
  });

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  const checkSession = useCallback(async (): Promise<boolean> => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      logout();
      return false;
    }

    try {
      const response = await authApi.getSession();
      const isActive = Boolean(response.data?.active);
      if (!isActive) {
        logout();
        return false;
      }
      return true;
    } catch {
      logout();
      return false;
    }
  }, [logout]);

  useEffect(() => {
    const initSession = async () => {
      const savedToken = localStorage.getItem("token");
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const sessionRes = await authApi.getSession();
        if (sessionRes.data?.active) {
          const profileRes = await authApi.getProfile();
          if (profileRes.data) {
            setUser(profileRes.data);
            localStorage.setItem("user", JSON.stringify(profileRes.data));
          }
        } else {
          logout();
        }
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, [logout]);

  useEffect(() => {
    if (!token) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkSession();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [token, checkSession]);

  const login = async (
    payloadOrEmail: LoginPayload | string,
    passwordArg?: string
  ): Promise<LoginResponseData> => {
    const payload: LoginPayload =
      typeof payloadOrEmail === "string"
        ? { email: payloadOrEmail, password: passwordArg || "" }
        : payloadOrEmail;

    const response = await authApi.login(payload);
    if (!response.data) {
      throw new Error(response.message || "Login gagal");
    }

    const { token: receivedToken, user: receivedUser } = response.data;
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("user", JSON.stringify(receivedUser));

    setToken(receivedToken);
    setUser(receivedUser);

    return response.data;
  };

  const refreshProfile = async (): Promise<User | null> => {
    try {
      const response = await authApi.getProfile();
      if (response.data) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      }
      return null;
    } catch {
      return null;
    }
  };

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshProfile,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  }
  return ctx;
};
