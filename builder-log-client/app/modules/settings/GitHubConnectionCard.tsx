"use client";

import { useState } from "react";
import {
    resyncGitHub,
    disconnectGitHub,
    toggleBuilderProfile,
    upgradeToPrivateAccess,
} from "@/app/lib/api/settings";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

function hasPrivateRepoAccess(scope?: string): boolean {
    if (!scope) return false;
    return scope.split(/[,\s]+/).includes("repo");
}

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
    const [isUpgrading, setIsUpgrading] = useState(false);

    const privateAccess = hasPrivateRepoAccess(oauthScope);

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

    const handleUpgrade = async () => {
        setIsUpgrading(true);
        try {
            await resyncGitHub();
            await upgradeToPrivateAccess();
        } catch (error) {
            console.error("Failed to start upgrade:", error);
            setIsUpgrading(false);
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
                    <svg className="w-12 h-12 text-muted-foreground mb-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-muted-foreground">GitHub is not connected</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                    {githubAvatarUrl ? (
                        <img src={githubAvatarUrl} alt={githubUsername || "GitHub user"} className="w-12 h-12 rounded-full" />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <svg className="w-6 h-6 text-foreground" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-semibold text-foreground">{githubUsername || "GitHub"}</h3>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-200 text-green-700 dark:bg-green-200 dark:text-green-700">
                                Connected
                            </span>
                        </div>
                        {connectedSince && (
                            <p className="text-sm text-muted-foreground">Connected since {formatDate(connectedSince)}</p>
                        )}
                    </div>
                </div>
                <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            </div>

            {/* ── Core settings ── */}
            <div className="border-t border-border pt-6 space-y-4">
                {/* Public Profile toggle */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">Public Profile</p>
                        <p className="text-xs text-muted-foreground">
                            Make your BuildLog profile publicly visible at /public/{githubUsername}
                        </p>
                    </div>
                    <button
                        onClick={handleToggleBuilderProfile}
                        disabled={isToggling}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${isBuilderProfile ? "bg-primary" : "bg-muted"}`}
                        role="switch"
                        aria-checked={isBuilderProfile}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isBuilderProfile ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                </div>

                {/* Re-sync — with confirmation */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <p className="text-sm text-foreground mb-1">Manually refresh your repository data and permissions.</p>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button
                                disabled={isResyncing}
                                className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                            >
                                <svg className={`w-4 h-4 ${isResyncing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                {isResyncing ? "Re-syncing..." : "Re-sync GitHub data"}
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Re-sync GitHub data?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will clear all cached timeline, insights, and contribution data for your account and re-fetch fresh data from GitHub. This may take a moment on your next page visit.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleResync}>
                                    Re-sync
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                {/* Disconnect — with confirmation */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <p className="text-sm text-foreground mb-1">Remove this account and stop tracking activity.</p>
                        <p className="text-xs text-muted-foreground">This will stop syncing your GitHub activity.</p>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button
                                disabled={isDisconnecting}
                                className="px-4 py-2 text-sm font-medium rounded-lg border border-destructive bg-card hover:bg-destructive/10 text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {isDisconnecting ? "Disconnecting..." : "Disconnect GitHub"}
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Disconnect GitHub?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will remove your encrypted access token from our servers and delete all cached activity data. Your account will remain but no new data will be synced. You can reconnect at any time.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDisconnect}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    Yes, disconnect
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            {/* ── Private Repository Access ── */}
            <div className="mt-6 rounded-lg border border-border overflow-hidden">
                <div className="px-4 py-3 bg-muted/40">
                    <p className="text-sm font-medium text-foreground">Private Repository Access</p>
                </div>
                {privateAccess ? (
                    <div className="px-4 py-4 flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <p className="text-sm text-muted-foreground">
                                Your timeline includes activity from all repositories, including private ones.
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 whitespace-nowrap shrink-0">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Private repos included
                        </span>
                    </div>
                ) : (
                    <div className="px-4 py-4 space-y-3">
                        <p className="text-sm text-muted-foreground">
                            Currently showing <span className="font-medium text-foreground">public activity only</span>.
                            Grant read-only access to private repositories to get a complete picture of your dev work.
                        </p>
                        <div className="flex items-start gap-2 p-3 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                            <svg className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-amber-700 dark:text-amber-300">
                                We only ever <span className="font-semibold">read</span> your repository data — we never write to, modify, or delete anything.
                            </p>
                        </div>

                        {/* Upgrade — with confirmation */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    disabled={isUpgrading}
                                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isUpgrading ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Redirecting to GitHub...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                            </svg>
                                            Include private repositories
                                        </>
                                    )}
                                </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Grant private repository access?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You'll be redirected to GitHub to approve the <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">repo</code> scope.
                                        This gives BuilderLog read-only access to your private repository activity.
                                        We never write to, modify, or delete anything in your repositories.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleUpgrade}>
                                        Continue to GitHub
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )}
            </div>
        </div>
    );
}
