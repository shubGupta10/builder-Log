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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    window.location.href = '/login';
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
