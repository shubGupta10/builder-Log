"use client";

import { useState } from "react";
import { Sidebar } from "@/app/components/layout/sidebar/sidebar";
import { Header } from "@/app/components/layout/header/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="lg:ml-64 min-h-screen">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
