import Link from "next/link";
import { Github, Twitter, Shield, FileText, GitMerge, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background pt-16 pb-8 md:pt-24 md:pb-12">
            <div className="mx-auto max-w-7xl px-6">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                <GitMerge className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-foreground">Builder<span className="text-primary">Log</span></span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mt-2">
                            The automatic, distraction-free portfolio generator for developers. Turn your scattered Git history into a pristine, shareable proof-of-work.
                        </p>
                    </div>

                    {/* Resources Column */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-foreground font-semibold tracking-tight">Resources</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How it works</Link>
                            <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link>
                            <Link href="#showcase" className="text-sm text-muted-foreground hover:text-primary transition-colors">Showcase</Link>
                        </nav>
                    </div>

                    {/* Legal & Social Column */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-foreground font-semibold tracking-tight">Connect</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="https://github.com/shubGupta10/builder-Log" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                <Github className="h-4 w-4" /> GitHub
                            </Link>
                            <Link href="https://x.com/buildwithshub" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                <Twitter className="h-4 w-4" /> Twitter (X)
                            </Link>
                            <Link href="mailto:hello@builderlog.app" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                <Mail className="h-4 w-4" /> Contact
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} BuilderLog. Built by <a href="https://x.com/buildwithshub" target="_blank" className="text-foreground hover:text-primary transition-colors">Shubham Kumar Gupta</a>.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                            <Shield className="h-3.5 w-3.5" /> Privacy
                        </Link>
                        <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5" /> Terms
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}