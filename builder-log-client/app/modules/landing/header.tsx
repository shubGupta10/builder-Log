"use client"

import Link from "next/link";
import Image from "next/image";
import { Outfit } from "next/font/google";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DarkModeToggle } from "@/app/components/layout/DarkModeToggle";

const logoFont = Outfit({
    subsets: ["latin"],
    weight: ["700"],
});

export default function Header() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

    return (
        <header className="w-full border-b border-border bg-background">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
                <Link href="/" className="flex items-center gap-2">
                    {mounted ? (
                        <Image
                            src={isDark ? "/logo-white.png" : "/logo-dark.png"}
                            alt="BuilderLog"
                            width={45}
                            height={45}
                            priority
                            className="object-contain"
                        />
                    ) : (
                        <span className="w-[45px] h-[45px]" />
                    )}
                    <span className={`text-xl font-bold tracking-[0.10em] ${logoFont.className}`}>
                        <span className="text-foreground">BUILDER</span>
                        <span
                            className="text-[#5B7FFF]"
                            style={isDark ? { textShadow: "0 0 10px rgba(91, 127, 255, 0.5), 0 0 20px rgba(91, 127, 255, 0.25)" } : undefined}
                        >
                            LOG
                        </span>
                    </span>
                </Link>
                <div className="flex items-center gap-4">
                    <DarkModeToggle />
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </header>
    );
}