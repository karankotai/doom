"use client";

import Link from "next/link";
import { Zap, Flame } from "lucide-react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { UserMenu } from "@/components/auth/user-menu";
import { Logo } from "@/components/ui/logo";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/context/auth-context";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Learn" },
  { href: "/courses", label: "Courses" },
  { href: "/applets", label: "Applets" },
  { href: "/generate", label: "Generate" },
] as const;

function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-10">
            <Link href="/dashboard" className="shrink-0">
              <Logo size="md" />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative rounded-lg px-3 py-2 text-sm font-bold text-muted-foreground/90 transition-colors hover:text-foreground hover:bg-muted/60"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="warning"
              size="sm"
              className="hidden sm:inline-flex"
              iconLeft={<Zap className="h-3 w-3" />}
            >
              <span className="inline-flex items-center gap-1">
                <span className="tabular-nums">{profile?.xp ?? 0}</span>
                <span className="text-muted-foreground/80 font-medium">XP</span>
              </span>
            </Badge>

            <Badge
              variant="destructive"
              size="sm"
              className="hidden sm:inline-flex"
              iconLeft={<Flame className="h-3 w-3" />}
            >
              <span className="inline-flex items-center gap-1">
                <span className="tabular-nums">{profile?.currentStreak ?? 0}</span>
                <span className="text-destructive-foreground/90 font-medium hidden md:inline">
                  day streak
                </span>
              </span>
            </Badge>

            <UserMenu />
          </div>
        </div>

        <nav className="md:hidden container flex items-center justify-between gap-1 pb-3 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-bold text-muted-foreground/90 hover:text-foreground hover:bg-muted/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="container py-8 md:py-10">{children}</main>
    </div>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <ProtectedContent>{children}</ProtectedContent>
    </AuthGuard>
  );
}
