"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";
import { TextEffect } from "@/components/ui/text-effect";

const showcaseItems = [
    {
        id: "timeline",
        title: "Detailed Activity Timeline",
        description: "See a chronological feed of every commit, review, and issue you touch. No noise, just the actual work that proves your impact.",
        imageLight: "/timeline-white.png",
        imageDark: "/timeline-dark.png",
    },
    {
        id: "insights",
        title: "Analytics & Insights",
        description: "Visualize your coding rhythm. Track consistency, peak productivity hours, and language distribution across all your repositories.",
        imageLight: "/insight-white.png",
        imageDark: "/insight-dark.png",
    },
    {
        id: "profile",
        title: "Shareable Public Profile",
        description: "Turn your scattered GitHub history into a beautiful, unified portfolio. Send one highly-credible link to recruiters or clients.",
        imageLight: "/profilePage-white.png",
        imageDark: "/profilePage-dark.png",
    },
];

export default function Showcase() {
    const [activeItem, setActiveItem] = useState(showcaseItems[0]);
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

    return (
        <section id="showcase" className="bg-background py-24 sm:py-32 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="text-center mb-16 lg:mb-24">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                        <TextEffect per="word" preset="blur" as="span" className="inline">Designed for </TextEffect>
                        <TextEffect per="word" preset="blur" as="span" delay={0.2} className="text-primary inline">Clarity</TextEffect>
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-[600px] mx-auto">
                        A developer-first interface that prioritizes signal over noise.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

                    {/* Left side: Selectors */}
                    <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-32 pr-0 lg:pr-8">
                        {showcaseItems.map((item) => {
                            const isActive = activeItem.id === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveItem(item)}
                                    className={cn(
                                        "relative text-left p-6 rounded-2xl transition-all duration-300 border cursor-pointer",
                                        isActive
                                            ? "bg-card border-border"
                                            : "border-transparent hover:bg-muted/50 hover:border-border/50"
                                    )}
                                >
                                    {/* Active Highlight Indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeShowcaseIndicator"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-r-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    <h3 className={cn(
                                        "text-xl font-bold transition-colors duration-300",
                                        isActive ? "text-foreground" : "text-muted-foreground"
                                    )}>
                                        {item.title}
                                    </h3>

                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-base text-muted-foreground leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right side: Image Display */}
                    <div className="lg:col-span-7 relative">
                        <div className="rounded-2xl border border-border bg-card p-2 sm:p-4 relative overflow-hidden aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11]">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={`${activeItem.id}-${isDark ? 'dark' : 'light'}`}
                                    src={isDark ? activeItem.imageDark : activeItem.imageLight}
                                    alt={activeItem.title}
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="w-full h-full object-contain object-top rounded-xl border border-border/50 bg-background/50"
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}