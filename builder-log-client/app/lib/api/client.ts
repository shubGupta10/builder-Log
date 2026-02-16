const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

type FetchOptions = RequestInit & {
    params?: Record<string, string | undefined>;
}

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options;

    const url = new URL(`${API_BASE_URL}${path}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.append(key, value);
            }
        });
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    const res = await fetch(url.toString(), {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        ...fetchOptions,
    })

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API request failed: ${res.status} ${res.statusText} - ${text}`);
    }
    return res.json();
}