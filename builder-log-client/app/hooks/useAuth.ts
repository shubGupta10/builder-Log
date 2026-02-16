"use client"

import { useEffect, useState } from "react"
import { AuthStatus } from "../lib/api/types"
import { logout } from "../lib/api/auth"
import { apiFetch } from "../lib/api/client"

export function useAuth() {
    const [status, setStatus] = useState<AuthStatus>("loading")

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await apiFetch('/user/me');
                setStatus("authenticated")
            } catch (error) {
                setStatus("unauthenticated")
            }
        }
        checkAuth();
    }, [])


    const handleLogout = async () => {
        await logout();
        setStatus("unauthenticated")
    }

    return {
        status,
        isAuthenticated: status === "authenticated",
        isLoading: status === "loading",
        logout: handleLogout,
    }
}