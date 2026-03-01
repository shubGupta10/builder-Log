"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clock,
  BarChart3,
  FolderGit2,
  GitFork,
  LogOut,
  User,
  Settings2Icon,
  ChevronRight,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { apiFetch } from "@/app/lib/api/client";
import { logout } from "@/app/lib/api/auth";

interface APIResponse {
  message: string;
  user: UserData;
}

interface UserData {
  _id: string;
  bio: string;
  githubAvatarUrl: string;
  githubProfileUrl: string;
  githubUsername: string;
  displayName?: string;
  isPublic: boolean;
  lastLoginAt: Date;
  onboardingDone: boolean;
}

export function Sidebar({
  isMobileOpen,
  onClose,
}: {
  isMobileOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await apiFetch<APIResponse>("/user/me");
        setUserData(data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const navLinks = [
    { href: "/timeline", label: "Timeline", icon: Clock },
    { href: "/insights", label: "Insights", icon: BarChart3 },
    { href: "/projects", label: "Projects", icon: FolderGit2 },
    { href: "/contributions", label: "Contributions", icon: GitFork },
    { href: "/settings", label: "Settings", icon: Settings2Icon },
  ];

  const publicProfileLink = userData
    ? {
      href: `/public/${userData.githubUsername}`,
      label: "Profile",
      icon: User,
    }
    : null;

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* ─────────────────────────────────────────────
          DESKTOP SIDEBAR (hidden on mobile)
      ───────────────────────────────────────────── */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 z-50 h-screen flex-col transition-all duration-300 border-r border-border bg-card ${isCollapsed ? "w-16" : "w-64"
          }`}
      >
        {/* Logo / header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4 shrink-0">
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-foreground">BuilderLog</h1>
              <p className="text-xs text-muted-foreground">Proof of work</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors cursor-pointer ml-auto shrink-0"
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform ${isCollapsed ? "" : "rotate-180"
                }`}
            />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                title={isCollapsed ? link.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{link.label}</span>
                )}
              </Link>
            );
          })}

          {publicProfileLink && (
            <>
              <div className="h-px bg-border my-2" />
              <Link
                href={publicProfileLink.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive(publicProfileLink.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                title={isCollapsed ? publicProfileLink.label : undefined}
              >
                <publicProfileLink.icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{publicProfileLink.label}</span>
                )}
              </Link>
            </>
          )}
        </nav>

        {/* User + Logout — always visible at bottom */}
        <div className="border-t border-border p-3 shrink-0">
          {userData && (
            <div
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg bg-muted mb-2 ${isCollapsed ? "justify-center" : ""
                }`}
            >
              <img
                src={userData.githubAvatarUrl || "/default-avatar.png"}
                alt={userData.githubUsername}
                className="w-8 h-8 rounded-full border border-border shrink-0"
              />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {userData.displayName || userData.githubUsername}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    @{userData.githubUsername}
                  </p>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white bg-destructive hover:bg-destructive/90 transition-colors cursor-pointer ${isCollapsed ? "justify-center" : ""
              }`}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────
          MOBILE DRAWER (visible only on mobile)
      ───────────────────────────────────────────── */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <div className="lg:hidden fixed left-0 top-0 z-50 h-full w-72 bg-card border-r border-border flex flex-col shadow-xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
              <div>
                <h1 className="text-lg font-bold text-foreground">BuilderLog</h1>
                <p className="text-xs text-muted-foreground">Proof of work</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User card */}
            {userData && (
              <div className="px-4 py-3 border-b border-border shrink-0">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted">
                  <img
                    src={userData.githubAvatarUrl || "/default-avatar.png"}
                    alt={userData.githubUsername}
                    className="w-10 h-10 rounded-full border border-border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {userData.displayName || userData.githubUsername}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      @{userData.githubUsername}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Nav links — scrollable */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}

              {publicProfileLink && (
                <>
                  <div className="h-px bg-border my-2" />
                  <Link
                    href={publicProfileLink.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive(publicProfileLink.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                  >
                    <publicProfileLink.icon className="w-5 h-5 shrink-0" />
                    Public Profile
                  </Link>
                </>
              )}
            </nav>

            {/* Logout — always visible, pinned to bottom of drawer */}
            <div className="shrink-0 p-4 border-t border-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-white bg-destructive hover:bg-destructive/90 transition-colors cursor-pointer text-sm font-medium"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
