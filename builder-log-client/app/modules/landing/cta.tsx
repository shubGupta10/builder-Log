import Link from "next/link";
import { Github } from "lucide-react";

export default function CTA() {
    return (
        <section className="bg-background border-t border-border py-24 sm:py-28">
            <div className="mx-auto max-w-6xl px-6 flex flex-col items-center text-center gap-8">

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                    Ready to log your building journey?
                </h2>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3 text-[0.9375rem] font-semibold text-primary-foreground shadow-sm hover:brightness-110 active:scale-95 transition-all"
                >
                    <Github className="h-4 w-4 shrink-0" />
                    Sign in with GitHub
                </Link>

            </div>
        </section>
    );
}