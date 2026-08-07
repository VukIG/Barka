import { API_URL } from "../config/api";

export type SessionUser = {
  id: number;
  username: string;
  email: string;
};

export type SessionResponse = {
  loggedIn: boolean;
  user: SessionUser | null;
};

export const getCurrentSession = async (): Promise<SessionResponse> => {
  const response = await fetch(`${API_URL}/users/me`, {
    credentials: "include",
  });

  return response.json();
};

export const logoutUser = async (): Promise<void> => {
  await fetch(`${API_URL}/users/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const loginUser = async (
  username: string,
  password: string
): Promise<SessionResponse> => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Login failed");
  }
  return getCurrentSession();
};