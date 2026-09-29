"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo size="sm" />
        </Link>
        <div className="text-label text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            ← Back to Doom
          </Link>
        </div>
      </div>

      <main className="flex flex-1 items-center justify-center px-4 pb-16 pt-6">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="border-t border-border/60 py-6">
        <div className="container flex flex-col items-start justify-between gap-3 text-caption text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span>© {new Date().getFullYear()} Doom · Every move delays the doom.</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/login" className="hover:text-foreground">Log in</Link>
            <Link href="/register" className="hover:text-foreground">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
