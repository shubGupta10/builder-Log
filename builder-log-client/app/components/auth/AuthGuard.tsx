"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isAuthenticated, isLoading } = useAuth();
    
    // Check if token is in URL (OAuth callback)
    const tokenInURL = searchParams.get('token');

    useEffect(() => {
        // If token is in URL, extract it first before checking auth
        if (tokenInURL) {
            localStorage.setItem('auth_token', tokenInURL);
            // Remove token from URL for security
            const url = new URL(window.location.href);
            url.searchParams.delete('token');
            window.history.replaceState({}, '', url.pathname);
            // Refresh the page to re-trigger auth check with new token
            window.location.reload();
            return;
        }

        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router, tokenInURL]);

    if (tokenInURL || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
