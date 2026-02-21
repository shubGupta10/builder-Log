"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPublicProfile } from "@/app/lib/api/public";
import { PublicProfileData } from "@/app/lib/api/types";
import { ProfileHeader } from "@/app/modules/public/ProfileHeader";
import { RecentActivity } from "@/app/modules/public/RecentActivity";
import { KeyProjects } from "@/app/modules/public/KeyProjects";
import { ConsistencyGrid } from "@/app/modules/public/ConsistencyGrid";
import { ArrowLeft } from "lucide-react";

export default function PublicProfilePage() {
    const params = useParams();
    const router = useRouter();
    const username = params.username as string;
    const [profile, setProfile] = useState<PublicProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasAuthToken, setHasAuthToken] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('auth_token');
            setHasAuthToken(!!token);
        }

        const loadProfile = async () => {
            if (!username) return;

            setLoading(true);
            setError(null);
            try {
                const res = await getPublicProfile(username);
                setProfile(res.data);
            } catch (err: any) {
                const errorMessage = err.message || "Failed to load profile";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading profile...</div>
            </div>
        );
    }

    if (error || !profile) {
        const isProfileDisabled = error?.toLowerCase().includes("not public") || error?.toLowerCase().includes("disabled");
        const isUserNotFound = error?.toLowerCase().includes("not found");

        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center max-w-md px-6">
                    {isProfileDisabled ? (
                        <>
                            <div className="mb-4">
                                <svg
                                    className="w-16 h-16 mx-auto text-muted-foreground"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-foreground mb-2">Profile Not Available</h1>
                            <p className="text-muted-foreground">
                                This user has disabled their public profile. The page is private and cannot be accessed.
                            </p>
                        </>
                    ) : isUserNotFound ? (
                        <>
                            <h1 className="text-2xl font-bold text-foreground mb-2">User Not Found</h1>
                            <p className="text-muted-foreground">
                                The user "{username}" does not exist or hasn't created a BuildLog account yet.
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold text-foreground mb-2">Profile Not Found</h1>
                            <p className="text-muted-foreground">
                                {error || "Unable to load this profile. Please try again later."}
                            </p>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Go Back Button */}
                {hasAuthToken && (
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-sm font-medium">Go back</span>
                    </button>
                )}

                {/* Profile Header */}
                <ProfileHeader profile={profile.profile} summary={profile.summary} />

                {/* Vertical Stack Layout */}
                <div className="space-y-6 mt-6">
                   

                    {/* Key Projects */}
                    <KeyProjects projects={profile.projects} />

                {/* Consistency Grid */}
                    <ConsistencyGrid consistency={profile.consistencyStrip} />

                     {/* Recent Activity */}
                    <RecentActivity activities={profile.recentActivity} />
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground">
                        Powered by{" "}
                        <span className="font-semibold text-foreground">BuildLog</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Data updated {new Date(profile.meta.generatedAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
