// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentSession, logoutUser, loginUser } from "../api/session";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const session = await getCurrentSession();
      setUser(session ? session.user : null);
    } catch (err) {
      console.error("Failed to load session:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAuth = async (url, body) => {
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      body, 
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(result.message || "Authentication failed");
    }
    await refresh(); 
    return result;
  };

  const signIn = async (username, password) => {
    const session = await loginUser(username, password);
    setUser(session.loggedIn ? session.user : null);
  };

  const signOut = async () => {
    await logoutUser();
    setUser(null);
    localStorage.clear();
    sessionStorage.clear();
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signOut,
        refresh,
        submitAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
