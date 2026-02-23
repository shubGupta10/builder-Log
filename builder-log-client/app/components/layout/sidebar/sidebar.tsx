"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, BarChart3, FolderGit2, GitFork, ChevronRight, LogOut, User, Settings2Icon } from "lucide-react";
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

export function Sidebar({ isMobileOpen, onClose }: { isMobileOpen?: boolean; onClose?: () => void }) {
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
    ? { href: `/public/${userData.githubUsername}`, label: "Public Profile", icon: User }
    : null;

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"
          } border-r border-border bg-card ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-foreground">BuilderLog</h1>
                <p className="text-xs text-muted-foreground">Proof of work</p>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
            >
              <ChevronRight
                className={`w-4 h-4 transition-transform ${isCollapsed ? "" : "rotate-180"
                  }`}
              />
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  title={isCollapsed ? link.label : undefined}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span className="font-medium">{link.label}</span>}
                </Link>
              );
            })}

            {/* Public Profile Link - Dynamically Generated */}
            {publicProfileLink && (
              <>
                <div className="h-px bg-border my-2" />
                <Link
                  href={publicProfileLink.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive(publicProfileLink.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  title={isCollapsed ? publicProfileLink.label : undefined}
                >
                  <publicProfileLink.icon className="w-5 h-5" />
                  {!isCollapsed && <span className="font-medium">{publicProfileLink.label}</span>}
                </Link>
              </>
            )}
          </nav>

          <div className="border-t border-border p-3">
            {userData && (
              <div className="mb-2">
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg bg-muted ${isCollapsed ? "justify-center" : ""
                    }`}
                >
                  <img
                    src={userData.githubAvatarUrl || "/default-avatar.png"}
                    alt={userData.githubUsername}
                    className="w-8 h-8 rounded-full border border-border"
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
              </div>
            )}

            <div className={`flex gap-2 ${isCollapsed ? "flex-col" : "items-center"}`}>
              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white bg-destructive hover:bg-destructive/90 transition-colors cursor-pointer ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? "Logout" : undefined}
              >
                <LogOut className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">Logout</span>}
              </button>
            </div>
          </div>
        </div>
      </aside >
    </>
  );
}
