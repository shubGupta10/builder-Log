import { GitCommitHorizontal, BarChart2, FolderGit2, UserSquare2, Settings, Shield } from "lucide-react";

const features = [
    {
        icon: GitCommitHorizontal,
        title: "Timeline",
        description:
            "A chronological, distraction-free view of your commits, pull requests, and real coding sessions.",
    },
    {
        icon: BarChart2,
        title: "Insights",
        description:
            "Understand your consistency, momentum, and focus using clear visual breakdowns of your activity.",
    },
    {
        icon: FolderGit2,
        title: "Projects",
        description:
            "See which projects are active, stalled, or shipped based on real GitHub activity, not guesswork.",
    },
    {
        icon: UserSquare2,
        title: "Public Profile",
        description:
            "A clean, shareable proof-of-work page that acts like a living resume, powered by real data.",
    },
    {
        icon: Settings,
        title: "Privacy & Controls",
        description:
            "Decide what stays private, what goes public, and when to disconnect GitHub entirely.",
    },
    {
        icon: Shield,
        title: "Data Transparency",
        description:
            "Your data comes only from GitHub. No tracking, no hidden analytics, no selling your activity.",
    },
];

export default function Features() {
    return (
        <section className="bg-muted py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-6">

                <div className="text-center mb-16 lg:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                        Everything you build, neatly organized
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-[600px] mx-auto">
                        We automatically structure your GitHub activity into a comprehensive suite of developer insights.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="group flex flex-col gap-6 rounded-xl border border-border bg-card p-7 shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:shadow-md hover:border-ring cursor-default"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted border border-border">
                                <Icon className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-card-foreground mb-2.5">
                                    {title}
                                </h3>
                                <p className="text-base leading-relaxed text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}