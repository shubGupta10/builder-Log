"use client"

import { HeroSection } from "@/app/modules/landing/hero-section";
import { Github } from "lucide-react";

export default function Hero() {
    return (
        <HeroSection
            badge={{
                text: "BuilderLog is Open Source",
                action: {
                    text: "View on GitHub",
                    href: "https://github.com/shubGupta10/builder-Log",
                },
            }}
            title="A public log of your real development work"
            description="BuilderLog turns your raw GitHub history into a clean timeline, insightful metrics, and a shareable public profile."
            actions={[
                {
                    text: "Sign in with GitHub",
                    href: "/login",
                    variant: "default",
                    icon: <Github className="h-5 w-5" />,
                },
                {
                    text: "View example profile",
                    href: "#showcase",
                    variant: "outline",
                },
            ]}
        />
    )
}