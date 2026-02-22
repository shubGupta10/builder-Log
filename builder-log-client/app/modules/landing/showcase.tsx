const cards = [
    {
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=85",
        label: "Detailed Activity Timeline",
    },
    {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85",
        label: "Analytics & Insights",
    },
    {
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=85",
        label: "Shareable Public Profile",
    },
];

export default function Showcase() {
    return (
        <section id="showcase" className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-6">

                {/* Header — centered like the screenshot */}
                <div className="text-center mb-16 lg:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                        Designed for clarity
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-[600px] mx-auto">
                        A developer-first interface that prioritizes signal over noise.
                    </p>
                </div>

                {/* 3 cards in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {cards.map(({ image, label }) => (
                        <div key={label} className="flex flex-col gap-3">

                            {/* Frame card — light bg with padding, like a window/frame */}
                            <div className="rounded-2xl border border-border bg-secondary p-3 shadow-sm">
                                <div className="overflow-hidden rounded-xl w-full aspect-[4/3]">
                                    <img
                                        src={image}
                                        alt={label}
                                        className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
                                    />
                                </div>
                            </div>

                            {/* Label */}
                            <p className="text-base font-semibold text-foreground text-center mt-2">
                                {label}
                            </p>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}