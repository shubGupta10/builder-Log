import { Shield, Lock, EyeOff, Trash2 } from "lucide-react";

const items = [
    {
        icon: Shield,
        title: "GitHub OAuth Authentication",
        description: "We use official GitHub OAuth flows. No passwords are ever stored.",
    },
    {
        icon: Lock,
        title: "No Private Repo Access",
        description: "BuilderLog only requests access to your public repository data.",
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
        <section className="bg-muted py-24 sm:py-28">
            <div className="mx-auto max-w-4xl px-6">

                {/* Header */}
                <div className="text-center mb-16 lg:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                        <span className="text-primary">Privacy</span> & Control
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-[600px] mx-auto">
                        We believe your data belongs to you. BuilderLog is built with trust from the ground up.
                    </p>
                </div>

                {/* 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
                    {items.map(({ icon: Icon, title, description }) => (
                        <div key={title} className="flex gap-4">
                            <div className="shrink-0 mt-1">
                                <Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {title}
                                </h3>
                                <p className="text-base leading-relaxed text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}