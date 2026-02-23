"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

function AuthGuardContent({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();
    const [processingToken, setProcessingToken] = useState(false);

    useEffect(() => {
        // Read token from hash fragment (e.g. /timeline#token=eyJhbG...)
        const hash = window.location.hash.substring(1);
        const tokenInHash = new URLSearchParams(hash).get('token');

        if (tokenInHash) {
            setProcessingToken(true);
            localStorage.setItem('auth_token', tokenInHash);
            // Remove token from URL
            window.history.replaceState({}, '', window.location.pathname);
            window.location.reload();
            return;
        }

        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if (processingToken || isLoading) {
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

export function AuthGuard({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        }>
            <AuthGuardContent>{children}</AuthGuardContent>
        </Suspense>
    );
}
