"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { TextEffect } from "@/components/ui/text-effect";
import { cn } from "@/app/lib/utils";
import { Variants } from "framer-motion";

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

const transitionVariants: { container?: Variants; item?: Variants } = {
    item: {
        hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
        visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { type: "spring", bounce: 0.3, duration: 1.5 } },
    },
};

export function HeroSection({
    badge,
    title,
    description,
    actions,
}: HeroProps) {
    return (
        <section className="relative w-full overflow-hidden">
            <div
                aria-hidden
                className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
            >
                <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)] dark:bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,15%,.08)_0,hsla(0,0%,45%,.02)_50%,hsla(0,0%,55%,0)_80%)]" />
                <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] dark:bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,15%,.06)_0,hsla(0,0%,55%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] dark:bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,15%,.04)_0,hsla(0,0%,55%,.02)_80%,transparent_100%)]" />
            </div>

            <div className="relative pt-12 md:pt-16 pb-16">
                <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />

                <div className="mx-auto max-w-7xl px-6 relative z-10">
                    <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                        <AnimatedGroup variants={transitionVariants}>
                            {badge && (
                                <Link
                                    href={badge.action.href}
                                    className="hover:bg-muted/80 bg-muted/40 group mx-auto flex w-fit items-center gap-4 rounded-full p-1 pl-4 transition-all duration-300"
                                >
                                    <span className="text-foreground text-sm flex gap-1 items-center">
                                        <span className="text-muted-foreground mr-1">{badge.text}</span> <span className="font-medium">{badge.action.text}</span>
                                    </span>
                                    <span className="dark:bg-white/10 block h-4 w-px bg-black/10"></span>

                                    <div className="bg-transparent group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3" />
                                            </span>
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-12 xl:text-[5.25rem] font-medium tracking-tight leading-[1.1]">
                                <TextEffect
                                    per="word"
                                    delay={0.2}
                                    variants={{
                                        container: {
                                            hidden: { opacity: 0 },
                                            visible: {
                                                opacity: 1,
                                                transition: { staggerChildren: 0.1 },
                                            },
                                        },
                                        item: {
                                            hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, type: "spring", bounce: 0.2 } },
                                        },
                                    }}
                                >
                                    A public log of your real development work
                                </TextEffect>
                            </h1>

                            <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                                {description}
                            </p>
                        </AnimatedGroup>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            } as any}
                            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
                        >
                            {actions.map((action, i) => (
                                <Button
                                    key={i}
                                    asChild
                                    size="lg"
                                    variant={action.variant as any}
                                    className={cn(
                                        "rounded-xl px-7 text-base h-12 border-0",
                                        action.variant === "outline" && "border border-border/50 bg-background"
                                    )}
                                >
                                    <Link href={action.href} className="flex gap-2 items-center">
                                        {action.icon && action.icon}
                                        <span className="text-nowrap">{action.text}</span>
                                    </Link>
                                </Button>
                            ))}
                        </AnimatedGroup>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1.25,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 10,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: "spring",
                                            bounce: 0.1,
                                            duration: 1,
                                        },
                                    },
                                },
                            }}
                        >
                            <p className="text-sm font-medium text-muted-foreground mt-8 text-center mx-auto opacity-70">
                                Read-only access. Open source. Free forever.
                            </p>
                        </AnimatedGroup>
                    </div>
                </div>

            </div>
        </section>
    );
}
