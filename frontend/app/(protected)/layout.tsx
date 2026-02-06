"use client";

import Link from "next/link";
import { AuthGuard } from "@/components/auth/auth-guard";
import { UserMenu } from "@/components/auth/user-menu";
import { Logo } from "@/components/ui/logo";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/30">
        {/* Header - Duolingo style */}
        <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background">
          <div className="container flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard">
              <Logo size="md" />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors"
              >
                Learn
              </Link>
              <Link
                href="/applets"
                className="text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors"
              >
                Applets
              </Link>
              <Link
                href="/generate"
                className="text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors"
              >
                Generate
              </Link>
            </nav>

            {/* User section */}
            <div className="flex items-center gap-4">
              {/* XP indicator placeholder */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-warning/10 text-warning">
                <span className="text-lg">⚡</span>
                <span className="font-bold text-sm">0 XP</span>
              </div>

              {/* Streak indicator placeholder */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-destructive/10 text-destructive">
                <span className="text-lg animate-flame">🔥</span>
                <span className="font-bold text-sm">0</span>
              </div>

              <UserMenu />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container py-8">{children}</main>
      </div>
    </AuthGuard>
  );
}
