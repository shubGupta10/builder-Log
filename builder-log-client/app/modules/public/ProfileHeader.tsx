import { PublicProfile, PublicSummary } from "@/app/lib/api/types";
import { Github, TrendingUp, TrendingDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProfileHeaderProps {
    profile: PublicProfile;
    summary: PublicSummary;
}

const momentumConfig = {
    up: {
        label: "Up",
        icon: TrendingUp,
        color: "text-[#37ca6d]",
    },
    down: {
        label: "Down",
        icon: TrendingDown,
        color: "text-muted-foreground",
    },
    stable: {
        label: "Stable",
        icon: TrendingUp,
        color: "text-muted-foreground",
    },
};

export function ProfileHeader({ profile, summary }: ProfileHeaderProps) {
    const momentum = momentumConfig[summary.momentum];
    const MomentumIcon = momentum.icon;

    return (
        <div className="mb-8">
            {/* Top section: Avatar + Name + Bio */}
            <div className="flex items-start gap-6 mb-6">
                <img
                    src={profile.avatarUrl}
                    alt={profile.username}
                    className="w-24 h-24 rounded-full border-2 border-border"
                />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        {profile.displayName || profile.username}
                    </h1>
                    {profile.bio && (
                        <p className="text-base text-muted-foreground mb-3">
                            {profile.bio}
                        </p>
                    )}
                    <div className="flex items-center gap-4 text-sm">
                        <a
                            href={profile.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                        >
                            <Github size={16} />
                            github.com/{profile.username}
                        </a>
                        <span className="text-muted-foreground">
                            Joined {formatDistanceToNow(new Date(profile.joinedAt), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 mt-8 border-t border-border">
                <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">
                        {summary.activeDays}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Days</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">
                        {summary.currentStreak > 0 ? summary.currentStreak : summary.lastActiveStreak} days
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {summary.currentStreak > 0 ? "Current Streak" : "Last Streak"}
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">
                        {summary.totalProjects}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Projects</div>
                </div>
                <div className="text-center">
                    <div className={`text-3xl font-bold mb-1 flex items-center justify-center gap-2 ${momentum.color}`}>
                        {momentum.label}
                        <MomentumIcon size={24} />
                    </div>
                    <div className="text-sm text-muted-foreground">Momentum</div>
                </div>
            </div>
        </div>
    );
}
