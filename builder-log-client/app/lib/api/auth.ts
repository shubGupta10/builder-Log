import { apiFetch } from './client';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function loginWithGitHub() {
  try {
    const data = await apiFetch<{ redirectUrl: string }>('/auth/github');
    window.location.href = data.redirectUrl;
  } catch (error) {
    console.error('Login failed:', error);
  }
}

export async function logout() {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
