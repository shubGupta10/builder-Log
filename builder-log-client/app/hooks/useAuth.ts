"use client"

import { useEffect, useState } from "react"
import { AuthStatus } from "../lib/api/types"
import { logout } from "../lib/api/auth"

export function useAuth() {
    const [status, setStatus] = useState<AuthStatus>("loading")

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`, {
                    credentials: "include",
                })

                if (!res.ok) {
                    throw new Error("Not authenticated")
                }
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