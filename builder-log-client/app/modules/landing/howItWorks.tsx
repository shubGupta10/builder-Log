import { CheckCircle } from "lucide-react";

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
    return (
        <>
            {/* ── STEPS ─────────────────────────────────────── */}
            <section className="bg-muted py-24 sm:py-28">
                <div className="mx-auto max-w-6xl px-6">

                    <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-16 lg:mb-20">
                        How BuilderLog works
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 relative">

                        {/* Connector line — desktop only */}
                        <div className="hidden sm:block absolute top-[22px] left-[calc(16.666%+16px)] right-[calc(16.666%+16px)] h-px bg-border z-0" />

                        {steps.map(({ number, title, description }) => (
                            <div key={number} className="flex flex-col items-center text-center gap-4 relative z-10">

                                {/* Number bubble */}
                                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background shadow-sm text-sm font-bold text-foreground">
                                    {number}
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                                    <p className="text-base leading-relaxed text-muted-foreground max-w-[260px] mx-auto">
                                        {description}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ── LIVING RESUME ─────────────────────────────── */}
            <section className="bg-background py-24 sm:py-28">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left — text */}
                        <div className="flex flex-col gap-6">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                                Your work, as a living resume.
                            </h2>
                            <p className="text-lg sm:text-xl text-muted-foreground">
                                Showcase your capabilities through actual output, not just buzzwords.
                            </p>
                            <p className="text-base leading-relaxed text-muted-foreground">
                                BuilderLog creates a beautifully formatted, read-only public profile that updates automatically as you push code. It is designed to be shared with recruiters, clients, or collaborators.
                            </p>

                            <ul className="flex flex-col gap-4 mt-2">
                                {bullets.map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-base text-foreground font-medium">
                                        <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right — browser mockup with image */}
                        <div className="rounded-2xl border border-border bg-secondary shadow-lg overflow-hidden">
                            {/* Browser topbar */}
                            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted">
                                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                                <div className="ml-3 flex-1 max-w-[200px] h-5 rounded-md bg-border" />
                            </div>
                            {/* Screenshot */}
                            <div className="w-full aspect-[4/3] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=85"
                                    alt="Developer profile preview"
                                    className="h-full w-full object-cover object-top"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}