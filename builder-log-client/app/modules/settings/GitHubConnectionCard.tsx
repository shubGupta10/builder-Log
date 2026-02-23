"use client";

import { useState } from "react";
import { resyncGitHub, disconnectGitHub, toggleBuilderProfile } from "@/app/lib/api/settings";

type GitHubConnectionCardProps = {
    connected: boolean;
    githubUsername?: string;
    githubAvatarUrl?: string;
    connectedSince?: string;
    oauthScope?: string;
    isBuilderProfile?: boolean;
    onResync?: () => void;
    onDisconnect?: () => void;
};

export function GitHubConnectionCard({
    connected,
    githubUsername,
    githubAvatarUrl,
    connectedSince,
    oauthScope,
    isBuilderProfile: initialIsBuilderProfile,
    onResync,
    onDisconnect,
}: GitHubConnectionCardProps) {
    const [isResyncing, setIsResyncing] = useState(false);
    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const [isBuilderProfile, setIsBuilderProfile] = useState(initialIsBuilderProfile ?? false);
    const [isToggling, setIsToggling] = useState(false);

    const handleResync = async () => {
        setIsResyncing(true);
        try {
            await resyncGitHub();
            onResync?.();
        } catch (error) {
            console.error("Failed to resync GitHub:", error);
        } finally {
            setIsResyncing(false);
        }
    };

    const handleDisconnect = async () => {
        setIsDisconnecting(true);
        try {
            await disconnectGitHub();
            onDisconnect?.();
        } catch (error) {
            console.error("Failed to disconnect GitHub:", error);
        } finally {
            setIsDisconnecting(false);
        }
    };

    const handleToggleBuilderProfile = async () => {
        setIsToggling(true);
        try {
            const newValue = !isBuilderProfile;
            const result = await toggleBuilderProfile(newValue);
            setIsBuilderProfile(result.isBuilderProfile);
        } catch (error) {
            console.error("Failed to toggle builder profile:", error);
        } finally {
            setIsToggling(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (!connected) {
        return (
            <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <svg
                        className="w-12 h-12 text-muted-foreground mb-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <p className="text-sm text-muted-foreground">
                        GitHub is not connected
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                    {githubAvatarUrl ? (
                        <img
                            src={githubAvatarUrl}
                            alt={githubUsername || "GitHub user"}
                            className="w-12 h-12 rounded-full"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-foreground"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-semibold text-foreground">
                                {githubUsername || "GitHub"}
                            </h3>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-200 text-green-700 dark:bg-green-200 dark:text-green-700">
                                Connected
                            </span>
                        </div>
                        {connectedSince && (
                            <p className="text-sm text-muted-foreground mb-1">
                                Connected since {formatDate(connectedSince)}
                            </p>
                        )}
                        {oauthScope && (
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    OAuth scope: <span className="font-mono">{oauthScope}</span>
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    We request repo access to read your private repo activity. We never write or modify anything.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <svg
                    className="w-5 h-5 text-muted-foreground"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            <div className="border-t border-border pt-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">
                            Public Profile
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Make your BuildLog profile publicly visible at /public/{githubUsername}
                        </p>
                    </div>
                    <button
                        onClick={handleToggleBuilderProfile}
                        disabled={isToggling}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${isBuilderProfile ? "bg-primary" : "bg-muted"
                            }`}
                        role="switch"
                        aria-checked={isBuilderProfile}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isBuilderProfile ? "translate-x-6" : "translate-x-1"
                                }`}
                        />
                    </button>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <p className="text-sm text-foreground mb-1">
                            Manually refresh your repository data and permissions.
                        </p>
                    </div>
                    <button
                        onClick={handleResync}
                        disabled={isResyncing}
                        className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                    >
                        <svg
                            className={`w-4 h-4 ${isResyncing ? "animate-spin" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        {isResyncing ? "Re-syncing..." : "Re-sync GitHub data"}
                    </button>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <p className="text-sm text-foreground mb-1">
                            Remove this account and stop tracking activity.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            This will stop syncing your GitHub activity.
                        </p>
                    </div>
                    <button
                        onClick={handleDisconnect}
                        disabled={isDisconnecting}
                        className="px-4 py-2 text-sm font-medium rounded-lg border border-destructive bg-card hover:bg-destructive/10 text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        {isDisconnecting ? "Disconnecting..." : "Disconnect GitHub"}
                    </button>
                </div>
            </div>
        </div>
    );
}
