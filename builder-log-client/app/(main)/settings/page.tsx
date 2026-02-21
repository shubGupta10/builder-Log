"use client";

import { useEffect, useState } from "react";
import { getGitHubStatus } from "@/app/lib/api/settings";
import type { GitHubStatus } from "@/app/lib/api/types";
import { GitHubConnectionCard } from "@/app/modules/settings/GitHubConnectionCard";
import { logout } from "@/app/lib/api/auth";
import { PageShell } from "@/app/components/layout/PageShell";

export default function SettingsPage() {
    const [status, setStatus] = useState<GitHubStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadStatus = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getGitHubStatus();
            setStatus(res);
        } catch (err: any) {
            if (err.status === 401) {
                setError("You are not authenticated");
            } else {
                setError("Failed to load GitHub status");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStatus();
    }, []);

    const handleResync = () => {
        loadStatus();
    };

    const handleDisconnect = async () => {
        await logout();
        window.location.href = "/login";
    };

    return (
        <PageShell>
            {loading && (
                <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
                    <div className="animate-pulse">Loading settings...</div>
                </div>
            )}

            {error && (
                <div className="flex items-center justify-center h-48 text-destructive text-sm">
                    {error}
                </div>
            )}

            {!loading && !error && status && (
                <GitHubConnectionCard
                    connected={status.stats.connected}
                    githubUsername={status.stats.githubUsername}
                    githubAvatarUrl={status.stats.githubAvatarUrl}
                    connectedSince={status.stats.connectedSince}
                    oauthScope={status.stats.oauthScope}
                    isBuilderProfile={status.stats.isBuilderProfile}
                    onResync={handleResync}
                    onDisconnect={handleDisconnect}
                />
            )}
        </PageShell>
    );
}