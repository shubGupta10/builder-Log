"use client";

import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/app/lib/utils";

interface HeroAction {
    text: string;
    href: string;
    icon?: React.ReactNode;
    variant?: "default" | "secondary" | "outline" | "ghost" | "link";
}

interface HeroProps {
    badge?: {
        text: string;
        action: {
            text: string;
            href: string;
        };
    };
    title: string;
    description: string;
    actions: HeroAction[];
}

export function HeroSection({
    badge,
    title,
    description,
    actions,
}: HeroProps) {
    return (
        <section
            className={cn(
                "relative bg-background text-foreground",
                "min-h-[calc(100vh-73px)] w-full flex items-center px-4 overflow-hidden"
            )}
        >
            {/* Subtle background glow for depth */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-12">
                <div className="flex flex-col items-center gap-6 text-center sm:gap-8 w-full">
                    {/* Badge */}
                    {badge && (
                        <div className="animate-appear">
                            <Badge variant="outline" className="gap-2 rounded-full px-4 py-1.5 shadow-sm text-sm border-border/60 bg-background/50 backdrop-blur-sm">
                                <span className="text-muted-foreground">{badge.text}</span>
                                <a href={badge.action.href} className="flex items-center gap-1 hover:underline text-foreground">
                                    {badge.action.text}
                                    <ArrowRightIcon className="h-3.5 w-3.5" />
                                </a>
                            </Badge>
                        </div>
                    )}

                    {/* Title */}
                    <div className="relative z-10 w-full flex justify-center animate-appear">
                        <h1 className="inline-block bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] sm:leading-[1.1] md:leading-[1.1] lg:leading-[1.1]">
                            A public log of your<br className="hidden sm:block" /> real development work
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl font-medium text-muted-foreground max-w-[600px] animate-appear opacity-0 delay-100 leading-relaxed">
                        {description}
                    </p>

                    {/* Actions */}
                    <div className="relative z-10 flex flex-col items-center gap-4 animate-appear opacity-0 delay-300 mt-2">
                        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                            {actions.map((action, index) => (
                                <Button
                                    key={index}
                                    variant={action.variant as any}
                                    size="lg"
                                    className={cn("h-12 px-8 text-base", action.variant === "default" && "shadow-sm", action.variant === "outline" && "border border-border/50 shadow-sm bg-background")}
                                    asChild
                                >
                                    <a href={action.href} className="flex items-center gap-2">
                                        {action.icon}
                                        {action.text}
                                    </a>
                                </Button>
                            ))}
                        </div>

                        {/* Trust line */}
                        <p className="text-sm font-medium text-muted-foreground mt-2">
                            Read-only access. Open source. Free forever.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
