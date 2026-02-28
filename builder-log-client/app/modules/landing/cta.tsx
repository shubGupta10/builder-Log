"use client";

import Link from "next/link";
import { Github, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";

export default function CTA() {
    return (
        <section className="relative py-32 sm:py-40 bg-background overflow-hidden flex justify-center items-center">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.03)_0%,transparent_70%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-[100%] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative rounded-3xl sm:rounded-[3rem] border border-border bg-card/40 backdrop-blur-3xl p-10 sm:p-20 overflow-hidden flex flex-col items-center text-center"
                >
                    {/* Inner glowing stroke */}
                    <div className="absolute inset-0 rounded-3xl sm:rounded-[3rem] shadow-[0_0_40px_rgba(255,255,255,0.02)_inset] pointer-events-none" />

                    {/* Content */}
                    <div className="flex justify-center mb-8">
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Github className="h-8 w-8 text-primary" />
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl leading-[1.1] mb-2">
                        <TextEffect per="word" preset="blur" as="span" className="inline">Ready to document your </TextEffect>
                        <span className="text-primary relative inline-block">
                            <TextEffect per="word" preset="blur" as="span" delay={0.3} className="inline">journey</TextEffect>
                            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/40 rounded-full" />
                        </span>
                        <TextEffect per="word" preset="blur" as="span" delay={0.4} className="inline">?</TextEffect>
                    </h2>

                    <p className="mt-6 text-xl text-muted-foreground max-w-xl mx-auto mb-10">
                        Join developers using BuilderLog to automatically turn their messy Git history into a pristine, shareable proof-of-work.
                    </p>

                    <Link
                        href="/login"
                        className="group relative inline-flex h-14 items-center justify-center gap-3 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(var(--primary),0.4)] hover:shadow-[0_0_60px_rgba(var(--primary),0.6)]"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        <span className="relative z-10 flex items-center gap-2">
                            <Github className="h-5 w-5" />
                            Start Building Now
                            <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <p className="mt-8 text-sm text-muted-foreground/80">
                        Free forever for open-source contributions. <br className="sm:hidden" /> No credit card required.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}