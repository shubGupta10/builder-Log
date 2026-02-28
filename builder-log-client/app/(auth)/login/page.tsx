"use client";

import { useState } from "react";
import { loginWithGitHub } from "@/app/lib/api/auth";
import { Clock, Shield, Eye, Github, Loader2 } from "lucide-react";
import { PrivacyModal } from "@/app/components/auth/PrivacyModal";

export default function LoginPage() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    loginWithGitHub();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            BuilderLog
          </h1>
          <p className="text-lg text-primary-foreground/90">
            Turn your GitHub activity into meaningful work sessions
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground mb-1">
                Proof of Work
              </h3>
              <p className="text-primary-foreground/80 text-sm">
                Not analytics or gamification. Real work sessions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center ">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground mb-1">
                Read-Only & Safe
              </h3>
              <p className="text-primary-foreground/80 text-sm">
                We only read your GitHub activity. No write access.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
              <Eye className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground mb-1">
                Calm & Reflective
              </h3>
              <p className="text-primary-foreground/80 text-sm">
                Review and share your work history with clarity.
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-primary-foreground/60">
          © 2026 BuilderLog. For builders, by builders.
        </p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome back
            </h2>
            <p className="text-muted-foreground">
              Sign in to view your work sessions
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8">
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className={`w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--primary),0.5)] transition-all ${!isLoggingIn ? 'hover:scale-[1.02] active:scale-[0.98]' : 'opacity-90 cursor-wait'} py-3.5 px-4 rounded-xl font-medium flex items-center justify-center gap-3 cursor-pointer`}
            >
              {isLoggingIn ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Github className="w-5 h-5" />
              )}
              {isLoggingIn ? "Redirecting..." : "Continue with GitHub"}
            </button>

            <p className="text-xs text-muted-foreground text-center mt-6">
              By signing in, you agree to read-only access to your GitHub
              activity
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="text-sm text-primary hover:underline cursor-pointer"
            >
              Privacy & Data Information
            </button>
          </div>

          <PrivacyModal
            isOpen={isPrivacyModalOpen}
            onClose={() => setIsPrivacyModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}