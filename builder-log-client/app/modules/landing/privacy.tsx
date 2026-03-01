"use client";

import { Shield, Lock, EyeOff, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";

const items = [
    {
        icon: Shield,
        title: "GitHub OAuth Authentication",
        description: "We use official GitHub OAuth flows. No passwords are ever stored.",
    },
    {
        icon: Lock,
        title: "Private Access is Opt-In",
        description: "By default we only read your public activity. You can optionally grant private repo access from Settings — we never write or modify anything.",
    },
    {
        icon: EyeOff,
        title: "Public Profile is Optional",
        description: "You have full control. Keep your log private or share it with the world.",
    },
    {
        icon: Trash2,
        title: "One-Click Deletion",
        description: "Disable sharing and wipe your data from our servers instantly at any time.",
    },
];

export default function Privacy() {
    return (
        <section className="bg-background py-24 sm:py-32 relative overflow-hidden">
            {/* Subtle bottom glow */}
            <div className="absolute bottom-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary),0.03),transparent_60%)] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                        <TextEffect per="word" preset="blur" as="span" className="text-primary inline">Privacy </TextEffect>
                        <TextEffect per="word" preset="blur" as="span" delay={0.1} className="inline">& Control</TextEffect>
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-[600px] mx-auto">
                        We believe your data belongs to you. BuilderLog is built with trust from the ground up.
                    </p>
                </motion.div>

                {/* 2x2 Bento Cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                        hidden: {}
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                    {items.map(({ icon: Icon, title, description }) => (
                        <motion.div
                            key={title}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="flex flex-col gap-4 p-8 rounded-3xl border border-border bg-card hover:bg-muted/50 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                                <Icon className="h-6 w-6" strokeWidth={2} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {title}
                                </h3>
                                <p className="text-base leading-relaxed text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}