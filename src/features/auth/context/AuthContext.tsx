import {
  createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode,
} from "react";
import { AuthContextValue, LoginPayload, LoginResponseData, User } from "../types";
import { authApi } from "../api/auth.api";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sessionCheckInProgress = useRef(false);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  }, []);


  const checkSession = useCallback(async (): Promise<boolean> => {
    if (sessionCheckInProgress.current) {
      return false;
    }

    sessionCheckInProgress.current = true;

    try {
      const sessionResponse = await authApi.getSession();
      const session = sessionResponse.data;

      if (typeof session?.active !== "boolean") {
        return false;
      }
    
      if (!session.active) {
        setUser(null);
        return false;
      }

      try {
        const profileResponse = await authApi.getProfile();

        if (profileResponse.data) {
          setUser(profileResponse.data);
          return true;
        }
      } catch {
        
        // Pertahankan user yang ada jika request profil gagal.
      }

      return false;
    } catch {
      return false;
    } finally {
      sessionCheckInProgress.current = false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeSession = async () => {
      try {
        await checkSession();
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    void initializeSession();

    return () => {
      mounted = false;
    };
  }, [checkSession]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void checkSession();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [checkSession]);

  const login = async (
    payloadOrEmail: LoginPayload | string,
    passwordArg?: string,
  ): Promise<LoginResponseData> => {
    const payload: LoginPayload =
      typeof payloadOrEmail === "string"
        ? {
            email: payloadOrEmail,
            password: passwordArg ?? "",
          }
        : payloadOrEmail;

    const response = await authApi.login(payload);
    if (!response.data?.user) {
      throw new Error(response.message || "Login gagal.");
    }
    setUser(response.data.user);

    return response.data;
  };

  const refreshProfile = async (): Promise<User | null> => {
    try {
      const response = await authApi.getProfile();
      if (response.data) {
        setUser(response.data);
        return response.data;
      }
      return null;
    } catch {
      return null;
    }
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token: null,
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
  )
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  }

  return context
}