import { GitCommitHorizontal, BarChart2, FolderGit2, UserSquare2, Settings, Activity } from "lucide-react";
import { AuroraBackground, BentoGrid, BentoGridItem } from "@/components/aurora-bento-grid";
import { TextEffect } from "@/components/ui/text-effect";

const features = [
    {
        icon: GitCommitHorizontal,
        title: "Timeline",
        description:
            "A chronological, distraction-free view of your commits, pull requests, and real coding sessions.",
        className: "md:col-span-4 border border-border bg-card transition-colors duration-300",
        gradientFrom: "from-muted",
        gradientTo: "to-background",
    },
    {
        icon: BarChart2,
        title: "Insights",
        description:
            "Understand your consistency, momentum, and focus using clear visual breakdowns of your activity.",
        className: "md:col-span-2 border border-border bg-card transition-colors duration-300",
        gradientFrom: "from-muted",
        gradientTo: "to-background",
    },
    {
        icon: Activity,
        title: "Contributions",
        description:
            "Track your contribution streaks, coding patterns, and activity trends to understand your development rhythm.",
        className: "md:col-span-2 border border-border bg-card transition-colors duration-300",
        gradientFrom: "from-muted",
        gradientTo: "to-background",
    },
    {
        icon: UserSquare2,
        title: "Public Profile",
        description:
            "A clean, shareable proof-of-work page that acts like a living resume, powered by real data.",
        className: "md:col-span-2 border border-border bg-card transition-colors duration-300",
        gradientFrom: "from-muted",
        gradientTo: "to-background",
    },
    {
        icon: Settings,
        title: "Privacy & Controls",
        description:
            "Decide what stays private, what goes public, and when to disconnect GitHub entirely.",
        className: "md:col-span-2 border border-border bg-card transition-colors duration-300",
        gradientFrom: "from-muted",
        gradientTo: "to-background",
    },
];

export default function Features() {
    return (
        <section className="relative overflow-hidden w-full bg-background font-sans antialiased py-24 sm:py-32">
            <AuroraBackground />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="text-center mb-16 lg:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                        <TextEffect per="word" preset="blur" as="span" className="inline">Everything you build, </TextEffect>
                        <TextEffect per="word" preset="blur" as="span" delay={0.3} className="text-primary inline">neatly organized</TextEffect>
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-[600px] mx-auto">
                        We automatically structure your GitHub activity into a comprehensive suite of developer insights.
                    </p>
                </div>

                <BentoGrid>
                    {features.map(({ icon: Icon, title, description, className, gradientFrom, gradientTo }) => (
                        <BentoGridItem
                            key={title}
                            className={className}
                            gradientFrom={gradientFrom}
                            gradientTo={gradientTo}
                        >
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-background border border-border transition-colors duration-300">
                                        <Icon className="h-5 w-5 text-foreground transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2.5">
                                        {title}
                                    </h3>
                                    <p className="text-base leading-relaxed text-muted-foreground">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </BentoGridItem>
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}