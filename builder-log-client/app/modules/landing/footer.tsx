import Link from "next/link";
import { Github, Twitter, Shield, FileText, GitMerge } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Left */}
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-sm text-muted-foreground">
                    <span>Powered by BuilderLog</span>
                    <span className="hidden sm:inline">·</span>
                    <span>Built by <span className="font-medium text-foreground">Shubham Kumar Gupta</span></span>
                </div>

                {/* Right */}
                <nav className="flex items-center gap-5">
                    <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <GitMerge className="h-4 w-4" />
                        GitHub Integration
                    </Link>
                    <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Shield className="h-4 w-4" />
                        Privacy
                    </Link>
                    <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <FileText className="h-4 w-4" />
                        Terms
                    </Link>
                    <Link
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub"
                    >
                        <Github className="h-4 w-4" />
                    </Link>
                    <Link
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="X (Twitter)"
                    >
                        <Twitter className="h-4 w-4" />
                    </Link>
                </nav>

            </div>
        </footer>
    );
}