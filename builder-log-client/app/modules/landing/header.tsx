import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full border-b border-border bg-background">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center gap-2 text-foreground font-semibold text-base">
                    <span className="flex items-center justify-center w-7 h-7 bg-foreground text-background rounded text-xs font-bold">
                        &gt;_
                    </span>
                    BuilderLog
                </Link>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                >
                    Sign in
                </Link>
            </div>
        </header>
    );
}