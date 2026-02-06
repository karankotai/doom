"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import {
  api,
  setAccessToken,
  clearAccessToken,
  setRefreshCallback,
} from "../api";
import type {
  User,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Refresh token 2 minutes before expiry
const REFRESH_BUFFER_MS = 24 * 60 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isAuthenticated = !!user && !!accessToken;

  // Clear any scheduled refresh
  const clearRefreshTimeout = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
  }, []);

  // Schedule token refresh before expiry
  const scheduleRefresh = useCallback(
    (tokenExpiresAt: number) => {
      clearRefreshTimeout();

      const now = Date.now();
      const expiresAtMs = tokenExpiresAt * 1000;
      const timeUntilRefresh = expiresAtMs - now - REFRESH_BUFFER_MS;

      if (timeUntilRefresh > 0) {
        refreshTimeoutRef.current = setTimeout(async () => {
          try {
            const response = await api.refreshToken();
            setToken(response.accessToken);
            setExpiresAt(response.expiresAt);
            setAccessToken(response.accessToken, response.expiresAt);
            scheduleRefresh(response.expiresAt);
          } catch {
            // Refresh failed - user will be logged out on next API call
            setUser(null);
            setToken(null);
            setExpiresAt(null);
            clearAccessToken();
          }
        }, timeUntilRefresh);
      }
    },
    [clearRefreshTimeout]
  );

  // Refresh handler for API client
  const handleRefresh = useCallback(async (): Promise<boolean> => {
    try {
      const response = await api.refreshToken();
      setToken(response.accessToken);
      setExpiresAt(response.expiresAt);
      setAccessToken(response.accessToken, response.expiresAt);
      scheduleRefresh(response.expiresAt);
      return true;
    } catch {
      setUser(null);
      setToken(null);
      setExpiresAt(null);
      clearAccessToken();
      return false;
    }
  }, [scheduleRefresh]);

  // Set refresh callback for API client
  useEffect(() => {
    setRefreshCallback(handleRefresh);
  }, [handleRefresh]);

  // Try to restore session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Try to refresh token (will use httpOnly cookie)
        const response = await api.refreshToken();
        setToken(response.accessToken);
        setExpiresAt(response.expiresAt);
        setAccessToken(response.accessToken, response.expiresAt);
        scheduleRefresh(response.expiresAt);

        // Get user info
        const { user } = await api.getCurrentUser();
        setUser(user);
      } catch {
        // No valid session - user needs to log in
        clearAccessToken();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      clearRefreshTimeout();
    };
  }, [scheduleRefresh, clearRefreshTimeout]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const response = await api.login(credentials);
      setUser(response.user);
      setToken(response.accessToken);
      setExpiresAt(response.expiresAt);
      setAccessToken(response.accessToken, response.expiresAt);
      scheduleRefresh(response.expiresAt);
    },
    [scheduleRefresh]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      const response = await api.register(credentials);
      setUser(response.user);
      setToken(response.accessToken);
      setExpiresAt(response.expiresAt);
      setAccessToken(response.accessToken, response.expiresAt);
      scheduleRefresh(response.expiresAt);
    },
    [scheduleRefresh]
  );

  const logout = useCallback(async () => {
    clearRefreshTimeout();
    try {
      await api.logout();
    } catch {
      // Ignore logout errors
    }
    setUser(null);
    setToken(null);
    setExpiresAt(null);
    clearAccessToken();
  }, [clearRefreshTimeout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        expiresAt,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
