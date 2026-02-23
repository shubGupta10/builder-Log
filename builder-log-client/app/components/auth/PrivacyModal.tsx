"use client";

import { X } from "lucide-react";
import Link from "next/link";

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-foreground">Privacy & Data</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <section>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                            What We Collect
                        </h3>
                        <p className="text-muted-foreground mb-2">
                            We access the following read-only data from your GitHub account:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                            <li>Repository names and commit history</li>
                            <li>Commit timestamps and messages</li>
                            <li>Your GitHub username and avatar</li>
                            <li>Public activity timeline</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                            How We Use It
                        </h3>
                        <p className="text-muted-foreground mb-2">
                            Your data is used exclusively to:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                            <li>Generate work session timelines from your commits</li>
                            <li>Visualize your development activity and momentum</li>
                            <li>Organize commits into meaningful project sessions</li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-3 italic">
                            We do not use analytics, tracking, or sell your data. This is purely for your own work reflection.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            <strong>Security:</strong> Your GitHub access token is stored encrypted in our database.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                            Your Control
                        </h3>
                        <p className="text-muted-foreground mb-2">
                            You have full control over your data:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                            <li>
                                <strong>Disconnect from our app:</strong> Go to{" "}
                                <Link href="/settings" className="text-primary hover:underline">
                                    Settings
                                </Link>{" "}
                                and click "Disconnect GitHub" to remove your encrypted token from our database and delete all cached data
                            </li>
                            <li>
                                <strong>Revoke OAuth access:</strong> Visit{" "}
                                <a
                                    href="https://github.com/settings/applications"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    GitHub Settings → Applications
                                </a>{" "}
                                to revoke BuilderLog's access token entirely
                            </li>
                            <li>
                                <strong>Read-only access:</strong> We never write to your repositories or modify any data
                            </li>
                            <li>
                                <strong>Data deletion:</strong> Disconnecting removes your encrypted token and all cached data from our servers
                            </li>
                        </ul>
                    </section>

                    <section className="bg-muted/50 rounded-lg p-4 border border-border">
                        <h3 className="text-sm font-semibold text-foreground mb-2">
                            OAuth Permissions
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            We request <span className="font-mono text-xs">repo</span> access to read your private repository activity.
                            This is required by GitHub to access private repo data — there is no read-only scope available.
                            We never write to, modify, or delete anything in your repositories.
                        </p>
                    </section>
                </div>

                <div className="sticky bottom-0 bg-card border-t border-border p-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-2.5 px-4 rounded-lg font-medium cursor-pointer"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}
