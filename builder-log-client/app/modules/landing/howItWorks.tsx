"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";

const steps = [
    {
        number: "1",
        title: "Connect GitHub",
        description: "Authorize BuilderLog securely using OAuth to read your public repository data.",
    },
    {
        number: "2",
        title: "We Analyze",
        description: "Our system processes your commit history, pull requests, and public issues seamlessly.",
    },
    {
        number: "3",
        title: "Get Your Log",
        description: "Instantly access your personalized timeline, insights, and your shareable profile.",
    },
];

const bullets = [
    "Clean, distraction-free design",
    "Read-only and secure by default",
    "Toggle public or private visibility anytime",
];

export default function HowItWorks() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

    return (
        <>
            {/* ── STEPS ─────────────────────────────────────── */}
            <section className="bg-muted/30 py-24 sm:py-32 relative overflow-hidden flex flex-col justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.03),transparent_70%)]" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />

                <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
                    <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-20 lg:mb-28">
                        <TextEffect per="word" preset="blur" as="span" className="inline">How </TextEffect>
                        <TextEffect per="word" preset="blur" as="span" delay={0.1} className="text-primary inline">BuilderLog </TextEffect>
                        <TextEffect per="word" preset="blur" as="span" delay={0.2} className="inline">works</TextEffect>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6 relative">

                        {/* Animated Connector line — desktop only */}
                        <div className="hidden sm:block absolute top-[28px] left-[calc(16.666%+28px)] right-[calc(16.666%+28px)] h-[2px] bg-border z-0 overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                whileInView={{ x: "100%" }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                                className="w-full h-full bg-primary"
                            />
                        </div>

                        {steps.map(({ number, title, description }, i) => (
                            <motion.div
                                key={number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: i * 0.2 }}
                                className="flex flex-col items-center text-center gap-6 relative z-10"
                            >
                                {/* Number bubble */}
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-background border border-border text-lg font-bold text-foreground transition-colors duration-300 hover:border-muted-foreground group">
                                    <span className="group-hover:text-primary transition-colors">{number}</span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
                                    <p className="text-base leading-relaxed text-muted-foreground max-w-[260px] mx-auto">
                                        {description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ── LIVING RESUME ─────────────────────────────── */}
            <section className="bg-background py-24 sm:py-32 relative overflow-hidden flex items-center">
                {/* Background Glow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="mx-auto max-w-7xl px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Left — text */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col gap-6"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                                <TextEffect per="word" preset="blur" as="span" className="inline">Your work, as a </TextEffect>
                                <TextEffect per="word" preset="blur" as="span" delay={0.2} className="text-primary inline">living resume.</TextEffect>
                            </h2>
                            <p className="text-xl sm:text-2xl font-medium text-foreground/80 mt-2">
                                Showcase your capabilities through actual output, not just buzzwords.
                            </p>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                BuilderLog creates a beautifully formatted, read-only public profile that updates automatically as you push code. It is designed to be highly-sharable and perfectly tailored for recruiters, clients, or collaborators.
                            </p>

                            <motion.ul
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={{
                                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
                                    hidden: {}
                                }}
                                className="flex flex-col gap-5 mt-4"
                            >
                                {bullets.map((item) => (
                                    <motion.li
                                        key={item}
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                        className="flex items-center gap-4 text-lg text-foreground font-medium"
                                    >
                                        <div className="flex items-center justify-center p-1 rounded-full bg-primary/10">
                                            <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                                        </div>
                                        {item}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>

                        {/* Right — Clean Glass Mockup */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative group w-full"
                        >
                            {/* Decorative backing plate */}
                            <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="rounded-2xl border border-border bg-card p-3 sm:p-4 relative overflow-hidden aspect-[4/3] w-full transition-transform duration-500 hover:scale-[1.02]">
                                <div className="w-full h-full overflow-hidden rounded-xl border border-border/50 bg-background">
                                    {mounted && (
                                        <img
                                            src={isDark ? "/profilePage-dark.png" : "/profilePage-white.png"}
                                            alt="Developer profile preview"
                                            className="h-full w-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                    )}
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </>
    );
}